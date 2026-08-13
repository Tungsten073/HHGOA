'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TropicalLeaf } from '../background/TropicalLeaf';

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const GoaEnvironment5Layers: React.FC = () => {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const layer5Ref = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    let rafId: number;

    const updateScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / totalScroll)) : 0;

      // Smooth overlapping dissolution ranges:
      // Layer 1 (Sunrise): 0.00 -> 0.30
      // Layer 2 (Morning): 0.15 -> 0.50
      // Layer 3 (Daylight): 0.35 -> 0.70
      // Layer 4 (Evening): 0.55 -> 0.88
      // Layer 5 (Sunset): 0.75 -> 1.00

      const op1 = 1 - smoothstep(0.12, 0.32, progress);
      const op2 = smoothstep(0.12, 0.30, progress) * (1 - smoothstep(0.35, 0.52, progress));
      const op3 = smoothstep(0.35, 0.50, progress) * (1 - smoothstep(0.58, 0.72, progress));
      const op4 = smoothstep(0.58, 0.70, progress) * (1 - smoothstep(0.78, 0.90, progress));
      const op5 = smoothstep(0.78, 0.90, progress);

      if (layer1Ref.current) layer1Ref.current.style.opacity = `${op1}`;
      if (layer2Ref.current) layer2Ref.current.style.opacity = `${op2}`;
      if (layer3Ref.current) layer3Ref.current.style.opacity = `${op3}`;
      if (layer4Ref.current) layer4Ref.current.style.opacity = `${op4}`;
      if (layer5Ref.current) layer5Ref.current.style.opacity = `${op5}`;

      if (parallaxRef.current && !mediaQuery.matches && window.innerWidth >= 768) {
        const translateY = progress * -35;
        parallaxRef.current.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.02)`;
      }

      rafId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('scroll', updateScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      <div ref={parallaxRef} className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out">
        {/* Layer 1 — Sunrise */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-bg-1-sunrise.jpg')", opacity: 1 }}
        />

        {/* Layer 2 — Morning */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-bg-2-morning.jpg')", opacity: 0 }}
        />

        {/* Layer 3 — Daytime */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-bg-3-day.jpg')", opacity: 0 }}
        />

        {/* Layer 4 — Evening / Golden Hour */}
        <div
          ref={layer4Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-bg-4-evening.jpg')", opacity: 0 }}
        />

        {/* Layer 5 — Deep Sunset & Campfire */}
        <div
          ref={layer5Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-bg-5-sunset.jpg')", opacity: 0 }}
        />
      </div>

      {/* Swaying Palm Fronds Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-12 -right-12 w-72 sm:w-96"
            color="#315746"
            opacity={0.15}
          />
        </div>
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px]"
            color="#0A111E"
            opacity={0.18}
          />
        </div>
      </div>
    </div>
  );
};

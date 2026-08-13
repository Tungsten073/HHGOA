'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TropicalLeaf } from '../background/TropicalLeaf';

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const GoaRealisticBeachEnvironment: React.FC = () => {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const layer4Ref = useRef<HTMLDivElement>(null);
  const layer5Ref = useRef<HTMLDivElement>(null);

  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const fgParallaxRef = useRef<HTMLDivElement>(null);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    let rafId: number;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = totalScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / totalScroll)) : 0;
      targetProgressRef.current = rawProgress;
    };

    const animateLoop = () => {
      // Damped spring lerp inertia physics (0.08 factor for luxury feel)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.08;
      const progress = currentProgressRef.current;

      // 5-Photo Continuous Eased Cross-Dissolve Timeline:
      // Image 1 (Sunrise): 0.00 -> 0.25 (1 -> 0)
      // Image 2 (Daytime): 0.15 -> 0.50 (0 -> 1 -> 0)
      // Image 3 (Golden Hour): 0.35 -> 0.70 (0 -> 1 -> 0)
      // Image 4 (Sunset): 0.55 -> 0.88 (0 -> 1 -> 0)
      // Image 5 (Blue Hour / Dusk): 0.75 -> 1.00 (0 -> 1)

      const op1 = 1 - smoothstep(0.10, 0.28, progress);
      const op2 = smoothstep(0.10, 0.26, progress) * (1 - smoothstep(0.38, 0.54, progress));
      const op3 = smoothstep(0.38, 0.52, progress) * (1 - smoothstep(0.62, 0.76, progress));
      const op4 = smoothstep(0.62, 0.74, progress) * (1 - smoothstep(0.82, 0.94, progress));
      const op5 = smoothstep(0.82, 0.94, progress);

      if (layer1Ref.current) layer1Ref.current.style.opacity = `${op1}`;
      if (layer2Ref.current) layer2Ref.current.style.opacity = `${op2}`;
      if (layer3Ref.current) layer3Ref.current.style.opacity = `${op3}`;
      if (layer4Ref.current) layer4Ref.current.style.opacity = `${op4}`;
      if (layer5Ref.current) layer5Ref.current.style.opacity = `${op5}`;

      if (!mediaQuery.matches && window.innerWidth >= 768) {
        if (bgParallaxRef.current) {
          bgParallaxRef.current.style.transform = `translate3d(0, ${progress * -30}px, 0) scale(1.03)`;
        }
        if (fgParallaxRef.current) {
          fgParallaxRef.current.style.transform = `translate3d(0, ${progress * -50}px, 0)`;
        }
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(animateLoop);

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* ── 5 REALISTIC GOA BEACH PHOTOGRAPH LAYERS WITH LERP INERTIA ── */}
      <div ref={bgParallaxRef} className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out opacity-45">
        {/* Layer 1 — Sunrise (Hero) */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-1-sunrise.jpg')", opacity: 1 }}
        />

        {/* Layer 2 — Bright Daytime (Builder Generator) */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-2-daytime.jpg')", opacity: 0 }}
        />

        {/* Layer 3 — Golden Hour (Result Reveal) */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-3-goldenhour.jpg')", opacity: 0 }}
        />

        {/* Layer 4 — Sunset (Social Edition Gallery) */}
        <div
          ref={layer4Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-4-sunset.jpg')", opacity: 0 }}
        />

        {/* Layer 5 — Blue Hour / Campfire (Footer & Night) */}
        <div
          ref={layer5Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-bg-5-sunset.jpg')", opacity: 0 }}
        />
      </div>

      {/* Subtle Atmospheric Color-Grade Tint Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/15 via-transparent to-[#0B1020]/25 pointer-events-none z-5" />

      {/* Swaying Tropical Palm Fronds Foreground Layer */}
      <div ref={fgParallaxRef} className="absolute inset-0 pointer-events-none z-10 transition-transform duration-700 ease-out">
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-12 -right-12 w-72 sm:w-96 drop-shadow-lg"
            color="#1F3A2E"
            opacity={0.28}
          />
        </div>
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px] drop-shadow-lg"
            color="#0A111E"
            opacity={0.32}
          />
        </div>
      </div>
    </div>
  );
};

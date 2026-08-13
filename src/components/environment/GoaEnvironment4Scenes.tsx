'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TropicalLeaf } from '../background/TropicalLeaf';

function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const GoaEnvironment4Scenes: React.FC = () => {
  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);
  const scene4Ref = useRef<HTMLDivElement>(null);

  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const fgParallaxRef = useRef<HTMLDivElement>(null);

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

      // Smooth 4-Scene Dissolve Timeline:
      // Scene 1 (Sunrise / Hero): 0.00 -> 0.33
      // Scene 2 (Daytime / Builder): 0.22 -> 0.62
      // Scene 3 (Golden Hour / Result): 0.52 -> 0.85
      // Scene 4 (Sunset / Social + Footer): 0.75 -> 1.00

      const op1 = 1 - smoothstep(0.18, 0.38, progress);
      const op2 = smoothstep(0.18, 0.35, progress) * (1 - smoothstep(0.52, 0.68, progress));
      const op3 = smoothstep(0.52, 0.65, progress) * (1 - smoothstep(0.75, 0.88, progress));
      const op4 = smoothstep(0.75, 0.86, progress);

      if (scene1Ref.current) scene1Ref.current.style.opacity = `${op1}`;
      if (scene2Ref.current) scene2Ref.current.style.opacity = `${op2}`;
      if (scene3Ref.current) scene3Ref.current.style.opacity = `${op3}`;
      if (scene4Ref.current) scene4Ref.current.style.opacity = `${op4}`;

      // 3-Layer Spatial Parallax:
      if (!mediaQuery.matches && window.innerWidth >= 768) {
        // Midground/Background Parallax (slow -25px movement)
        if (bgParallaxRef.current) {
          bgParallaxRef.current.style.transform = `translate3d(0, ${progress * -25}px, 0) scale(1.02)`;
        }
        // Foreground Palm Leaves Parallax (slightly faster -45px movement)
        if (fgParallaxRef.current) {
          fgParallaxRef.current.style.transform = `translate3d(0, ${progress * -45}px, 0)`;
        }
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
      {/* ── LAYER 1 & 2: BACKGROUND / MIDGROUND HIGH-RES SCENES ── */}
      <div ref={bgParallaxRef} className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out">
        {/* Scene 01 — Sunrise (Hero Section) */}
        <div
          ref={scene1Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-1-sunrise.jpg')", opacity: 1 }}
        />

        {/* Scene 02 — Daytime (Builder Workshop) */}
        <div
          ref={scene2Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-2-daytime.jpg')", opacity: 0 }}
        />

        {/* Scene 03 — Golden Hour (Artifact Result) */}
        <div
          ref={scene3Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-3-goldenhour.jpg')", opacity: 0 }}
        />

        {/* Scene 04 — Sunset & Night (Social Edition & Footer) */}
        <div
          ref={scene4Ref}
          className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full transition-opacity duration-700 ease-out"
          style={{ backgroundImage: "url('/goa-scene-4-sunset.jpg')", opacity: 0 }}
        />
      </div>

      {/* ── LAYER 3: FOREGROUND ATMOSPHERIC PALM FRONDS & PARTICLES ── */}
      <div ref={fgParallaxRef} className="absolute inset-0 pointer-events-none z-10 transition-transform duration-700 ease-out">
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-12 -right-12 w-72 sm:w-96 drop-shadow-md"
            color="#1F3A2E"
            opacity={0.25}
          />
        </div>
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px] drop-shadow-md"
            color="#0A111E"
            opacity={0.28}
          />
        </div>
      </div>
    </div>
  );
};

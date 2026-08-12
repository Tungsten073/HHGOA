'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TropicalLeaf } from './TropicalLeaf';

export const TropicalBackground: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const parallaxOffset = useRef({ x: 0, y: 0 });
  const [parallaxState, setParallaxState] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches || window.innerWidth < 768) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      parallaxOffset.current = { x: nx, y: ny };
      setParallaxState({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      mediaQuery.removeEventListener('change', motionHandler);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const px = parallaxState.x;
  const py = parallaxState.y;

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* ── LAYER 1: DISTANT (Coordinates, Waves, Giant 247 Watermark) ── */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -2}px, ${py * -2}px, 0)`,
        }}
      >
        {/* Giant low-opacity 247 watermark */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[#151B2B] font-black font-syne text-[320px] sm:text-[500px] leading-none tracking-tighter">
          247
        </div>

        {/* Coastal contour lines top left */}
        <TropicalLeaf
          variant="coastal-contour"
          className="absolute top-20 left-0"
          color="#9F452D"
          opacity={0.08}
        />

        {/* Coastal contour lines bottom right */}
        <TropicalLeaf
          variant="coastal-contour"
          className="absolute bottom-32 right-0 rotate-180"
          color="#315746"
          opacity={0.08}
        />

        {/* Embedded Goa coordinates metadata */}
        <div className="absolute top-36 left-8 font-mono text-[9px] font-bold tracking-widest text-[#9F452D]/15 uppercase hidden sm:block">
          GOA / INDIA // 15.4909° N, 73.8278° E
        </div>
        <div className="absolute bottom-40 right-12 font-mono text-[9px] font-bold tracking-widest text-[#151B2B]/15 uppercase hidden sm:block">
          HH GOA / 247 // THE ROAD TO 247
        </div>
      </div>

      {/* ── LAYER 2: MIDGROUND (Gentle Breeze Tropical Shadows & Foliage) ── */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -5}px, ${py * -5}px, 0)`,
        }}
      >
        {/* Top-Right Palm Shadow */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-10 -right-10 w-72 sm:w-96"
            color="#315746"
            opacity={isMobile ? 0.08 : 0.12}
          />
        </div>

        {/* Mid-Left Monstera Cutout */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="monstera-leaf"
            className="absolute top-1/2 -left-12 -translate-y-1/2 w-48 sm:w-64"
            color="#151B2B"
            opacity={isMobile ? 0.05 : 0.09}
          />
        </div>

        {/* Floating Environmental Dust/Pollen Dots */}
        {!isMobile && (
          <>
            <div
              className={`absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#D8A928]/30 ${
                reducedMotion ? '' : 'animate-float-slow'
              }`}
            />
            <div
              className={`absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#9F452D]/25 ${
                reducedMotion ? '' : 'animate-float-slow-reverse'
              }`}
            />
            <div
              className={`absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-[#315746]/40 ${
                reducedMotion ? '' : 'animate-float-slow'
              }`}
            />
          </>
        )}
      </div>

      {/* ── LAYER 3: FOREGROUND (Edge Cutout Palm Fronds — Corner Spaced Only) ── */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -9}px, ${py * -9}px, 0)`,
        }}
      >
        {/* Bottom-Left Palm Frond */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px]"
            color="#315746"
            opacity={isMobile ? 0.08 : 0.14}
          />
        </div>

        {/* Top-Left Subtle Abstract Foliage */}
        {!isMobile && (
          <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
            <TropicalLeaf
              variant="abstract-foliage"
              className="absolute top-12 left-4 w-40"
              color="#9F452D"
              opacity={0.07}
            />
          </div>
        )}
      </div>
    </div>
  );
};

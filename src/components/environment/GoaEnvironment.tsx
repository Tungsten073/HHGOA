'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TropicalLeaf } from '../background/TropicalLeaf';

export const GoaEnvironment: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0); // 0 (Top/Sunrise) to 1 (Bottom/Night)
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

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
          const currentProgress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
          setScrollProgress(currentProgress);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const px = parallaxState.x;
  const py = parallaxState.y;

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* ── LAYER 1: SKY & ATMOSPHERIC GRADIENT STREAM ── */}
      {/* Smoothly interpolates from Sunrise -> Daylight -> Golden Hour -> Sunset -> Beach Night */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background:
            scrollProgress < 0.22
              ? 'linear-gradient(180deg, #FDF9F0 0%, #F8E2C4 50%, #F5F1E8 100%)' // Sunrise Sky
              : scrollProgress < 0.55
              ? 'linear-gradient(180deg, #FDF9F0 0%, #F5F1E8 50%, #FAF6ED 100%)' // Bright Day
              : scrollProgress < 0.78
              ? 'linear-gradient(180deg, #FAF6ED 0%, #F6E2C6 40%, #E06A42 100%)' // Golden Hour
              : scrollProgress < 0.9
              ? 'linear-gradient(180deg, #E06A42 0%, #9F452D 35%, #2B1D38 80%, #0A111E 100%)' // Sunset
              : 'linear-gradient(180deg, #2B1D38 0%, #151B2B 50%, #0A111E 100%)', // Beach Night
        }}
      />

      {/* ── LAYER 2: HIGH-RES GOA BEACH ENVIRONMENTAL ARTWORK ── */}
      {/* Tall cinematic Goa beach artwork with multi-tier scroll & mouse parallax */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full opacity-90 transition-transform duration-500 ease-out"
        style={{
          backgroundImage: "url('/goa-journey-bg.jpg')",
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -6}px, ${py * -6 + scrollProgress * -40}px, 0) scale(1.02)`,
        }}
      />

      {/* ── LAYER 3: ADAPTIVE VIGNETTE & READABILITY OVERLAY ── */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            scrollProgress > 0.8
              ? 'radial-gradient(circle at 50% 50%, transparent 20%, rgba(10, 17, 30, 0.4) 100%)'
              : 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(253, 249, 240, 0.25) 100%)',
        }}
      />

      {/* ── LAYER 4: FLOATING PARTICLES & CAMPFIRE EMBERS ── */}
      {!isMobile && (
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transform: reducedMotion
              ? 'none'
              : `translate3d(${px * -10}px, ${py * -10}px, 0)`,
          }}
        >
          {/* Top Morning Sun Rays / Golden Pollen */}
          {scrollProgress < 0.4 && (
            <>
              <div className={`absolute top-1/6 left-1/5 w-2 h-2 rounded-full bg-[#D8A928]/40 ${reducedMotion ? '' : 'animate-float-slow'}`} />
              <div className={`absolute top-1/4 right-1/4 w-1.5 h-1.5 rounded-full bg-[#FF8F72]/50 ${reducedMotion ? '' : 'animate-float-slow-reverse'}`} />
            </>
          )}

          {/* Bottom Sunset Campfire Embers */}
          {scrollProgress > 0.65 && (
            <>
              <div className={`absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-[#FF5A36]/60 blur-[1px] ${reducedMotion ? '' : 'animate-float-slow'}`} />
              <div className={`absolute bottom-1/6 right-1/3 w-2 h-2 rounded-full bg-[#FFC72C]/70 ${reducedMotion ? '' : 'animate-float-slow-reverse'}`} />
              <div className={`absolute bottom-1/12 left-1/2 w-1.5 h-1.5 rounded-full bg-[#FFE3B3]/80 ${reducedMotion ? '' : 'animate-float-slow'}`} />
            </>
          )}
        </div>
      )}

      {/* ── LAYER 5: FOREGROUND SWAYING PALM LEAF SILHOUETTES ── */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -12}px, ${py * -12}px, 0)`,
        }}
      >
        {/* Top-Right Palm Shadow */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-12 -right-12 w-72 sm:w-96"
            color={scrollProgress > 0.75 ? '#F5F1E8' : '#315746'}
            opacity={isMobile ? 0.08 : 0.14}
          />
        </div>

        {/* Bottom-Left Palm Frond */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px]"
            color={scrollProgress > 0.75 ? '#0A111E' : '#315746'}
            opacity={isMobile ? 0.08 : 0.16}
          />
        </div>
      </div>
    </div>
  );
};

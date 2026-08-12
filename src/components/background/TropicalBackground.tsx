'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TropicalLeaf } from './TropicalLeaf';

export const TropicalBackground: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 (Top/Sunrise) to 1 (Bottom/Sunset)
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

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
        setScrollProgress(currentProgress);
      }
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
    };
  }, []);

  const px = parallaxState.x;
  const py = parallaxState.y;

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* ── DYNAMIC GOA JOURNEY GRADIENT BACKGROUND ── */}
      {/* Top: Sunrise Cream/Coral -> Middle: Daylight -> Bottom: Sunset Orange/Deep Navy */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background:
            scrollProgress < 0.25
              ? 'linear-gradient(180deg, #FDF9F0 0%, #F8E6C8 60%, #F5F1E8 100%)' // Sunrise Sky
              : scrollProgress < 0.65
              ? 'linear-gradient(180deg, #FDF9F0 0%, #F5F1E8 50%, #FAF6ED 100%)' // Bright Goa Day
              : scrollProgress < 0.82
              ? 'linear-gradient(180deg, #FAF6ED 0%, #F6E2C6 50%, #E06A42 100%)' // Golden Hour
              : 'linear-gradient(180deg, #E06A42 0%, #9F452D 40%, #151B2B 80%, #0A111E 100%)', // Goa Beach Sunset
        }}
      />

      {/* ── LAYER 1: DISTANT (Sunrise Disc, Wave Lines, Goa Coordinates, Giant 247) ── */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -2}px, ${py * -2}px, 0)`,
        }}
      >
        {/* Sunrise Celestial Disc Outline (Top of Page) */}
        <svg
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] opacity-15"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="160" stroke="#9F452D" strokeWidth="1.5" strokeDasharray="8 6" />
          <circle cx="200" cy="200" r="120" stroke="#D8A928" strokeWidth="1" />
          <circle cx="200" cy="200" r="80" stroke="#FF5A36" strokeWidth="0.5" />
        </svg>

        {/* Giant low-opacity 247 watermark */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black font-syne text-[320px] sm:text-[500px] leading-none tracking-tighter transition-opacity duration-500"
          style={{
            color: scrollProgress > 0.8 ? '#F5F1E8' : '#151B2B',
            opacity: scrollProgress > 0.8 ? 0.04 : 0.03,
          }}
        >
          247
        </div>

        {/* Coastal contour lines top left */}
        <TropicalLeaf
          variant="coastal-contour"
          className="absolute top-20 left-0"
          color={scrollProgress > 0.8 ? '#FF5A36' : '#9F452D'}
          opacity={0.09}
        />

        {/* Coastal contour lines bottom right */}
        <TropicalLeaf
          variant="coastal-contour"
          className="absolute bottom-32 right-0 rotate-180"
          color={scrollProgress > 0.8 ? '#D8A928' : '#315746'}
          opacity={0.09}
        />

        {/* Embedded Goa coordinates metadata */}
        <div className="absolute top-36 left-8 font-mono text-[9px] font-bold tracking-widest text-[#9F452D]/20 uppercase hidden sm:block">
          GOA / INDIA // 15.4909° N, 73.8278° E // MORNING SUNRISE
        </div>
        <div className="absolute bottom-40 right-12 font-mono text-[9px] font-bold tracking-widest text-[#F5F1E8]/20 uppercase hidden sm:block">
          HH GOA / 247 // BEACH SUNSET GOLDEN HOUR
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
        {/* Top-Right Palm Shadow (Sunrise Haze Tint) */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-10 -right-10 w-72 sm:w-96"
            color={scrollProgress > 0.8 ? '#F5F1E8' : '#315746'}
            opacity={isMobile ? 0.08 : 0.13}
          />
        </div>

        {/* Mid-Left Monstera Cutout */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="monstera-leaf"
            className="absolute top-1/2 -left-12 -translate-y-1/2 w-48 sm:w-64"
            color={scrollProgress > 0.8 ? '#FF8F72' : '#151B2B'}
            opacity={isMobile ? 0.05 : 0.09}
          />
        </div>

        {/* Floating Environmental Dust/Pollen/Sunset Dots */}
        {!isMobile && (
          <>
            <div
              className={`absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#D8A928]/40 ${
                reducedMotion ? '' : 'animate-float-slow'
              }`}
            />
            <div
              className={`absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#FF5A36]/35 ${
                reducedMotion ? '' : 'animate-float-slow-reverse'
              }`}
            />
            <div
              className={`absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-[#315746]/40 ${
                reducedMotion ? '' : 'animate-float-slow'
              }`}
            />
          </>
        )}
      </div>

      {/* ── LAYER 3: FOREGROUND (Edge Cutout Palm Fronds & Sunset Beach Line Art) ── */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -9}px, ${py * -9}px, 0)`,
        }}
      >
        {/* Bottom-Left Palm Frond (Dark Sunset Silhouette at Bottom) */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[440px]"
            color={scrollProgress > 0.75 ? '#0A111E' : '#315746'}
            opacity={isMobile ? 0.08 : 0.16}
          />
        </div>

        {/* Stylized Goa Sunset Horizon Line Art (Visually appears near bottom of page) */}
        {scrollProgress > 0.7 && (
          <svg
            className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none"
            viewBox="0 0 1200 120"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M0 80 Q300 40 600 80 T1200 80 V120 H0 Z" fill="#0A111E" />
            <circle cx="600" cy="50" r="30" fill="#FF5A36" opacity="0.6" />
          </svg>
        )}

        {/* Top-Left Subtle Abstract Foliage */}
        {!isMobile && (
          <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
            <TropicalLeaf
              variant="abstract-foliage"
              className="absolute top-12 left-4 w-40"
              color="#9F452D"
              opacity={0.08}
            />
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TropicalLeaf } from '../background/TropicalLeaf';

// Hermite smoothstep helper for smooth continuous interpolation
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

export const GoaEnvironment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skyOverlayRef = useRef<HTMLDivElement>(null);
  const baseArtworkRef = useRef<HTMLDivElement>(null);
  const crowdLayerRef = useRef<HTMLDivElement>(null);
  const embersLayerRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let rafId: number;

    const updateEnvironment = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / totalScroll)) : 0;

      // ── 1. SKY & LIGHTING COLOR SHIFT ──
      // Sunrise (0.0) -> Daylight (0.35) -> Golden Hour (0.65) -> Sunset (0.85) -> Dusk (1.0)
      const dayWeight = smoothstep(0.1, 0.4, progress) * (1 - smoothstep(0.5, 0.7, progress));
      const goldenWeight = smoothstep(0.45, 0.7, progress) * (1 - smoothstep(0.75, 0.9, progress));
      const sunsetWeight = smoothstep(0.7, 0.95, progress);

      if (skyOverlayRef.current) {
        if (sunsetWeight > 0.4) {
          // Deep Sunset / Evening Dusk (Deep Coral -> Purple -> Navy)
          const opacity = smoothstep(0.4, 0.95, sunsetWeight) * 0.55;
          skyOverlayRef.current.style.background = 'linear-gradient(180deg, rgba(224, 106, 66, 0.6) 0%, rgba(159, 69, 45, 0.5) 40%, rgba(10, 17, 30, 0.7) 100%)';
          skyOverlayRef.current.style.opacity = `${opacity}`;
        } else if (goldenWeight > 0.3) {
          // Golden Hour (Warm Orange / Gold Glow)
          const opacity = smoothstep(0.3, 0.9, goldenWeight) * 0.4;
          skyOverlayRef.current.style.background = 'linear-gradient(180deg, rgba(246, 226, 198, 0.3) 0%, rgba(224, 106, 66, 0.4) 100%)';
          skyOverlayRef.current.style.opacity = `${opacity}`;
        } else if (dayWeight > 0.3) {
          // Bright Daylight (Warm Neutral Cream)
          const opacity = smoothstep(0.3, 0.9, dayWeight) * 0.25;
          skyOverlayRef.current.style.background = 'linear-gradient(180deg, rgba(253, 249, 240, 0.4) 0%, rgba(245, 241, 232, 0.3) 100%)';
          skyOverlayRef.current.style.opacity = `${opacity}`;
        } else {
          // Soft Morning Sunrise
          skyOverlayRef.current.style.background = 'linear-gradient(180deg, rgba(248, 226, 196, 0.3) 0%, rgba(224, 106, 66, 0.2) 100%)';
          skyOverlayRef.current.style.opacity = '0.2';
        }
      }

      // ── 2. CROWD ACTIVITY DENSITY DISSOLVE ──
      // Top: 1.0 -> Middle: 0.6 -> Golden Hour: 0.2 -> Bottom/Sunset: 0.0 (Completely Deserted Beach)
      if (crowdLayerRef.current) {
        const crowdOpacity = 1 - smoothstep(0.15, 0.85, progress);
        crowdLayerRef.current.style.opacity = `${crowdOpacity}`;
      }

      // ── 3. EVENING CAMPFIRE EMBERS OPACITY ──
      if (embersLayerRef.current) {
        const embersOpacity = smoothstep(0.65, 0.95, progress);
        embersLayerRef.current.style.opacity = `${embersOpacity}`;
      }

      // ── 4. PARALLAX OFFSET (DESKTOP ONLY) ──
      if (baseArtworkRef.current && !mediaQuery.matches && window.innerWidth >= 768) {
        const parallaxY = progress * -40;
        baseArtworkRef.current.style.transform = `translate3d(0px, ${parallaxY}px, 0) scale(1.02)`;
      }

      rafId = requestAnimationFrame(updateEnvironment);
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateEnvironment);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateEnvironment();

    return () => {
      mediaQuery.removeEventListener('change', motionHandler);
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── PERMANENT BASE LAYER: HIGH-RES GOA BEACH ARTWORK ── */}
      {/* Ocean, Beach, Coastline, Palms, & Horizon NEVER disappear, clip, or turn into flat gradients! */}
      <div
        ref={baseArtworkRef}
        className="absolute inset-0 bg-no-repeat bg-cover bg-center md:bg-top w-full h-full opacity-100 transition-transform duration-700 ease-out"
        style={{ backgroundImage: "url('/goa-journey-bg.jpg')" }}
      />

      {/* ── ATMOSPHERIC SKY LIGHTING OVERLAY LAYER ── */}
      {/* Smoothly interpolates sky color temperature with scroll progress */}
      <div
        ref={skyOverlayRef}
        className="absolute inset-0 transition-all duration-700 ease-out pointer-events-none"
      />

      {/* ── CROWD DISSOLVE OVERLAY (Reduces beach activity down to deserted sunset) ── */}
      <div
        ref={crowdLayerRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-12 bg-gradient-to-r from-transparent via-[#FDF9F0]/15 to-transparent blur-sm" />
      </div>

      {/* ── EVENING CAMPFIRE EMBERS LAYER ── */}
      <div
        ref={embersLayerRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-0"
      >
        {!isMobile && (
          <>
            <div className={`absolute bottom-1/4 left-1/3 w-2.5 h-2.5 rounded-full bg-[#FF5A36] blur-[1px] ${reducedMotion ? '' : 'animate-float-slow'}`} />
            <div className={`absolute bottom-1/6 right-1/3 w-2 h-2 rounded-full bg-[#FFC72C] ${reducedMotion ? '' : 'animate-float-slow-reverse'}`} />
            <div className={`absolute bottom-1/12 left-1/2 w-1.5 h-1.5 rounded-full bg-[#FFE3B3] ${reducedMotion ? '' : 'animate-float-slow'}`} />
          </>
        )}
      </div>

      {/* ── FOREGROUND SWAYING PALM FRONDS ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-12 -right-12 w-72 sm:w-96"
            color="#315746"
            opacity={0.12}
          />
        </div>
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px]"
            color="#0A111E"
            opacity={0.15}
          />
        </div>
      </div>
    </div>
  );
};

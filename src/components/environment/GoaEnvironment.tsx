'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TropicalLeaf } from '../background/TropicalLeaf';

/** 🌅 Scene 1: Sunrise & Lively Morning Beach (0% – 25% Scroll) */
const Scene1Sunrise: React.FC<{ opacity: number; px: number; py: number; isMobile: boolean }> = ({
  opacity,
  px,
  py,
  isMobile,
}) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Sky & Ocean Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF9F0] via-[#F8E2C4] to-[#F5F1E8]" />

      {/* Sun Disc & Morning Rays */}
      <svg className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 opacity-40" viewBox="0 0 1000 400" fill="none">
        <circle cx="500" cy="180" r="130" fill="url(#sun-glow-s1)" />
        <path d="M500 0 L500 400 M0 180 L1000 180 M150 40 L850 320" stroke="#FFF2D6" strokeWidth="1" strokeDasharray="6 6" strokeOpacity="0.4" />
        <defs>
          <radialGradient id="sun-glow-s1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(500 180) rotate(90) scale(130)">
            <stop stopColor="#FFF2D6" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#FF9E4A" stopOpacity="0.5" />
            <stop offset="1" stopColor="#F8E2C4" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Primary Background Artwork */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-top w-full h-full opacity-85 mix-blend-multiply"
        style={{
          backgroundImage: "url('/goa-journey-bg.jpg')",
          transform: isMobile ? 'none' : `translate3d(${px * -4}px, ${py * -4}px, 0)`,
        }}
      />
    </div>
  );
};

/** ☀️ Scene 2: Daytime & Focused Builder Workspace (25% – 50% Scroll) */
const Scene2Daytime: React.FC<{ opacity: number; px: number; py: number; isMobile: boolean }> = ({
  opacity,
  px,
  py,
  isMobile,
}) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Clean Daylight Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF9F0] via-[#F5F1E8] to-[#FAF6ED]" />

      {/* Distant Coastline & Ocean Waves Line Art */}
      <svg className="absolute top-1/3 left-0 w-full h-64 opacity-15" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="none">
        <path d="M0 100 Q300 60 600 100 T1200 100" stroke="#315746" strokeWidth="1.5" />
        <path d="M0 140 Q400 110 800 140 T1200 140" stroke="#9F452D" strokeWidth="1" strokeDasharray="6 4" />
      </svg>

      {/* Gentle Palm Leaf Shadows */}
      <TropicalLeaf
        variant="palm-frond-right"
        className="absolute top-12 right-0 w-80 opacity-15"
        color="#315746"
      />
    </div>
  );
};

/** 🌅 Scene 3: Golden Hour & Calm Empty Beach (50% – 75% Scroll) */
const Scene3GoldenHour: React.FC<{ opacity: number; px: number; py: number; isMobile: boolean }> = ({
  opacity,
  px,
  py,
  isMobile,
}) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Golden Hour Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED] via-[#F6E2C6] to-[#E06A42]" />

      {/* Setting Sun Glow */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-[#FFE3B3] blur-3xl opacity-30" />

      {/* Lifeguard Tower & Empty Sand Line Art */}
      <svg className="absolute bottom-12 left-8 w-44 h-60 opacity-20" viewBox="0 0 200 240" fill="none">
        <line x1="40" y1="240" x2="60" y2="100" stroke="#3D1D16" strokeWidth="3" />
        <line x1="160" y1="240" x2="140" y2="100" stroke="#3D1D16" strokeWidth="3" />
        <rect x="50" y="60" width="100" height="40" fill="#3D1D16" />
        <polygon points="40,60 100,20 160,60" fill="#3D1D16" />
      </svg>
    </div>
  );
};

/** 🌆 Scene 4: Completely Empty Goa Beach at Sunset (75% – 100% Scroll) */
const Scene4Sunset: React.FC<{ opacity: number; px: number; py: number; isMobile: boolean }> = ({
  opacity,
  px,
  py,
  isMobile,
}) => {
  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Deep Sunset Sky: Coral -> Magenta -> Deep Navy Dusk */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E06A42] via-[#9F452D] via-[#2B1D38] to-[#0A111E]" />

      {/* Large Setting Sun Horizon Circle */}
      <svg className="absolute bottom-36 left-1/2 -translate-x-1/2 w-64 h-64 opacity-50" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" fill="url(#setting-sun)" />
        <defs>
          <radialGradient id="setting-sun" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100 100) rotate(90) scale(80)">
            <stop stopColor="#FFC72C" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#FF5A36" stopOpacity="0.6" />
            <stop offset="1" stopColor="#9F452D" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Deserted Ocean Horizon & Palm Tree Silhouettes */}
      <svg className="absolute bottom-0 left-0 w-full h-48 opacity-45" viewBox="0 0 1200 180" fill="none" preserveAspectRatio="none">
        {/* Ocean Wave Layers */}
        <path d="M0 100 Q300 70 600 100 T1200 100 V180 H0 Z" fill="#151B2B" />
        <path d="M0 130 Q400 110 800 130 T1200 130 V180 H0 Z" fill="#0A111E" />
      </svg>

      {/* Palm Tree Silhouettes Left & Right */}
      <TropicalLeaf
        variant="palm-frond-left"
        className="absolute bottom-0 -left-12 w-96 opacity-40"
        color="#0A111E"
      />
      <TropicalLeaf
        variant="palm-frond-right"
        className="absolute bottom-0 -right-12 w-96 opacity-40"
        color="#0A111E"
      />

      {/* Distant Warm Light Dots */}
      {!isMobile && (
        <>
          <div className="absolute bottom-24 left-1/4 w-2 h-2 rounded-full bg-[#FFC72C]/60 blur-[1px] animate-pulse" />
          <div className="absolute bottom-28 right-1/3 w-1.5 h-1.5 rounded-full bg-[#FF5A36]/60 blur-[1px] animate-pulse" />
        </>
      )}
    </div>
  );
};

export const GoaEnvironment: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
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

  // Compute smooth crossfade opacities for the 4 narrative scenes
  const p = scrollProgress;
  let op1 = 0, op2 = 0, op3 = 0, op4 = 0;

  if (p <= 0.25) {
    op1 = 1 - p / 0.25;
    op2 = p / 0.25;
  } else if (p <= 0.55) {
    const t = (p - 0.25) / 0.30;
    op1 = 0;
    op2 = 1 - t;
    op3 = t;
  } else if (p <= 0.80) {
    const t = (p - 0.55) / 0.25;
    op1 = 0;
    op2 = 0;
    op3 = 1 - t;
    op4 = t;
  } else {
    op1 = 0;
    op2 = 0;
    op3 = 0;
    op4 = 1;
  }

  // Ensure top of page displays Scene 1 at 100% opacity
  if (p === 0) {
    op1 = 1;
    op2 = 0;
    op3 = 0;
    op4 = 0;
  }

  const px = parallaxState.x;
  const py = parallaxState.y;

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* Scene 1: Sunrise & Lively Morning Beach (0% – 25% Scroll) */}
      <Scene1Sunrise opacity={op1} px={px} py={py} isMobile={isMobile} />

      {/* Scene 2: Bright Daytime Workspace (25% – 50% Scroll) */}
      <Scene2Daytime opacity={op2} px={px} py={py} isMobile={isMobile} />

      {/* Scene 3: Golden Hour Calm Beach (50% – 75% Scroll) */}
      <Scene3GoldenHour opacity={op3} px={px} py={py} isMobile={isMobile} />

      {/* Scene 4: Completely Empty Goa Beach at Sunset (75% – 100% Scroll) */}
      <Scene4Sunset opacity={op4} px={px} py={py} isMobile={isMobile} />

      {/* Adaptive Vignette for Readability */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            scrollProgress > 0.8
              ? 'radial-gradient(circle at 50% 50%, transparent 30%, rgba(10, 17, 30, 0.4) 100%)'
              : 'radial-gradient(circle at 50% 50%, transparent 50%, rgba(253, 249, 240, 0.2) 100%)',
        }}
      />
    </div>
  );
};

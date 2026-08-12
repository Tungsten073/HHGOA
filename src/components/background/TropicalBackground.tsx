'use client';

import React, { useEffect, useState, useRef } from 'react';

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
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* 🌴 Full-Height Continuous Goa Journey Visual Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-top w-full h-full opacity-65 mix-blend-multiply transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/goa-journey-bg.jpg')",
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -5}px, ${py * -5}px, 0) scale(1.02)`,
        }}
      />

      {/* Subtle Soft Gradient Overlay to Maintain Sharp UI Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF9F0]/20 via-transparent to-[#0A111E]/30 pointer-events-none" />
    </div>
  );
};

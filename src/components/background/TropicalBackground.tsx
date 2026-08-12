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
      {/* 🌴 Crystal Clear Full-Height Continuous Goa Journey Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-top w-full h-full opacity-100 transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "url('/goa-journey-bg.jpg')",
          transform: reducedMotion || isMobile
            ? 'none'
            : `translate3d(${px * -5}px, ${py * -5}px, 0) scale(1.02)`,
        }}
      />
    </div>
  );
};

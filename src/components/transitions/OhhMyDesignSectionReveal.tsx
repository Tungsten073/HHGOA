'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

export const OhhMyDesignSectionReveal: React.FC<Props> = ({ children, className = '', delayMs = 0 }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delayMs);
          }
        });
      },
      {
        root: null,
        rootMargin: '-5% 0px -5% 0px',
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delayMs]);

  return (
    <div
      ref={sectionRef}
      className={`will-change-transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 [clip-path:inset(0%_0%_0%_0%_round_0px)]'
          : 'opacity-20 translate-y-12 scale-[0.96] [clip-path:inset(2%_1%_2%_1%_round_16px)]'
      } ${className}`}
    >
      {children}
    </div>
  );
};

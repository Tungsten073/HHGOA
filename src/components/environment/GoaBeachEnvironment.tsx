'use client';

import React, { useEffect, useState } from 'react';
import { useScrollProgress } from './useScrollProgress';
import { GoaSkySun } from './GoaSkySun';
import { GoaOcean } from './GoaOcean';
import { GoaBeachCoast } from './GoaBeachCoast';
import { GoaPeople } from './GoaPeople';
import { GoaLightsFire } from './GoaLightsFire';
import { TropicalLeaf } from '../background/TropicalLeaf';

export const GoaBeachEnvironment: React.FC = () => {
  const progress = useScrollProgress();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const motionHandler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionHandler);
    return () => mediaQuery.removeEventListener('change', motionHandler);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 🌅 1. Procedural Gradient Sky & Traveling Sun */}
      <GoaSkySun progress={progress} />

      {/* 🌊 2. Layered Procedural Ocean Waves */}
      <GoaOcean progress={progress} />

      {/* 🏖️ 3. Procedural Goa Sandy Beach, Huts, Surfboards, & Lighthouse */}
      <GoaBeachCoast progress={progress} />

      {/* 👥 4. Silhouetted Human Figure Density Decay (Morning Surfers -> Deserted Sunset) */}
      <GoaPeople progress={progress} />

      {/* 🔥 5. Evening Beach Shack Lights & Campfire Glow (Turns ON at Sunset) */}
      <GoaLightsFire progress={progress} />

      {/* 🌴 6. Swaying Procedural Palm Trees (Fore/Midground) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-Right Swaying Palm Frond */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-12 -right-12 w-72 sm:w-96"
            color={progress > 0.75 ? '#0A111E' : '#315746'}
            opacity={0.18}
          />
        </div>

        {/* Bottom-Left Swaying Palm Frond */}
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px]"
            color={progress > 0.75 ? '#0A111E' : '#315746'}
            opacity={0.22}
          />
        </div>
      </div>
    </div>
  );
};

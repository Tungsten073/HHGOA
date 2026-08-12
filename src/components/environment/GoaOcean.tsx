'use client';

import React from 'react';

interface Props {
  progress: number;
}

export const GoaOcean: React.FC<Props> = ({ progress }) => {
  // Wave colors transition: Cool Blue -> Turquoise -> Golden Gold -> Deep Sunset Navy
  const farOceanColor =
    progress > 0.7 ? '#1C2333' : progress > 0.4 ? '#C68B45' : progress > 0.2 ? '#2E80A6' : '#234168';
  const midOceanColor =
    progress > 0.7 ? '#131927' : progress > 0.4 ? '#A0632E' : progress > 0.2 ? '#246B8C' : '#1C3352';
  const nearWaveColor =
    progress > 0.7 ? '#0A111E' : progress > 0.4 ? '#7A431D' : progress > 0.2 ? '#1B5470' : '#142640';

  const sunReflectionOpacity = progress > 0.8 ? 0.3 : progress > 0.5 ? 0.5 : 0.35;

  return (
    <div className="absolute bottom-0 left-0 w-full h-[52%] pointer-events-none select-none z-0 overflow-hidden">
      {/* Sun Reflection Band on Ocean */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-80 h-full transition-opacity duration-500"
        style={{
          background: 'linear-gradient(180deg, rgba(255, 213, 138, 0.4) 0%, rgba(255, 90, 54, 0.2) 60%, transparent 100%)',
          opacity: sunReflectionOpacity,
          filter: 'blur(8px)',
        }}
      />

      {/* Layer 1: Far Ocean Horizon */}
      <svg
        className="absolute top-0 left-0 w-full h-28 opacity-90 transition-colors duration-700"
        viewBox="0 0 1200 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40 Q300 20 600 40 T1200 40 V120 H0 Z"
          fill={farOceanColor}
          className="transition-colors duration-700"
        />
      </svg>

      {/* Layer 2: Mid Ocean Waves */}
      <svg
        className="absolute top-12 left-0 w-full h-36 opacity-95 transition-colors duration-700 animate-goa-breeze"
        viewBox="0 0 1200 140"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60 Q250 30 500 60 T1000 60 T1200 70 V140 H0 Z"
          fill={midOceanColor}
          className="transition-colors duration-700"
        />
      </svg>

      {/* Layer 3: Near Shoreline Waves */}
      <svg
        className="absolute top-24 left-0 w-full h-44 transition-colors duration-700 animate-goa-breeze-reverse"
        viewBox="0 0 1200 160"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 80 Q350 50 700 80 T1200 90 V160 H0 Z"
          fill={nearWaveColor}
          className="transition-colors duration-700"
        />
        {/* Wave Foam Crest */}
        <path
          d="M0 80 Q350 50 700 80 T1200 90"
          stroke="#F5F1E8"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />
      </svg>
    </div>
  );
};

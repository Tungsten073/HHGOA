'use client';

import React from 'react';

interface Props {
  progress: number;
}

export const GoaBeachCoast: React.FC<Props> = ({ progress }) => {
  // Sand gradient color shift: Warm Morning Beige -> Daylight Cream -> Golden Sand -> Deep Dusk Sand
  const sandColor =
    progress > 0.75
      ? '#1C1522'
      : progress > 0.55
      ? '#D89B5F'
      : progress > 0.25
      ? '#E8CFA6'
      : '#D5B48B';

  return (
    <div className="absolute bottom-0 left-0 w-full h-[38%] pointer-events-none select-none z-0 overflow-hidden">
      {/* Sandy Beach Floor Surface */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full transition-colors duration-700"
        viewBox="0 0 1200 300"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Curved Coastline Sand Shore */}
        <path
          d="M0 120 Q300 80 600 120 T1200 140 V300 H0 Z"
          fill={sandColor}
          className="transition-colors duration-700"
        />

        {/* Footprint / Texture Accents */}
        <ellipse cx="250" cy="220" rx="8" ry="3" fill="#0A111E" opacity="0.15" />
        <ellipse cx="265" cy="226" rx="7" ry="3" fill="#0A111E" opacity="0.12" />
        <ellipse cx="650" cy="250" rx="9" ry="4" fill="#0A111E" opacity="0.15" />
        <ellipse cx="920" cy="210" rx="8" ry="3" fill="#0A111E" opacity="0.15" />
      </svg>

      {/* Lifeguard Tower Silhouette (Left Beach) */}
      <svg className="absolute bottom-16 left-6 sm:left-12 w-28 sm:w-36 h-48 opacity-75" viewBox="0 0 160 200" fill="none">
        <line x1="30" y1="200" x2="45" y2="80" stroke="#151B2B" strokeWidth="3" />
        <line x1="130" y1="200" x2="115" y2="80" stroke="#151B2B" strokeWidth="3" />
        <line x1="38" y1="140" x2="122" y2="140" stroke="#151B2B" strokeWidth="2" />
        <rect x="40" y="45" width="80" height="35" fill="#151B2B" />
        <polygon points="30,45 80,15 130,45" fill="#151B2B" />
        <line x1="120" y1="45" x2="120" y2="0" stroke="#151B2B" strokeWidth="2" />
        <polygon points="120,0 145,8 120,16" fill="#9F452D" />
      </svg>

      {/* Beach Huts & Surfboards (Right Beach) */}
      <svg className="absolute bottom-10 right-4 sm:right-12 w-64 sm:w-80 h-36 opacity-75" viewBox="0 0 320 160" fill="none">
        {/* Beach Shack Huts */}
        <polygon points="40,160 40,90 80,60 120,90 120,160" fill="#151B2B" />
        <polygon points="140,160 140,90 180,60 220,90 220,160" fill="#151B2B" />

        {/* Surfboards Resting on Sand */}
        <ellipse cx="250" cy="120" rx="6" ry="32" fill="#9F452D" transform="rotate(25 250 120)" />
        <ellipse cx="265" cy="125" rx="6" ry="30" fill="#D8A928" transform="rotate(20 265 125)" />
        <ellipse cx="280" cy="128" rx="6" ry="28" fill="#315746" transform="rotate(15 280 128)" />
      </svg>

      {/* Distant Coastal Cliff & Lighthouse (Top Right Horizon) */}
      <svg className="absolute top-0 right-0 w-72 sm:w-96 h-28 opacity-40" viewBox="0 0 400 120" fill="none">
        <path d="M100 120 C200 80 300 60 400 40 V120 H100 Z" fill="#151B2B" />
        {/* Lighthouse */}
        <rect x="360" y="15" width="10" height="30" fill="#151B2B" />
        <polygon points="365,0 358,15 372,15" fill="#151B2B" />
      </svg>
    </div>
  );
};

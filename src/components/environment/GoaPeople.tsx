'use client';

import React from 'react';

interface Props {
  progress: number;
}

export const GoaPeople: React.FC<Props> = ({ progress }) => {
  // Density decay:
  // Progress 0.0 -> 0.25 (Sunrise): 0.6 opacity (early morning surfers & walkers)
  // Progress 0.25 -> 0.55 (Day): 1.0 opacity (lively beachgoers)
  // Progress 0.55 -> 0.75 (Golden Hour): 0.25 opacity (almost empty)
  // Progress 0.75 -> 1.0 (Sunset): 0.0 opacity (COMPLETELY DESERTED BEACH!)
  let opacity = 0;
  if (progress <= 0.25) {
    opacity = 0.6 + (progress / 0.25) * 0.4;
  } else if (progress <= 0.55) {
    opacity = 1 - ((progress - 0.25) / 0.3) * 0.75;
  } else if (progress <= 0.75) {
    opacity = 0.25 - ((progress - 0.55) / 0.2) * 0.25;
  } else {
    opacity = 0;
  }

  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute bottom-0 left-0 w-full h-[32%] pointer-events-none select-none z-0 overflow-hidden transition-opacity duration-500"
      style={{ opacity }}
    >
      <svg className="absolute bottom-12 left-0 w-full h-24 opacity-80" viewBox="0 0 1200 100" fill="none">
        {/* Surfer Carrying Board (Left Shore) */}
        <g transform="translate(180, 20)">
          <ellipse cx="12" cy="10" rx="4" ry="5" fill="#151B2B" />
          <line x1="12" y1="15" x2="12" y2="45" stroke="#151B2B" strokeWidth="3" />
          <ellipse cx="6" cy="30" rx="3" ry="18" fill="#9F452D" transform="rotate(-15 6 30)" />
        </g>

        {/* Morning Walkers Pair (Center Shore) */}
        <g transform="translate(480, 30)">
          <ellipse cx="10" cy="10" rx="3.5" ry="4.5" fill="#151B2B" />
          <line x1="10" y1="14.5" x2="10" y2="40" stroke="#151B2B" strokeWidth="2.5" />
          <ellipse cx="24" cy="12" rx="3.5" ry="4.5" fill="#151B2B" />
          <line x1="24" y1="16.5" x2="24" y2="40" stroke="#151B2B" strokeWidth="2.5" />
        </g>

        {/* Sitting Figure (Right Shore) */}
        <g transform="translate(850, 35)">
          <circle cx="10" cy="10" r="4" fill="#151B2B" />
          <path d="M10 14 L5 30 L15 35" stroke="#151B2B" strokeWidth="3" fill="none" />
        </g>
      </svg>
    </div>
  );
};

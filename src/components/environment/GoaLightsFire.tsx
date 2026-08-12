'use client';

import React from 'react';

interface Props {
  progress: number;
}

export const GoaLightsFire: React.FC<Props> = ({ progress }) => {
  // Lights & Fire opacity interpolates from 0 (daylight) to 1 (sunset/night)
  const opacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.35));

  if (opacity <= 0.01) return null;

  return (
    <div
      className="absolute bottom-0 left-0 w-full h-[35%] pointer-events-none select-none z-0 overflow-hidden transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Campfire Glow Horizon Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#FF5A36] blur-2xl opacity-40 animate-pulse" />

      {/* Beach Shack String Lights */}
      <svg className="absolute bottom-16 right-6 sm:right-16 w-64 h-20 opacity-90" viewBox="0 0 250 80" fill="none">
        <path d="M10 20 Q70 40 130 20 T240 20" stroke="#D8A928" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="30" cy="24" r="3" fill="#FFC72C" className="animate-pulse" />
        <circle cx="70" cy="30" r="3" fill="#FF5A36" className="animate-pulse" />
        <circle cx="110" cy="24" r="3" fill="#FFC72C" className="animate-pulse" />
        <circle cx="150" cy="22" r="3" fill="#FF5A36" className="animate-pulse" />
        <circle cx="190" cy="24" r="3" fill="#FFC72C" className="animate-pulse" />
      </svg>

      {/* Campfire Flame & Sparks (Center Beach) */}
      <svg className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-20" viewBox="0 0 60 80" fill="none">
        {/* Logs */}
        <line x1="15" y1="70" x2="45" y2="60" stroke="#3D1D16" strokeWidth="4" />
        <line x1="45" y1="70" x2="15" y2="60" stroke="#3D1D16" strokeWidth="4" />
        {/* Flames */}
        <polygon points="30,20 15,65 45,65" fill="#FF5A36" />
        <polygon points="30,30 20,65 40,65" fill="#FFC72C" />
        <polygon points="30,42 24,65 36,65" fill="#FFE3B3" />
        {/* Sparks */}
        <circle cx="28" cy="15" r="2" fill="#FFC72C" className="animate-pulse" />
        <circle cx="34" cy="10" r="1.5" fill="#FF5A36" className="animate-pulse" />
      </svg>
    </div>
  );
};

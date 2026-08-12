'use client';

import React from 'react';

export const GoaCoordinateStamp: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`font-mono text-[10px] font-bold tracking-widest text-[#9F452D] uppercase flex items-center gap-2 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#9F452D] animate-pulse" />
      <span>GOA / INDIA // 15.4909° N, 73.8278° E</span>
    </div>
  );
};

export const ArchitecturalGeometrySVG: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`opacity-15 pointer-events-none ${className}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="100" height="100" stroke="#151B2B" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="60" cy="60" r="40" stroke="#9F452D" strokeWidth="1" />
      <path d="M10 60H110M60 10V110" stroke="#151B2B" strokeWidth="0.5" />
      <path d="M25 25L95 95M95 25L25 95" stroke="#9F452D" strokeWidth="0.5" />
    </svg>
  );
};

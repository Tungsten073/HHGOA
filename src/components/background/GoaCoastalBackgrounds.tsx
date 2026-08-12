'use client';

import React from 'react';

/** 🌅 Section 1: Hero Sunrise Coastal Landscape SVG Background */
export const HeroSunriseBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Sky Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7C082] via-[#E8824A] to-[#FDF9F0]" />

      {/* Sun Disc & Rays */}
      <svg className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 opacity-45" viewBox="0 0 1000 400" fill="none">
        <circle cx="500" cy="180" r="140" fill="url(#sun-glow)" />
        <path d="M500 0 L500 400 M0 180 L1000 180 M150 40 L850 320 M850 40 L150 320" stroke="#FFF5E4" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="6 6" />
        <defs>
          <radialGradient id="sun-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(500 180) rotate(90) scale(140)">
            <stop stopColor="#FFF2D6" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="#FF9E4A" stopOpacity="0.5" />
            <stop offset="1" stopColor="#E8824A" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Distant Coastal Cliffs & Lighthouse Silhouette */}
      <svg className="absolute bottom-0 right-0 w-full md:w-3/4 h-64 opacity-25" viewBox="0 0 800 200" fill="none" preserveAspectRatio="none">
        {/* Coastal Cliff */}
        <path d="M400 200 C500 140 650 120 800 100 V200 H400 Z" fill="#3D1D16" />
        {/* Lighthouse */}
        <rect x="720" y="50" width="12" height="50" fill="#3D1D16" />
        <polygon points="726,30 718,50 734,50" fill="#3D1D16" />
        {/* Lighthouse Beam */}
        <polygon points="726,35 0,0 0,60" fill="#FFF2D6" opacity="0.15" />
      </svg>

      {/* Left Palm Trees Silhouette */}
      <svg className="absolute top-0 -left-10 w-72 sm:w-96 h-[480px] opacity-35" viewBox="0 0 300 500" fill="none">
        <path d="M-20 500 C30 350 60 180 40 0" stroke="#2B1410" strokeWidth="14" strokeLinecap="round" />
        <path d="M40 20 Q-40 0 -60 40 Q20 30 40 20 Z" fill="#2B1410" />
        <path d="M40 20 Q120 -20 160 20 Q60 40 40 20 Z" fill="#2B1410" />
        <path d="M40 20 Q-20 -80 -40 -100 Q10 -30 40 20 Z" fill="#2B1410" />
        <path d="M40 20 Q80 -90 120 -110 Q50 -40 40 20 Z" fill="#2B1410" />
        <path d="M40 20 Q-70 80 -100 110 Q-10 60 40 20 Z" fill="#2B1410" />
      </svg>

      {/* Right Palm Trees Silhouette */}
      <svg className="absolute top-0 -right-10 w-72 sm:w-96 h-[480px] opacity-35" viewBox="0 0 300 500" fill="none">
        <path d="M320 500 C270 350 240 180 260 0" stroke="#2B1410" strokeWidth="14" strokeLinecap="round" />
        <path d="M260 20 Q340 0 360 40 Q280 30 260 20 Z" fill="#2B1410" />
        <path d="M260 20 Q180 -20 140 20 Q240 40 260 20 Z" fill="#2B1410" />
        <path d="M260 20 Q320 -80 340 -100 Q290 -30 260 20 Z" fill="#2B1410" />
        <path d="M260 20 Q200 -90 160 -110 Q230 -40 260 20 Z" fill="#2B1410" />
      </svg>

      {/* Soft Wave Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FDF9F0] to-transparent opacity-90" />
    </div>
  );
};

/** 🏖️ Section 3: Golden Hour Beach Lifeguard Tower Background */
export const GoldenHourBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF9F0] via-[#F8E1C2] to-[#E58957]" />

      {/* Lifeguard Tower Silhouette Left */}
      <svg className="absolute bottom-4 left-6 w-36 sm:w-48 h-56 opacity-25" viewBox="0 0 200 240" fill="none">
        {/* Tower Legs */}
        <line x1="40" y1="240" x2="60" y2="100" stroke="#3D1D16" strokeWidth="4" />
        <line x1="160" y1="240" x2="140" y2="100" stroke="#3D1D16" strokeWidth="4" />
        <line x1="50" y1="170" x2="150" y2="170" stroke="#3D1D16" strokeWidth="3" />
        <line x1="45" y1="200" x2="155" y2="200" stroke="#3D1D16" strokeWidth="3" />
        {/* Cabin */}
        <rect x="50" y="60" width="100" height="40" fill="#3D1D16" />
        {/* Roof */}
        <polygon points="40,60 100,20 160,60" fill="#3D1D16" />
        {/* Flag Pole & Flag */}
        <line x1="150" y1="60" x2="150" y2="0" stroke="#3D1D16" strokeWidth="2" />
        <polygon points="150,0 180,10 150,20" fill="#9F452D" />
      </svg>

      {/* Setting Sun Glow */}
      <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-[#FFE3B3] blur-3xl opacity-40" />
    </div>
  );
};

/** 🔥 Section 5: Evening Beach Bonfire & Dusk Background */
export const EveningDuskBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Deep Dusk Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2333] via-[#131927] to-[#0A111E]" />

      {/* Bonfire Glow Horizon */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-[#FF5A36] blur-3xl opacity-25" />

      {/* Evening Bonfire & Silhouettes */}
      <svg className="absolute bottom-0 left-0 w-full h-44 opacity-30" viewBox="0 0 1200 160" fill="none" preserveAspectRatio="none">
        {/* Beach Huts */}
        <polygon points="100,160 100,100 140,70 180,100 180,160" fill="#0A111E" />
        <polygon points="1020,160 1020,100 1060,70 1100,100 1100,160" fill="#0A111E" />
        {/* Bonfire Sparks */}
        <circle cx="600" cy="110" r="6" fill="#FFC72C" />
        <circle cx="590" cy="95" r="4" fill="#FF5A36" />
        <circle cx="610" cy="90" r="3" fill="#FFC72C" />
        <circle cx="604" cy="75" r="2" fill="#FFE3B3" />
        {/* People Sitting Around Bonfire */}
        <ellipse cx="560" cy="140" rx="10" ry="14" fill="#0A111E" />
        <ellipse cx="640" cy="140" rx="10" ry="14" fill="#0A111E" />
        <ellipse cx="520" cy="145" rx="12" ry="10" fill="#0A111E" />
        <ellipse cx="680" cy="145" rx="12" ry="10" fill="#0A111E" />
      </svg>
    </div>
  );
};

'use client';

import React from 'react';
import { SocialGallery } from './SocialGallery';
import { GoaCoordinateStamp, ArchitecturalGeometrySVG } from './GalleryMetadata';
import { ArrowUp, Sparkles, Terminal } from 'lucide-react';

interface Props {
  onNavigateToGenerator?: () => void;
}

export const SocialEdition: React.FC<Props> = ({ onNavigateToGenerator }) => {
  const handleCtaClick = () => {
    if (onNavigateToGenerator) {
      onNavigateToGenerator();
    } else {
      const el = document.getElementById('generator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="social-edition" className="relative w-full py-20 overflow-hidden font-syne select-none">
      {/* Oversized low-opacity 247 background graphic watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] text-[#151B2B] font-black text-[280px] sm:text-[420px] leading-none z-0 tracking-tighter">
        247
      </div>

      {/* Background Topographic & Architectural Overlay */}
      <div className="absolute inset-0 bg-topographic opacity-30 mix-blend-multiply pointer-events-none z-0" />
      <ArchitecturalGeometrySVG className="absolute top-12 left-8 hidden lg:block" />
      <ArchitecturalGeometrySVG className="absolute bottom-20 right-12 hidden lg:block rotate-45" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ── Section Intro Header ── */}
        <header className="mb-14 border-b-2 border-[#151B2B] pb-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            {/* Small Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#151B2B] text-[#F5F1E8] font-mono text-xs font-bold uppercase tracking-widest border border-[#151B2B] shadow-brutal w-max">
              <Terminal className="w-3.5 h-3.5 text-[#D8A928]" />
              <span>SOCIAL EDITION / 05</span>
            </div>

            {/* Goa Location Metadata Stamp */}
            <GoaCoordinateStamp />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 p-4 sm:p-6 rounded-lg bg-gradient-to-r from-[#F8F1E2]/95 via-[#F8F1E2]/75 to-transparent border-l-4 border-[#151B2B]">
              {/* Large Heading */}
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#151B2B] leading-[0.95]">
                THE BUILDERS<br />
                <span className="text-[#9F452D]">OF GOA.</span>
              </h2>
              {/* Supporting Text */}
              <p className="font-mono text-xs sm:text-sm font-bold text-[#151B2B] uppercase tracking-widest mt-4">
                BUILDER MARKS CREATED FOR THE ROAD TO 247.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right font-mono text-xs text-[#151B2B]/60 uppercase tracking-widest gap-1 border-t lg:border-t-0 border-[#151B2B]/20 pt-4 lg:pt-0">
              <span className="font-bold text-[#151B2B]">HH GOA / 247</span>
              <span>GOA, INDIA</span>
              <span className="text-[#9F452D] font-bold">28—31 OCTOBER 2026</span>
            </div>
          </div>
        </header>

        {/* ── Gallery Grid ── */}
        <SocialGallery />
      </div>
    </section>
  );
};

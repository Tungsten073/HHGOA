'use client';

import React from 'react';
import { SocialGallery } from './SocialGallery';
import { GoaCoordinateStamp, ArchitecturalGeometrySVG } from './GalleryMetadata';
import { Terminal, MapPin } from 'lucide-react';

interface Props {
  onNavigateToGenerator?: () => void;
}

export const SocialEdition: React.FC<Props> = () => {
  return (
    <section id="social-edition" className="relative w-full py-20 overflow-hidden font-syne select-none">
      {/* Oversized low-opacity 247 background graphic watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] text-[#F5F1E8] font-black text-[280px] sm:text-[420px] leading-none z-0 tracking-tighter">
        247
      </div>

      {/* Background Topographic & Architectural Overlay */}
      <div className="absolute inset-0 bg-topographic opacity-25 pointer-events-none z-0" />
      <ArchitecturalGeometrySVG className="absolute top-12 left-8 hidden lg:block opacity-40" />
      <ArchitecturalGeometrySVG className="absolute bottom-20 right-12 hidden lg:block rotate-45 opacity-40" />

      {/* Main Section Content Wrapper */}
      <div className="w-full relative z-10">
        {/* Section Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Vertical Sidebar Label for Desktop */}
            <div className="hidden lg:flex flex-col items-center gap-4 font-mono text-[10px] font-bold text-[#F5F1E8]/70 uppercase tracking-widest pt-4 border-r-2 border-[#F5F1E8]/20 pr-6 shrink-0">
              <span>ROAD TO 247</span>
              <span className="text-[#E2B93B]">↓</span>
              <span>CULTURE</span>
              <span className="text-[#E2B93B]">↓</span>
              <span>ICONS</span>
              <span className="text-[#E2B93B]">↓</span>
              <span>ARCHIVE</span>
            </div>

            <div className="flex-1 w-full">
              {/* ── Section Intro Header ── */}
              <header className="border-b-2 border-[#F5F1E8]/20 pb-8 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  {/* Small Label */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111827] text-[#F5F1E8] font-mono text-xs font-bold uppercase tracking-widest border border-[#F5F1E8]/30 shadow-brutal w-max">
                    <Terminal className="w-3.5 h-3.5 text-[#E2B93B]" />
                    <span>ARCHIVE // 06 · GOA, INDIA · HHG.26 / 247</span>
                  </div>

                  {/* Goa Location Metadata Stamp */}
                  <GoaCoordinateStamp />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                  <div className="lg:col-span-8 p-5 sm:p-6 rounded-lg bg-[#111827]/85 backdrop-blur-md border-l-4 border-[#E2B93B] shadow-brutal-lg text-[#F5F1E8]">
                    {/* Large Heading */}
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F1E8] leading-[0.95]">
                      SOCIAL ICON<br />
                      <span className="text-[#E2B93B]">EDITORIAL ARCHIVE.</span>
                    </h2>
                    {/* Supporting Subheading */}
                    <p className="font-mono text-xs sm:text-sm font-bold text-[#E2B93B] uppercase tracking-widest mt-3">
                      CULTURE / ICONS / ARCHIVE
                    </p>
                  </div>

                  {/* Right Metadata Block */}
                  <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right font-mono text-xs text-[#F5F1E8]/80 uppercase tracking-widest gap-1 border-t lg:border-t-0 border-[#F5F1E8]/20 pt-4 lg:pt-0">
                    <div className="flex items-center gap-1 font-bold text-[#E2B93B]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>GOA / INDIA</span>
                    </div>
                    <span>15.4909° N · 73.8278° E</span>
                    <span className="text-[#F5F1E8] font-bold">28—31 OCTOBER 2026</span>
                  </div>
                </div>
              </header>
            </div>
          </div>
        </div>

        {/* ── FULL-WIDTH CONTINUOUS MARQUEE GALLERY TRACK ── */}
        <div className="w-full px-2">
          <SocialGallery />
        </div>
      </div>
    </section>
  );
};

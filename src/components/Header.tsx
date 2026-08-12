'use client';

import React from 'react';
import { FormatSelector } from '@/components/FormatSelector';
import { FormatType } from '@/types';
import { MapPin, ArrowRight } from 'lucide-react';

export type NavTab = 'event' | 'builder-id' | 'gallery';

interface HeaderProps {
  format: FormatType;
  onFormatChange: (format: FormatType) => void;
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  format,
  onFormatChange,
  activeTab,
  onTabChange,
}) => {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 h-20 bg-[#FDF9F0]/90 backdrop-blur-xl border-b-2 border-[#151B2B] font-mono text-xs tracking-widest uppercase text-[#151B2B]">
        {/* Brand Logo */}
        <button
          onClick={() => onTabChange('event')}
          className="font-syne text-2xl font-extrabold tracking-tighter text-[#151B2B] hover:text-[#9F452D] transition-colors cursor-pointer"
        >
          HHG.26
        </button>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            type="button"
            onClick={() => onTabChange('event')}
            className={`pb-1 transition-colors cursor-pointer uppercase ${
              activeTab === 'event'
                ? 'text-[#9F452D] font-bold border-b-2 border-[#9F452D]'
                : 'text-[#45464c] hover:text-[#151B2B]'
            }`}
          >
            EVENT
          </button>
          <button
            type="button"
            onClick={() => onTabChange('builder-id')}
            className={`pb-1 transition-colors cursor-pointer uppercase ${
              activeTab === 'builder-id'
                ? 'text-[#9F452D] font-bold border-b-2 border-[#9F452D]'
                : 'text-[#45464c] hover:text-[#151B2B]'
            }`}
          >
            BUILDER ID
          </button>
          <button
            type="button"
            onClick={() => onTabChange('gallery')}
            className={`pb-1 transition-colors cursor-pointer uppercase ${
              activeTab === 'gallery'
                ? 'text-[#9F452D] font-bold border-b-2 border-[#9F452D]'
                : 'text-[#45464c] hover:text-[#151B2B]'
            }`}
          >
            GALLERY
          </button>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <MapPin
            className="w-5 h-5 text-[#151B2B] hover:text-[#9F452D] transition-colors cursor-pointer"
            onClick={() => onTabChange('event')}
          />
          <button
            type="button"
            onClick={() => onTabChange('builder-id')}
            className="bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] px-4 py-2 hover:bg-[#F5F1E8] hover:text-[#151B2B] transition-colors font-mono font-bold shadow-brutal active:scale-95 text-xs tracking-widest uppercase cursor-pointer"
          >
            GET MARK
          </button>
        </div>
      </nav>

      {/* Mode-Specific Hero Header */}
      {activeTab === 'event' ? (
        /* ── EVENT HERO PAGE (Matching Exact Screenshot) ── */
        <header className="w-full max-w-7xl mx-auto pt-28 pb-16 px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[460px]">
            {/* Left Metadata Column */}
            <div className="md:col-span-2 flex flex-col gap-1 border-l-2 border-[#151B2B] pl-4 py-2 text-left order-2 md:order-1">
              <span className="font-mono text-xs tracking-widest uppercase text-[#151B2B]">
                GOA / INDIA
              </span>
              <span className="font-mono text-xs tracking-widest uppercase text-[#9F452D] font-bold">
                15.4909° N, 73.8278° E
              </span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#151B2B]/60 mt-4">
                SYS.REF: 2026.INIT
              </span>
            </div>

            {/* Center Heavy Typography Anchor */}
            <div className="md:col-span-8 flex flex-col items-start justify-center text-left order-1 md:order-2">
              <div className="flex gap-4 mb-2 text-xs font-mono tracking-widest uppercase">
                <span className="text-[#151B2B]/60">GOA, INDIA</span>
                <span className="text-[#9F452D] font-bold">15.4909° N, 73.8278° E</span>
              </div>
              <h1 className="font-syne text-5xl sm:text-7xl lg:text-8xl font-extrabold text-[#151B2B] uppercase leading-[0.9] tracking-tight">
                <span className="block">HACKER HOUSE</span>
                <span className="block text-[#9F452D]">GOA 2026</span>
              </h1>
              <div className="font-syne text-3xl sm:text-5xl font-extrabold text-[#151B2B] uppercase tracking-tight border-b-2 border-[#151B2B] pb-3 mt-4 w-full max-w-2xl">
                THE ROAD TO 247.
              </div>
            </div>

            {/* Right Secondary Call to Action Column */}
            <div className="md:col-span-2 flex flex-col justify-end items-start md:items-end text-left md:text-right order-3 mt-6 md:mt-0">
              <p className="font-syne text-sm sm:text-base font-bold text-[#151B2B] uppercase leading-tight">
                CREATE YOUR<br />BUILDER MARK.
              </p>
              <div className="mt-4 w-12 h-[2px] bg-[#151B2B]" />
              <button
                type="button"
                onClick={() => onTabChange('builder-id')}
                className="mt-6 font-mono text-xs font-bold text-[#9F452D] border-2 border-[#9F452D] px-4 py-2 hover:bg-[#9F452D] hover:text-[#F5F1E8] transition-colors tracking-widest uppercase cursor-pointer shadow-brutal flex items-center gap-1.5"
              >
                <span>INITIATE SEQUENCE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* ── BUILDER ID / GENERATOR HERO HEADER ── */
        <header className="w-full max-w-6xl mx-auto pt-28 pb-8 px-4 flex flex-col items-center text-center space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs tracking-widest text-[#151B2B]/70 uppercase">
            <span>GOA, INDIA</span>
            <span className="text-[#9F452D] font-bold">15.4909° N, 73.8278° E</span>
            <span className="text-[#151B2B]/40">SYS.REF: 2026.INIT</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#151B2B] leading-[0.95] font-syne">
            Build your<br />
            <span className="text-[#9F452D]">builder mark.</span>
          </h1>

          {/* Subtitle Line */}
          <p className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#151B2B]/70 uppercase border-b-2 border-[#151B2B] pb-2 px-4">
            HACKER HOUSE GOA 2026 &nbsp;·&nbsp; THE ROAD TO 247 &nbsp;·&nbsp; #FrameInGoa
          </p>

          {/* Format Selector */}
          <div className="w-full max-w-md pt-2" id="generator">
            <FormatSelector format={format} onChange={onFormatChange} />
          </div>
        </header>
      )}
    </>
  );
};

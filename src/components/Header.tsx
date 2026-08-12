'use client';

import React from 'react';
import { FormatSelector } from '@/components/FormatSelector';
import { FormatType } from '@/types';
import { MapPin } from 'lucide-react';

interface HeaderProps {
  format: FormatType;
  onFormatChange: (format: FormatType) => void;
}

export const Header: React.FC<HeaderProps> = ({ format, onFormatChange }) => {
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 h-20 bg-[#FDF9F0]/85 backdrop-blur-xl border-b-2 border-[#151B2B] font-mono text-xs tracking-widest uppercase text-[#151B2B]">
        {/* Brand Logo */}
        <div className="font-sans text-2xl font-extrabold tracking-tighter text-[#151B2B]">
          HHG.26
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[#45464c] hover:text-[#151B2B] transition-colors pb-1">
            EVENT
          </a>
          <a href="#generator" className="text-[#9F452D] font-bold border-b-2 border-[#9F452D] pb-1">
            BUILDER ID
          </a>
          <a href="#" className="text-[#45464c] hover:text-[#151B2B] transition-colors pb-1">
            GALLERY
          </a>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <MapPin className="w-5 h-5 text-[#151B2B] hover:text-[#9F452D] transition-colors cursor-pointer" />
          <a
            href="#generator"
            className="bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] px-4 py-2 hover:bg-[#F5F1E8] hover:text-[#151B2B] transition-colors font-bold shadow-brutal active:scale-95 transition-transform text-xs tracking-widest"
          >
            GET MARK
          </a>
        </div>
      </nav>

      {/* Main Hero Header */}
      <header className="w-full max-w-6xl mx-auto pt-28 pb-8 px-4 flex flex-col items-center text-center space-y-6">
        {/* Metadata Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs tracking-widest text-[#151B2B]/70 uppercase">
          <span>GOA, INDIA</span>
          <span className="text-[#9F452D] font-bold">15.4909° N, 73.8278° E</span>
          <span className="text-[#151B2B]/40">SYS.REF: 2026.INIT</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-[#151B2B] leading-[0.95]">
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
    </>
  );
};

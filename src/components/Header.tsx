'use client';

import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';

export type NavTab = 'event' | 'build' | 'social' | 'about';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 bg-[#FDF9F0]/85 backdrop-blur-xl border-b-2 border-[#151B2B] font-mono text-xs tracking-widest uppercase text-[#151B2B]">
      {/* Left Brand Logo & Sub-label */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onTabChange('event')}
          className="font-syne text-2xl font-extrabold tracking-tighter text-[#151B2B] hover:text-[#9F452D] transition-colors cursor-pointer"
        >
          HHG.26
        </button>
        <span className="hidden lg:inline-block font-mono text-[10px] text-[#151B2B]/60 tracking-widest uppercase border-l-2 border-[#151B2B]/20 pl-4">
          THE ROAD TO 247 // HH GOA
        </span>
      </div>

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
          onClick={() => onTabChange('build')}
          className={`pb-1 transition-colors cursor-pointer uppercase ${
            activeTab === 'build'
              ? 'text-[#9F452D] font-bold border-b-2 border-[#9F452D]'
              : 'text-[#45464c] hover:text-[#151B2B]'
          }`}
        >
          BUILD
        </button>
        <button
          type="button"
          onClick={() => onTabChange('social')}
          className={`pb-1 transition-colors cursor-pointer uppercase ${
            activeTab === 'social'
              ? 'text-[#9F452D] font-bold border-b-2 border-[#9F452D]'
              : 'text-[#45464c] hover:text-[#151B2B]'
          }`}
        >
          SOCIAL
        </button>
        <button
          type="button"
          onClick={() => onTabChange('about')}
          className={`pb-1 transition-colors cursor-pointer uppercase ${
            activeTab === 'about'
              ? 'text-[#9F452D] font-bold border-b-2 border-[#9F452D]'
              : 'text-[#45464c] hover:text-[#151B2B]'
          }`}
        >
          ABOUT
        </button>
      </div>

      {/* Right Action Button & Location */}
      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono text-[#151B2B]/70 uppercase">
          <MapPin className="w-3.5 h-3.5 text-[#9F452D]" />
          <span>15.4909° N, 73.8278° E</span>
        </div>
        <button
          type="button"
          onClick={() => onTabChange('build')}
          className="bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] px-4 py-1.5 hover:bg-[#9F452D] hover:border-[#9F452D] transition-colors font-mono font-bold shadow-brutal active:scale-95 text-xs tracking-widest uppercase cursor-pointer"
        >
          GET MARK
        </button>
      </div>
    </nav>
  );
};

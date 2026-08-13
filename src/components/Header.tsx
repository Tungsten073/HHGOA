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
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 h-16 liquid-glass animate-liquid-shimmer font-mono text-xs tracking-widest uppercase text-[#F5F1E8]">
      {/* Left Brand Logo & Sub-label */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => onTabChange('event')}
          className="font-syne text-2xl font-extrabold tracking-tighter text-[#F5F1E8] hover:text-[#E2B93B] transition-colors cursor-pointer"
        >
          HHG.26
        </button>
        <span className="hidden lg:inline-block font-mono text-[10px] text-[#F5F1E8]/70 tracking-widest uppercase border-l-2 border-[#F5F1E8]/20 pl-4">
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
              ? 'text-[#E2B93B] font-bold border-b-2 border-[#E2B93B]'
              : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8]'
          }`}
        >
          EVENT
        </button>
        <button
          type="button"
          onClick={() => onTabChange('build')}
          className={`pb-1 transition-colors cursor-pointer uppercase ${
            activeTab === 'build'
              ? 'text-[#E2B93B] font-bold border-b-2 border-[#E2B93B]'
              : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8]'
          }`}
        >
          BUILD
        </button>
        <button
          type="button"
          onClick={() => onTabChange('social')}
          className={`pb-1 transition-colors cursor-pointer uppercase ${
            activeTab === 'social'
              ? 'text-[#E2B93B] font-bold border-b-2 border-[#E2B93B]'
              : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8]'
          }`}
        >
          SOCIAL
        </button>
        <button
          type="button"
          onClick={() => onTabChange('about')}
          className={`pb-1 transition-colors cursor-pointer uppercase ${
            activeTab === 'about'
              ? 'text-[#E2B93B] font-bold border-b-2 border-[#E2B93B]'
              : 'text-[#F5F1E8]/70 hover:text-[#F5F1E8]'
          }`}
        >
          ABOUT
        </button>
      </div>

      {/* Right Action Button & Location */}
      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono text-[#F5F1E8]/80 uppercase">
          <MapPin className="w-3.5 h-3.5 text-[#E2B93B]" />
          <span>15.4909° N, 73.8278° E</span>
        </div>
        <button
          type="button"
          onClick={() => onTabChange('build')}
          className="bg-[#A9482E] text-[#F5F1E8] border-2 border-[#F5F1E8]/30 px-4 py-1.5 hover:bg-[#E2B93B] hover:text-[#111827] transition-colors font-mono font-bold shadow-brutal active:scale-95 text-xs tracking-widest uppercase cursor-pointer"
        >
          GET MARK
        </button>
      </div>
    </nav>
  );
};

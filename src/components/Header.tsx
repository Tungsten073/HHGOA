'use client';

import React, { useState } from 'react';
import { MapPin, Menu, X } from 'lucide-react';

export type NavTab = 'event' | 'build' | 'social' | 'about';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-12 h-16 bg-[#111827]/95 backdrop-blur-md border-b-2 border-[#F5F1E8]/20 font-mono text-xs tracking-widest uppercase text-[#F5F1E8] shadow-md">
        {/* Left Brand Logo & Sub-label */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleMobileNav('event')}
            className="font-syne text-xl sm:text-2xl font-extrabold tracking-tighter text-[#F5F1E8] hover:text-[#E2B93B] transition-colors cursor-pointer"
          >
            HHG.26
          </button>
          <span className="hidden lg:inline-block font-mono text-[10px] text-[#F5F1E8]/70 tracking-widest uppercase border-l-2 border-[#F5F1E8]/20 pl-3">
            THE ROAD TO 247 // HH GOA
          </span>
        </div>

        {/* Center Nav Links for Desktop */}
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

        {/* Right Action Button, Location & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 text-[10px] font-mono text-[#F5F1E8]/80 uppercase">
            <MapPin className="w-3.5 h-3.5 text-[#E2B93B]" />
            <span>15.4909° N, 73.8278° E</span>
          </div>
          <button
            type="button"
            onClick={() => handleMobileNav('build')}
            className="bg-[#A9482E] text-[#F5F1E8] border-2 border-[#F5F1E8]/30 px-3.5 sm:px-4 py-1.5 hover:bg-[#E2B93B] hover:text-[#111827] transition-colors font-mono font-bold shadow-brutal active:scale-95 text-xs tracking-widest uppercase cursor-pointer"
          >
            GET MARK
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F1E8] hover:text-[#E2B93B] border border-[#F5F1E8]/20 bg-[#111827] cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#111827]/95 backdrop-blur-xl border-b-2 border-[#F5F1E8]/20 md:hidden flex flex-col p-6 space-y-6 font-mono text-sm uppercase tracking-widest text-[#F5F1E8] animate-in fade-in duration-150">
          <button
            onClick={() => handleMobileNav('event')}
            className={`p-3 text-left border-b border-[#F5F1E8]/10 font-bold ${
              activeTab === 'event' ? 'text-[#E2B93B] bg-[#F5F1E8]/5' : 'text-[#F5F1E8]'
            }`}
          >
            01 // EVENT MANIFESTO
          </button>
          <button
            onClick={() => handleMobileNav('build')}
            className={`p-3 text-left border-b border-[#F5F1E8]/10 font-bold ${
              activeTab === 'build' ? 'text-[#E2B93B] bg-[#F5F1E8]/5' : 'text-[#F5F1E8]'
            }`}
          >
            02 // BUILD MARK GENERATOR
          </button>
          <button
            onClick={() => handleMobileNav('social')}
            className={`p-3 text-left border-b border-[#F5F1E8]/10 font-bold ${
              activeTab === 'social' ? 'text-[#E2B93B] bg-[#F5F1E8]/5' : 'text-[#F5F1E8]'
            }`}
          >
            03 // SOCIAL ICON ARCHIVE
          </button>
          <button
            onClick={() => handleMobileNav('about')}
            className={`p-3 text-left border-b border-[#F5F1E8]/10 font-bold ${
              activeTab === 'about' ? 'text-[#E2B93B] bg-[#F5F1E8]/5' : 'text-[#F5F1E8]'
            }`}
          >
            04 // ABOUT HACKER HOUSE GOA
          </button>
          <div className="pt-4 flex items-center justify-between font-mono text-[10px] text-[#E2B93B] font-bold">
            <span>GOA, INDIA · 15.4909° N, 73.8278° E</span>
            <span>BATCH 247</span>
          </div>
        </div>
      )}
    </>
  );
};

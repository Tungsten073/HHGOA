'use client';

import React from 'react';
import { Palmtree } from 'lucide-react';
import { FormatSelector } from '@/components/FormatSelector';
import { FormatType } from '@/types';

interface HeaderProps {
  format: FormatType;
  onFormatChange: (format: FormatType) => void;
}

export const Header: React.FC<HeaderProps> = ({ format, onFormatChange }) => {
  return (
    <header className="w-full max-w-6xl mx-auto pt-10 pb-8 px-4 flex flex-col items-center text-center space-y-5">
      {/* Event Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-amber-300 text-[11px] font-mono font-bold hh-tracking shadow-md">
        <Palmtree className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>HACKER HOUSE GOA 2026</span>
        <span className="text-emerald-700" aria-hidden>•</span>
        <span className="text-rose-400">THE ROAD TO 247</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight gradient-text-hh font-display leading-[0.9] text-balance">
        Create your<br className="hidden sm:block" /> builder mark.
      </h1>

      {/* Event Details Line */}
      <p className="text-[11px] font-mono font-bold hh-tracking text-emerald-200/40 uppercase">
        28–31 OCTOBER 2026 &nbsp;·&nbsp; GOA, INDIA &nbsp;·&nbsp; #FrameInGoa
      </p>

      {/* Format Selector — in hero so user picks format before scrolling */}
      <div className="w-full max-w-md pt-1">
        <FormatSelector format={format} onChange={onFormatChange} />
      </div>
    </header>
  );
};

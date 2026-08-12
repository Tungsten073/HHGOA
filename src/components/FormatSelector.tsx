'use client';

import React from 'react';
import { FormatType } from '@/types';
import { User, IdCard } from 'lucide-react';

interface Props {
  format: FormatType;
  onChange: (format: FormatType) => void;
}

export const FormatSelector: React.FC<Props> = ({ format, onChange }) => {
  return (
    <div
      role="tablist"
      aria-label="Choose output format"
      className="w-full p-1.5 bg-emerald-950/80 backdrop-blur-md border border-emerald-800/80 rounded-2xl flex items-center shadow-lg"
    >
      <button
        type="button"
        role="tab"
        aria-selected={format === 'frame'}
        onClick={() => onChange('frame')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
          format === 'frame'
            ? 'bg-amber-400 text-emerald-950 shadow-md shadow-amber-400/20 font-black'
            : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/50'
        }`}
      >
        <User className="w-4 h-4 shrink-0" />
        <span>Format A: PFP Overlay</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={format === 'id-card'}
        onClick={() => onChange('id-card')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
          format === 'id-card'
            ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-black'
            : 'text-emerald-200/70 hover:text-emerald-100 hover:bg-emerald-900/50'
        }`}
      >
        <IdCard className="w-4 h-4 shrink-0" />
        <span>Format B: Builder ID Pass</span>
      </button>
    </div>
  );
};

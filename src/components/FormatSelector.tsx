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
      className="w-full p-1.5 bg-[#F5F1E8] border-2 border-[#151B2B] flex items-center shadow-brutal rounded-none"
    >
      <button
        type="button"
        role="tab"
        aria-selected={format === 'frame'}
        onClick={() => onChange('frame')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-xs sm:text-sm font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
          format === 'frame'
            ? 'bg-[#151B2B] text-[#F5F1E8] font-black'
            : 'text-[#151B2B] hover:bg-[#151B2B]/10'
        }`}
      >
        <User className="w-4 h-4 shrink-0" />
        <span>PFP FRAME</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={format === 'id-card'}
        onClick={() => onChange('id-card')}
        className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-xs sm:text-sm font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
          format === 'id-card'
            ? 'bg-[#9F452D] text-[#F5F1E8] font-black'
            : 'text-[#151B2B] hover:bg-[#151B2B]/10'
        }`}
      >
        <IdCard className="w-4 h-4 shrink-0" />
        <span>BUILDER ID</span>
      </button>
    </div>
  );
};

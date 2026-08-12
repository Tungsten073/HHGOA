'use client';

import React from 'react';
import { TransformState } from '@/types';
import { ZoomIn, RotateCcw } from 'lucide-react';

interface Props {
  transform: TransformState;
  onChange: (newTransform: Partial<TransformState>) => void;
  onReset: () => void;
}

export const AdjustmentControls: React.FC<Props> = ({ transform, onChange, onReset }) => {
  return (
    <div className="flex items-center gap-3 bg-[#F5F1E8] border-2 border-[#151B2B] p-3 shadow-brutal text-[#151B2B]">
      <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-widest text-[#151B2B] shrink-0">
        <ZoomIn className="w-3.5 h-3.5 text-[#9F452D]" />
        <span>ZOOM</span>
      </span>

      <input
        type="range"
        min="0.5"
        max="2.5"
        step="0.05"
        value={transform.scale}
        onChange={(e) => onChange({ scale: parseFloat(e.target.value) })}
        className="flex-1 h-2 bg-[#151B2B]/20 rounded-none appearance-none cursor-pointer accent-[#9F452D]"
        aria-label="Zoom photo"
      />

      <span className="font-mono text-[11px] font-bold text-[#9F452D] w-10 text-right shrink-0 tabular-nums">
        {Math.round(transform.scale * 100)}%
      </span>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-[#151B2B] hover:text-[#9F452D] transition-colors cursor-pointer shrink-0 ml-1 uppercase"
        aria-label="Reset zoom and position"
      >
        <RotateCcw className="w-3 h-3" />
        <span>RESET</span>
      </button>
    </div>
  );
};

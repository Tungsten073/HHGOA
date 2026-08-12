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
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5 font-mono text-[11px] font-bold hh-tracking text-emerald-200/60 shrink-0">
        <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
        <span>ZOOM</span>
      </span>

      <input
        type="range"
        min="0.5"
        max="2.5"
        step="0.05"
        value={transform.scale}
        onChange={(e) => onChange({ scale: parseFloat(e.target.value) })}
        className="flex-1 h-1.5 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
        aria-label="Zoom photo"
      />

      <span className="font-mono text-[11px] text-amber-300 w-9 text-right shrink-0 tabular-nums">
        {Math.round(transform.scale * 100)}%
      </span>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1 font-mono text-[11px] font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer shrink-0 ml-1"
        aria-label="Reset zoom and position"
      >
        <RotateCcw className="w-3 h-3" />
        <span>RESET</span>
      </button>
    </div>
  );
};

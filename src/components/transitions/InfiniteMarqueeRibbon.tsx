'use client';

import React from 'react';

interface Props {
  items?: string[];
  speedSeconds?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  'HACKER HOUSE GOA 2026',
  'THE ROAD TO 247',
  'BUILD YOUR MARK',
  'GOA, INDIA · BATCH 247',
  '#FRAMEINGOA',
  'DECENTRALIZED BUILDER ARTIFACTS',
];

export const InfiniteMarqueeRibbon: React.FC<Props> = ({
  items = DEFAULT_ITEMS,
  speedSeconds = 25,
  className = '',
}) => {
  return (
    <div className={`w-full overflow-hidden bg-[#151B2B] text-[#F5F1E8] border-y-2 border-[#151B2B] py-3 select-none ${className}`}>
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {/* Track 1 */}
        <div className="flex items-center gap-8 px-4 shrink-0 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest">
          {items.map((item, idx) => (
            <React.Fragment key={`t1-${idx}`}>
              <span className="hover:text-[#D8A928] transition-colors">{item}</span>
              <span className="text-[#9F452D] font-black">✦</span>
            </React.Fragment>
          ))}
        </div>

        {/* Duplicate Track 2 for infinite seamless loop */}
        <div className="flex items-center gap-8 px-4 shrink-0 font-mono text-xs sm:text-sm font-bold uppercase tracking-widest" aria-hidden="true">
          {items.map((item, idx) => (
            <React.Fragment key={`t2-${idx}`}>
              <span className="hover:text-[#D8A928] transition-colors">{item}</span>
              <span className="text-[#9F452D] font-black">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

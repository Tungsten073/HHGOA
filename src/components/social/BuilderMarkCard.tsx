'use client';

import React, { useRef, useState, useEffect } from 'react';
import { DemoBuilder } from './GalleryArtifactModal';
import { THEME_CONFIGS } from '@/constants/templates';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface Props {
  builder: DemoBuilder;
  onClick: () => void;
}

export const BuilderMarkCard: React.FC<Props> = ({ builder, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -3.5; // Max 3.5 deg
    const rotateY = ((x - centerX) / centerX) * 3.5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const themeConfig = THEME_CONFIGS[builder.theme] || THEME_CONFIGS.editorial;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`View ${builder.name} demo artifact`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className="group relative w-full bg-[#F5F1E8] border-2 border-[#151B2B] p-5 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden selection:bg-none"
    >
      {/* Subtle background topographic pattern */}
      <div className="absolute inset-0 bg-topographic opacity-20 pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] font-bold tracking-widest text-[#151B2B]/70 uppercase mb-4">
        <span>BUILDER // {builder.id}</span>
        <span className="px-2 py-0.5 border border-[#151B2B] bg-[#FDF9F0] text-[#9F452D]">
          {builder.theme}
        </span>
      </div>

      {/* Center Visual Mock Graphic */}
      <div
        className="relative z-10 w-full aspect-square border-2 border-[#151B2B] p-4 flex flex-col items-center justify-center text-center my-2 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: themeConfig.bgColor, color: themeConfig.textColor }}
      >
        <div
          className="w-14 h-14 rounded-full border-2 border-current mb-3 flex items-center justify-center text-lg font-black font-syne shadow-md"
          style={{ backgroundColor: builder.accent, color: '#F5F1E8' }}
        >
          {builder.name.charAt(0)}
        </div>
        <div className="font-syne text-lg font-extrabold uppercase tracking-tight" style={{ color: '#F5F1E8' }}>
          {builder.name}
        </div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: themeConfig.secondaryColor }}>
          {builder.title}
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="relative z-10 mt-4 pt-3 border-t border-[#151B2B]/20 flex items-end justify-between">
        <div>
          <div className="font-syne text-base font-black text-[#151B2B] uppercase group-hover:text-[#9F452D] transition-colors">
            {builder.name}
          </div>
          <div className="font-mono text-[10px] font-bold text-[#9F452D] tracking-widest uppercase mt-0.5">
            {builder.track}
          </div>
        </div>

        {/* Hover Action Badge */}
        <div className="font-mono text-[10px] font-bold text-[#151B2B] group-hover:text-[#9F452D] flex items-center gap-1 uppercase tracking-wider transition-colors">
          <span>VIEW</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};

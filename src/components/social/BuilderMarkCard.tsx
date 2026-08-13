'use client';

import React, { useRef, useState, useEffect } from 'react';
import { IconCardData } from './GalleryArtifactModal';
import { ArrowUpRight, Sparkles, ShieldAlert } from 'lucide-react';

interface Props {
  builder: IconCardData;
  isFeatured?: boolean;
  onClick: () => void;
}

export const BuilderMarkCard: React.FC<Props> = ({ builder, isFeatured = false, onClick }) => {
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

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={`View ${builder.name} editorial concept artifact`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      className={`group relative w-full ${
        isFeatured ? 'min-w-[320px] sm:min-w-[380px]' : 'min-w-[280px] sm:min-w-[320px]'
      } bg-gradient-to-br ${builder.bgGradient} border-2 border-[#151B2B] p-5 shadow-brutal hover:shadow-brutal-lg transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden select-none snap-center`}
    >
      {/* Subtle background topographic pattern */}
      <div className="absolute inset-0 bg-topographic opacity-20 pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] font-bold tracking-widest text-[#F5F1E8] uppercase mb-4">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D8A928]" />
          <span>{builder.category}</span>
        </span>
        <span className="px-2 py-0.5 border border-[#F5F1E8]/30 bg-[#151B2B] text-[#D8A928]">
          #{builder.id}
        </span>
      </div>

      {/* Center Artwork Graphic */}
      <div className="relative z-10 w-full aspect-square border-2 border-[#F5F1E8]/30 p-4 flex flex-col items-center justify-center text-center my-2 shadow-inner bg-black/40 transition-transform duration-300 group-hover:scale-[1.03]">
        <div
          className="w-16 h-16 rounded-full border-2 border-[#F5F1E8] mb-3 flex items-center justify-center text-3xl shadow-lg"
          style={{ backgroundColor: builder.avatarBg }}
        >
          {builder.iconSymbol}
        </div>
        <div className="font-syne text-xl font-black uppercase tracking-tight text-[#F5F1E8]">
          {builder.name}
        </div>
        <div className="font-mono text-[10px] font-bold tracking-widest uppercase mt-1" style={{ color: builder.accent }}>
          {builder.theme}
        </div>
        <div className="font-mono text-[9px] text-[#F5F1E8]/70 tracking-widest uppercase mt-2 italic">
          {builder.goaElement}
        </div>
      </div>

      {/* Mandatory Small Disclaimer Label */}
      <div className="relative z-10 my-2 px-2 py-1 bg-[#151B2B]/80 border border-[#F5F1E8]/20 font-mono text-[9px] font-bold text-[#D8A928] tracking-widest uppercase flex items-center gap-1">
        <ShieldAlert className="w-3 h-3 text-[#9F452D] shrink-0" />
        <span className="truncate">EDITORIAL CONCEPT · NOT PARTICIPANT</span>
      </div>

      {/* Bottom Metadata */}
      <div className="relative z-10 mt-2 pt-3 border-t border-[#F5F1E8]/20 flex items-end justify-between text-[#F5F1E8]">
        <div>
          <div className="font-syne text-base font-black uppercase group-hover:text-[#D8A928] transition-colors">
            {builder.name}
          </div>
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase mt-0.5 text-[#F5F1E8]/70">
            {builder.subtitle}
          </div>
        </div>

        {/* Hover Action Badge */}
        <div className="font-mono text-[10px] font-bold text-[#D8A928] group-hover:text-[#F5F1E8] flex items-center gap-1 uppercase tracking-wider transition-colors">
          <span>VIEW</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};

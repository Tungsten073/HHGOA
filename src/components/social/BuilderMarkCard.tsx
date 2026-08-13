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
  const imageRef = useRef<HTMLImageElement>(null);
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

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(${isFeatured ? 1.05 : 1.02})`;

    if (imageRef.current) {
      const moveX = ((x - centerX) / centerX) * 4;
      const moveY = ((y - centerY) / centerY) * 4;
      imageRef.current.style.transform = `scale(1.05) translate3d(${moveX}px, ${moveY}px, 0)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(${isFeatured ? 1.04 : 1})`;
    if (imageRef.current) {
      imageRef.current.style.transform = 'scale(1) translate3d(0, 0, 0)';
    }
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
      className={`group relative ${
        isFeatured ? 'w-[320px] sm:w-[360px] scale-[1.04] z-20' : 'w-[290px] sm:w-[320px] z-10'
      } h-[460px] bg-[#111827] border-2 border-[#111827] p-4 shadow-brutal hover:shadow-brutal-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col justify-between overflow-hidden select-none snap-center text-[#F5F0E6]`}
    >
      {/* Background Topographic Texture */}
      <div className="absolute inset-0 bg-topographic opacity-25 pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-10 flex items-center justify-between font-mono text-[11px] font-bold tracking-widest text-[#F5F0E6] uppercase mb-3">
        <span className="flex items-center gap-1 text-[#E2B93B]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{builder.category}</span>
        </span>
        <span className="px-2 py-0.5 border border-[#F5F0E6]/30 bg-[#0C3027] text-[#E2B93B]">
          #{builder.id}
        </span>
      </div>

      {/* Uploaded Photograph Main Viewport */}
      <div className="relative z-10 w-full h-[240px] border-2 border-[#F5F0E6]/30 overflow-hidden bg-black shadow-inner my-1">
        <img
          ref={imageRef}
          src={builder.imagePath}
          alt={builder.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out filter contrast-[1.05] brightness-[0.98]"
          style={{ objectPosition: builder.objectPosition || 'center center' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-50 pointer-events-none" />
      </div>

      {/* Mandatory Disclaimer Badge */}
      <div className="relative z-10 my-2 px-2 py-1 bg-[#A9482E]/20 border border-[#A9482E]/50 font-mono text-[9px] font-bold text-[#E2B93B] tracking-widest uppercase flex items-center gap-1">
        <ShieldAlert className="w-3 h-3 text-[#A9482E] shrink-0" />
        <span className="truncate">{builder.disclaimer}</span>
      </div>

      {/* Bottom Metadata */}
      <div className="relative z-10 pt-2 border-t border-[#F5F0E6]/20 flex items-end justify-between text-[#F5F0E6]">
        <div>
          <div className="font-syne text-base font-black uppercase group-hover:text-[#E2B93B] transition-colors leading-tight">
            {builder.name}
          </div>
          <div className="font-mono text-[10px] font-bold tracking-widest uppercase mt-0.5 text-[#E2B93B]">
            {builder.subtitle}
          </div>
        </div>

        {/* Hover Action Badge */}
        <div className="font-mono text-[10px] font-bold text-[#E2B93B] group-hover:text-[#F5F0E6] flex items-center gap-1 uppercase tracking-wider transition-colors">
          <span>VIEW</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};

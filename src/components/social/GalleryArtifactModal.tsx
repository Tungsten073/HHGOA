'use client';

import React, { useEffect } from 'react';
import { X, Download, Sparkles, Terminal, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface IconCardData {
  id: string;
  name: string;
  category: 'EDITORIAL FEATURE' | 'ICON SERIES' | 'CULTURAL ICON' | 'ROAD & SPEED' | 'FICTIONAL ICON';
  theme: string;
  subtitle: string;
  description: string;
  disclaimer: string;
  accent: string;
  avatarBg: string;
  iconSymbol: string;
  goaElement: string;
  bgGradient: string;
}

interface Props {
  builder: IconCardData | null;
  onClose: () => void;
}

export const GalleryArtifactModal: React.FC<Props> = ({ builder, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!builder) return null;

  const handleDownloadPreview = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: [builder.accent, '#9f452d', '#d8a928', '#151b2b'],
      });
    } catch {}

    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#0B1020';
      ctx.fillRect(0, 0, 1080, 1350);

      ctx.strokeStyle = builder.accent;
      ctx.lineWidth = 16;
      ctx.strokeRect(30, 30, 1020, 1290);

      ctx.fillStyle = '#F5F1E8';
      ctx.font = '900 64px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(builder.name.toUpperCase(), 540, 420);

      ctx.fillStyle = builder.accent;
      ctx.font = '800 32px "JetBrains Mono", monospace';
      ctx.fillText(builder.category, 540, 500);

      ctx.fillStyle = 'rgba(245, 241, 232, 0.7)';
      ctx.font = '600 24px "JetBrains Mono", monospace';
      ctx.fillText(`HH GOA 2026 · ${builder.theme} · #FrameInGoa`, 540, 600);

      ctx.fillStyle = '#9F452D';
      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.fillText('EDITORIAL FEATURE — CONCEPT BUILDER ONLY', 540, 720);

      const link = document.createElement('a');
      link.download = `HH_Goa_Icon_${builder.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1020]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F5F1E8] border-2 border-[#151B2B] p-6 sm:p-8 shadow-brutal-lg max-h-[90vh] overflow-y-auto font-syne">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#151B2B] text-[#F5F1E8] hover:bg-[#9F452D] transition-colors border-2 border-[#151B2B] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Category Badge */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#9F452D] font-bold tracking-widest uppercase mb-2">
          <Award className="w-4 h-4 text-[#D8A928]" />
          <span>{builder.category} // ICON SERIES {builder.id}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#151B2B] tracking-tight">
          {builder.name}
        </h2>
        <p className="font-mono text-xs font-bold text-[#9F452D] tracking-widest uppercase mb-4">
          {builder.theme} &nbsp;·&nbsp; {builder.subtitle}
        </p>

        {/* Mandatory Disclaimer Badge */}
        <div className="flex items-center gap-2 p-2.5 mb-6 bg-[#9F452D]/10 border border-[#9F452D] font-mono text-[11px] font-bold text-[#9F452D] tracking-widest uppercase">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{builder.disclaimer}</span>
        </div>

        {/* Collectible Editorial Card Graphic */}
        <div
          className={`w-full relative p-6 border-2 border-[#151B2B] shadow-brutal mb-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${builder.bgGradient}`}
        >
          {/* Card Top Stamp */}
          <div className="flex justify-between items-center font-mono text-xs font-bold tracking-widest text-[#F5F1E8] mb-6">
            <span className="px-2 py-0.5 bg-[#151B2B] text-[#D8A928] border border-[#F5F1E8]/20">
              {builder.category}
            </span>
            <span>BATCH 247 · GOA, INDIA</span>
          </div>

          {/* Central Artwork Frame */}
          <div className="w-full aspect-[4/3] bg-black/40 border-2 border-[#F5F1E8]/30 p-6 flex flex-col items-center justify-center text-center my-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-topographic opacity-20 pointer-events-none" />
            <div
              className="w-20 h-20 rounded-full border-2 border-[#F5F1E8] mb-4 flex items-center justify-center text-3xl shadow-lg"
              style={{ backgroundColor: builder.avatarBg }}
            >
              {builder.iconSymbol}
            </div>
            <div className="font-syne text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F5F1E8]">
              {builder.name}
            </div>
            <div className="font-mono text-xs font-bold mt-1 tracking-widest uppercase" style={{ color: builder.accent }}>
              {builder.subtitle}
            </div>
            <div className="font-mono text-[10px] text-[#F5F1E8]/70 tracking-widest uppercase mt-3 italic">
              {builder.goaElement}
            </div>
          </div>

          {/* Neutral Description */}
          <p className="font-mono text-xs text-[#F5F1E8]/90 tracking-wide mb-4 leading-relaxed bg-[#0B1020]/60 p-3 border border-[#F5F1E8]/20">
            {builder.description}
          </p>

          {/* Footer Metadata */}
          <div className="flex justify-between items-end font-mono text-[11px] text-[#F5F1E8]/80 pt-4 border-t border-[#F5F1E8]/20">
            <div>
              <div className="font-bold text-[#D8A928]">HH GOA / 247 ICONS</div>
              <div>LOCATION: GOA, INDIA</div>
            </div>
            <div className="text-right font-bold text-[#D8A928]">
              #FrameInGoa
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadPreview}
            className="flex-1 flex items-center justify-center gap-2 bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] py-3 px-6 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#9F452D] transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#D8A928]" />
            <span>DOWNLOAD CONCEPT ARTIFACT</span>
          </button>
          <button
            onClick={onClose}
            className="flex-none bg-[#FDF9F0] text-[#151B2B] border-2 border-[#151B2B] py-3 px-6 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#151B2B] hover:text-[#F5F1E8] transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

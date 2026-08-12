'use client';

import React, { useEffect } from 'react';
import { FrameTheme, FormatType } from '@/types';
import { THEME_CONFIGS } from '@/constants/templates';
import { X, Download, Sparkles, MapPin, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface DemoBuilder {
  id: string;
  name: string;
  title: string;
  stack: string;
  track: string;
  format: FormatType;
  theme: FrameTheme;
  aspect: 'square' | 'portrait' | 'tall';
  avatarBg: string;
  accent: string;
}

interface Props {
  builder: DemoBuilder | null;
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

  const themeConfig = THEME_CONFIGS[builder.theme] || THEME_CONFIGS.editorial;

  const handleDownloadPreview = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#9f452d', '#d8a928', '#315746', '#151b2b'],
      });
    } catch {}

    // Create a temporary canvas export for demo download
    const canvas = document.createElement('canvas');
    canvas.width = builder.format === 'frame' ? 1080 : 1080;
    canvas.height = builder.format === 'frame' ? 1080 : 1350;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = themeConfig.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = themeConfig.cardBg;
      ctx.fillRect(40, 40, canvas.width - 80, canvas.height - 80);

      ctx.fillStyle = themeConfig.textColor;
      ctx.font = '900 64px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(builder.name, canvas.width / 2, 400);

      ctx.fillStyle = themeConfig.secondaryColor;
      ctx.font = '700 36px "Fira Code", monospace';
      ctx.fillText(builder.title, canvas.width / 2, 500);

      ctx.fillStyle = themeConfig.mutedTextColor;
      ctx.font = '600 24px "Fira Code", monospace';
      ctx.fillText(`HH GOA 2026 · ${builder.stack} · #FrameInGoa`, canvas.width / 2, 600);

      const link = document.createElement('a');
      link.download = `HH_Goa_Demo_${builder.name.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#151B2B]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F5F1E8] border-2 border-[#151B2B] p-6 sm:p-8 shadow-brutal-lg max-h-[90vh] overflow-y-auto font-syne">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#151B2B] text-[#F5F1E8] hover:bg-[#9F452D] transition-colors border-2 border-[#151B2B] cursor-pointer"
          aria-label="Close preview modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#9F452D] font-bold tracking-widest uppercase mb-2">
          <Terminal className="w-4 h-4" />
          <span>DEMO ARTIFACT PREVIEW // {builder.id}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#151B2B] tracking-tight">
          {builder.name}
        </h2>
        <p className="font-mono text-xs font-bold text-[#9F452D] tracking-widest uppercase mb-6">
          {builder.title} &nbsp;·&nbsp; {builder.track}
        </p>

        {/* Demo Artifact Presentation Card */}
        <div
          className="w-full relative p-6 border-2 border-[#151B2B] shadow-brutal mb-6 flex flex-col justify-between"
          style={{ backgroundColor: themeConfig.bgColor, color: themeConfig.textColor }}
        >
          {/* Card Top Stamp */}
          <div className="flex justify-between items-center font-mono text-xs font-bold tracking-widest mb-6 opacity-80" style={{ color: themeConfig.secondaryColor }}>
            <span>BATCH 247 · GOA, INDIA</span>
            <span>{builder.format === 'frame' ? '1080×1080 PFP' : '1080×1350 PASS'}</span>
          </div>

          {/* Central Artwork Simulation */}
          <div className="w-full aspect-[4/3] bg-black/20 border-2 border-current p-6 flex flex-col items-center justify-center text-center my-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-topographic opacity-20 pointer-events-none" />
            <div
              className="w-20 h-20 rounded-full border-2 border-current mb-4 flex items-center justify-center text-2xl font-black font-syne"
              style={{ backgroundColor: builder.accent, color: '#F5F1E8' }}
            >
              {builder.name.charAt(0)}
            </div>
            <div className="font-syne text-2xl sm:text-3xl font-extrabold uppercase tracking-tight" style={{ color: '#F5F1E8' }}>
              {builder.name}
            </div>
            <div className="font-mono text-xs font-bold mt-1 tracking-widest uppercase" style={{ color: themeConfig.accentColor }}>
              {builder.title}
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex justify-between items-end font-mono text-[11px] pt-4 border-t border-current/20 opacity-75">
            <div>
              <div className="font-bold">LOCATION: GOA, INDIA</div>
              <div>COORD: 15.4909° N, 73.8278° E</div>
            </div>
            <div className="text-right font-bold" style={{ color: themeConfig.secondaryColor }}>
              #FrameInGoa
            </div>
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs mb-6">
          <div className="p-3 bg-[#FDF9F0] border-2 border-[#151B2B]">
            <div className="text-[10px] text-[#151B2B]/60 font-bold uppercase">TRACK</div>
            <div className="font-bold text-[#151B2B] truncate">{builder.track}</div>
          </div>
          <div className="p-3 bg-[#FDF9F0] border-2 border-[#151B2B]">
            <div className="text-[10px] text-[#151B2B]/60 font-bold uppercase">FORMAT</div>
            <div className="font-bold text-[#151B2B] uppercase">{builder.format}</div>
          </div>
          <div className="p-3 bg-[#FDF9F0] border-2 border-[#151B2B]">
            <div className="text-[10px] text-[#151B2B]/60 font-bold uppercase">THEME</div>
            <div className="font-bold text-[#9F452D] uppercase">{builder.theme}</div>
          </div>
          <div className="p-3 bg-[#FDF9F0] border-2 border-[#151B2B]">
            <div className="text-[10px] text-[#151B2B]/60 font-bold uppercase">BATCH</div>
            <div className="font-bold text-[#151B2B]">247 GOA</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadPreview}
            className="flex-1 flex items-center justify-center gap-2 bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] py-3 px-6 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#9F452D] transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD SAMPLE PNG</span>
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

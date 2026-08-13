'use client';

import React, { useEffect } from 'react';
import { X, Download, ShieldAlert, Award, Camera } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface IconCardData {
  id: string;
  name: string;
  category: 'HISTORICAL ARCHIVE' | 'CINEMA / CULTURE' | 'PUBLIC LIFE / LEADERSHIP' | 'FICTIONAL ICON' | 'RACING / PERFORMANCE';
  subtitle: string;
  description: string;
  disclaimer: string;
  imagePath: string;
  accent: string;
  themeBg: string;
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
        colors: [builder.accent, '#A9482E', '#E2B93B', '#111827'],
      });
    } catch {}

    const link = document.createElement('a');
    link.download = `HH_Goa_Archive_${builder.name.replace(/\s+/g, '_')}.jpg`;
    link.href = builder.imagePath;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111827]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#F5F0E6] border-2 border-[#111827] p-6 sm:p-8 shadow-brutal-lg max-h-[90vh] overflow-y-auto font-syne">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-[#111827] text-[#F5F0E6] hover:bg-[#A9482E] transition-colors border-2 border-[#111827] cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Category Badge */}
        <div className="flex items-center gap-2 font-mono text-xs text-[#A9482E] font-bold tracking-widest uppercase mb-2">
          <Award className="w-4 h-4 text-[#E2B93B]" />
          <span>{builder.category} // ARCHIVE {builder.id}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black uppercase text-[#111827] tracking-tight">
          {builder.name}
        </h2>
        <p className="font-mono text-xs font-bold text-[#A9482E] tracking-widest uppercase mb-4">
          {builder.subtitle}
        </p>

        {/* Mandatory Disclaimer Badge */}
        <div className="flex items-center gap-2 p-2.5 mb-6 bg-[#A9482E]/10 border border-[#A9482E] font-mono text-[11px] font-bold text-[#A9482E] tracking-widest uppercase">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{builder.disclaimer}</span>
        </div>

        {/* Collectible Editorial Card Display */}
        <div className="w-full relative border-2 border-[#111827] shadow-brutal mb-6 flex flex-col justify-between overflow-hidden bg-[#111827] text-[#F5F0E6]">
          {/* Card Top Stamp */}
          <div className="p-4 flex justify-between items-center font-mono text-xs font-bold tracking-widest border-b border-[#F5F0E6]/20 bg-[#0C3027]">
            <span className="px-2 py-0.5 bg-[#111827] text-[#E2B93B] border border-[#F5F0E6]/20">
              {builder.category}
            </span>
            <span>ARCHIVE // {builder.id} · GOA, INDIA</span>
          </div>

          {/* Uploaded Photography Presentation */}
          <div className="w-full relative aspect-[4/3] overflow-hidden bg-black flex items-center justify-center">
            <img
              src={builder.imagePath}
              alt={builder.name}
              className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.98]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end font-mono text-[10px] text-[#F5F0E6] font-bold tracking-widest uppercase">
              <span className="flex items-center gap-1 bg-[#111827]/80 px-2 py-1 border border-[#F5F0E6]/20">
                <Camera className="w-3 h-3 text-[#E2B93B]" />
                <span>ARCHIVAL PHOTOGRAPH</span>
              </span>
              <span className="text-[#E2B93B]">HHG.26 / 247</span>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-[#111827] font-mono text-xs text-[#F5F0E6]/90 leading-relaxed border-t border-[#F5F0E6]/20">
            {builder.description}
          </div>

          {/* Footer Metadata */}
          <div className="p-4 flex justify-between items-end font-mono text-[11px] text-[#F5F0E6]/80 border-t border-[#F5F0E6]/20 bg-[#0C3027]">
            <div>
              <div className="font-bold text-[#E2B93B]">ROAD TO 247 · CULTURE ARCHIVE</div>
              <div>LOCATION: GOA, INDIA · 15.4909° N, 73.8278° E</div>
            </div>
            <div className="text-right font-bold text-[#E2B93B]">
              #FrameInGoa
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadPreview}
            className="flex-1 flex items-center justify-center gap-2 bg-[#111827] text-[#F5F0E6] border-2 border-[#111827] py-3 px-6 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#A9482E] transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#E2B93B]" />
            <span>DOWNLOAD ARCHIVAL CARD</span>
          </button>
          <button
            onClick={onClose}
            className="flex-none bg-[#F5F0E6] text-[#111827] border-2 border-[#111827] py-3 px-6 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#111827] hover:text-[#F5F0E6] transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

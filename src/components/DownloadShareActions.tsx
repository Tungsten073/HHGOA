'use client';

import React, { useState } from 'react';
import { BuilderData, FormatType } from '@/types';
import { downloadCanvasAsImage } from '@/lib/utils/downloadHelper';
import confetti from 'canvas-confetti';
import { Download, Share2, Link as LinkIcon, Check, Loader2 } from 'lucide-react';

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  format: FormatType;
  builderData: BuilderData;
}

export const DownloadShareActions: React.FC<Props> = ({ canvasRef, format, builderData }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#9f452d', '#d8a928', '#315746', '#151b2b'],
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    triggerConfetti();
    const filename = format === 'frame' ? 'HH_Goa_2026_PFP_Frame.png' : 'HH_Goa_2026_Builder_Pass.png';
    downloadCanvasAsImage(canvas, filename);
  };

  const uploadAndGetShareUrl = async (): Promise<string | null> => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    if (shareUrl) return shareUrl;

    setIsUploading(true);
    try {
      const imageBase64 = canvas.toDataURL('image/png', 0.95);
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64, builderData }),
      });

      const data = await res.json();
      if (data.success && data.shareUrl) {
        try {
          localStorage.setItem(`hh-mark-${data.shareId}`, imageBase64);
          localStorage.setItem('hh-latest-builder-mark', imageBase64);
        } catch {
          // LocalStorage save error fallback
        }
        setShareUrl(data.shareUrl);
        setIsUploading(false);
        return data.shareUrl;
      }
    } catch (error) {
      console.error('Failed to create share link:', error);
    }
    setIsUploading(false);
    return null;
  };

  const handleShareToX = async () => {
    triggerConfetti();

    const url = await uploadAndGetShareUrl();
    const fallbackUrl = typeof window !== 'undefined' ? window.location.origin : 'https://frame-in-goa.vercel.app';
    const finalUrl = url || fallbackUrl;

    const nameLine = builderData.name ? `👤 Name: ${builderData.name}\n` : '';
    const titleLine = builderData.title ? `⚡ Title: ${builderData.title}\n` : '';
    const stackLine = builderData.stack ? `🛠️ Stack: ${builderData.stack}\n` : '';

    const captionText = format === 'frame'
      ? `I just generated my Builder PFP Frame for Hacker House Goa 2026! 🚀🌴\n\n${nameLine}Building in Goa this October! #FrameInGoa #HackerHouseGoa`
      : `I just generated my Builder Pass for Hacker House Goa 2026! 🚀🌴\n\n${nameLine}${titleLine}${stackLine}\nSee you in Goa! #FrameInGoa #HackerHouseGoa`;

    const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(captionText)}&url=${encodeURIComponent(finalUrl)}`;
    window.open(intentUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    const url = await uploadAndGetShareUrl();
    const linkToCopy = url || window.location.href;

    try {
      await navigator.clipboard.writeText(linkToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
      {/* Download PNG */}
      <button
        type="button"
        onClick={handleDownload}
        className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-[#151B2B] text-[#F5F1E8] font-mono font-bold uppercase tracking-wider px-6 py-3.5 border-2 border-[#151B2B] shadow-brutal hover:bg-[#9F452D] hover:border-[#9F452D] active:scale-[0.98] transition-all cursor-pointer text-xs"
      >
        <Download className="w-4 h-4 text-[#F5F1E8]" />
        <span>DOWNLOAD HIGH-RES PNG</span>
      </button>

      {/* Share to X */}
      <button
        type="button"
        onClick={handleShareToX}
        disabled={isUploading}
        className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-[#9F452D] text-[#F5F1E8] font-mono font-bold uppercase tracking-wider px-6 py-3.5 border-2 border-[#151B2B] shadow-brutal hover:bg-[#151B2B] active:scale-[0.98] transition-all cursor-pointer text-xs disabled:opacity-75"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>PREPARING SHARE CARD…</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 fill-white" />
            <span>SHARE TO X (#FrameInGoa)</span>
          </>
        )}
      </button>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        disabled={isUploading}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#F5F1E8] text-[#151B2B] font-mono font-bold uppercase tracking-wider px-4 py-3.5 border-2 border-[#151B2B] shadow-brutal hover:bg-[#151B2B] hover:text-[#F5F1E8] transition-all cursor-pointer text-xs"
        title="Copy share link with OG card preview"
      >
        {copiedLink ? (
          <>
            <Check className="w-4 h-4 text-[#9F452D]" />
            <span className="text-[#9F452D] font-bold">COPIED!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4 text-[#151B2B]" />
            <span>COPY LINK</span>
          </>
        )}
      </button>
    </div>
  );
};

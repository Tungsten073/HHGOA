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
        colors: ['#ff5a36', '#ffc72c', '#0f382c', '#ea3546'],
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
        body: JSON.stringify({ imageBase64 }),
      });

      const data = await res.json();
      if (data.success && data.shareUrl) {
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

    const captionText = format === 'frame'
      ? `I just generated my PFP Frame for Hacker House Goa 2026! 🚀🌴\n\nBuilding in Goa this October! #FrameInGoa`
      : `I just generated my Builder Pass for Hacker House Goa 2026! 🚀🌴\n\nStack: ${builderData.stack}\nTitle: ${builderData.title}\n\nSee you in Goa! #FrameInGoa`;

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
        className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 bg-emerald-100 hover:bg-white text-emerald-950 font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
      >
        <Download className="w-4 h-4 text-emerald-950" />
        <span>Download High-Res PNG</span>
      </button>

      {/* Share to X */}
      <button
        type="button"
        onClick={handleShareToX}
        disabled={isUploading}
        className="w-full sm:w-auto flex-1 flex items-center justify-center space-x-2 gradient-btn-hh font-black px-6 py-3.5 rounded-xl text-sm shadow-xl shadow-rose-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            <span>Preparing Share Card...</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4 fill-white" />
            <span>Share to X (#FrameInGoa)</span>
          </>
        )}
      </button>

      {/* Copy Link */}
      <button
        type="button"
        onClick={handleCopyLink}
        disabled={isUploading}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white font-bold px-4 py-3.5 rounded-xl text-sm border border-emerald-800 transition-all cursor-pointer"
        title="Copy share link with OG card preview"
      >
        {copiedLink ? (
          <>
            <Check className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-xs font-bold">Link Copied!</span>
          </>
        ) : (
          <>
            <LinkIcon className="w-4 h-4 text-amber-400" />
            <span className="text-xs">Copy Link</span>
          </>
        )}
      </button>
    </div>
  );
};

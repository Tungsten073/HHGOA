'use client';

import React, { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { BuilderData, FormatType, FrameTheme, TransformState } from '@/types';
import { getRandomTitle } from '@/constants/titles';
import { Header } from '@/components/Header';
import { ImageUploader } from '@/components/ImageUploader';
import { BuilderForm } from '@/components/BuilderForm';
import { AdjustmentControls } from '@/components/AdjustmentControls';
import { FrameCanvas } from '@/components/FrameCanvas';
import { DownloadShareActions } from '@/components/DownloadShareActions';
import { Sparkles, Box, Image as ImageIcon } from 'lucide-react';

const HHGoaHero3D = dynamic(
  () => import('@/components/three/HHGoaHero3D').then((mod) => mod.HHGoaHero3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[220px] sm:h-[280px] w-full max-w-sm mx-auto my-2 rounded-2xl bg-emerald-950/20 border border-emerald-900/30 animate-pulse flex items-center justify-center text-xs font-mono text-emerald-400/40">
        Loading 3D Hero…
      </div>
    ),
  }
);

const BuilderCard3D = dynamic(
  () => import('@/components/three/BuilderCard3D').then((mod) => mod.BuilderCard3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full rounded-2xl bg-emerald-950/20 border border-emerald-900/30 animate-pulse flex items-center justify-center text-xs font-mono text-emerald-400/40">
        Loading 3D Preview…
      </div>
    ),
  }
);

export default function Home() {
  const [format, setFormat] = useState<FormatType>('id-card');
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [theme, setTheme] = useState<FrameTheme>('editorial');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [canvasImageUrl, setCanvasImageUrl] = useState<string>('');

  const [builderData, setBuilderData] = useState<BuilderData>({
    name: '',
    stack: 'AI / ML',
    title: getRandomTitle('AI / ML'),
  });

  const [transform, setTransform] = useState<TransformState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDataChange = (newData: Partial<BuilderData>) => {
    setBuilderData((prev) => ({ ...prev, ...newData }));
  };

  const handleTransformChange = (newTransform: Partial<TransformState>) => {
    setTransform((prev) => ({ ...prev, ...newTransform }));
  };

  const handleResetTransform = () => {
    setTransform({ scale: 1, offsetX: 0, offsetY: 0 });
  };

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      setCanvasImageUrl(dataUrl);
    } catch (e) {
      console.warn('Canvas toDataURL failed for 3D texture:', e);
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#0b1a15] text-emerald-100 pb-16 relative overflow-hidden bg-editorial-grid">

      {/* ── Hero + Format Selector ── */}
      <Header format={format} onFormatChange={setFormat} />

      {/* ── 3D Hero Artifact ── */}
      <div className="max-w-4xl mx-auto px-4 -mt-2 mb-4">
        <HHGoaHero3D />
      </div>

      <div className="max-w-6xl mx-auto px-4 z-10 relative">

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-6 items-start">

          {/* LEFT — Controls */}
          <div className="flex flex-col gap-5">

            {/* Step 1: Upload */}
            <div className="space-y-2">
              <SectionLabel index="STEP 1" text="UPLOAD PHOTO" color="text-amber-400" />
              <ImageUploader
                onImageLoaded={(img) => {
                  setUserImage(img);
                  handleResetTransform();
                }}
                currentImageLoaded={!!userImage}
              />
            </div>

            {/* Step 2: Customize */}
            <div className="space-y-2">
              <SectionLabel index="STEP 2" text="CUSTOMIZE DETAILS" color="text-rose-400" />
              <BuilderForm
                format={format}
                builderData={builderData}
                theme={theme}
                onDataChange={handleDataChange}
                onThemeChange={setTheme}
              />
            </div>

          </div>

          {/* RIGHT — Canvas + Actions */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-6">

            {/* Canvas label row + 2D/3D View Switcher */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black hh-tracking uppercase text-emerald-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Canvas Output ({format === 'frame' ? '1080×1080' : '1080×1350 4:5'})
                </span>
              </span>

              {/* View Switcher */}
              <div className="flex items-center p-0.5 bg-emerald-950/80 border border-emerald-800/80 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewMode('2d')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                    viewMode === '2d'
                      ? 'bg-amber-400 text-emerald-950'
                      : 'text-emerald-300/70 hover:text-emerald-100'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>2D</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                    viewMode === '3d'
                      ? 'bg-rose-500 text-white'
                      : 'text-emerald-300/70 hover:text-emerald-100'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>3D</span>
                </button>
              </div>
            </div>

            {/* 2D Canvas — ALWAYS in DOM so canvasRef is available for downloads & shares */}
            <div className={viewMode === '2d' ? 'block' : 'hidden'}>
              <FrameCanvas
                format={format}
                userImage={userImage}
                builderData={builderData}
                theme={theme}
                transform={transform}
                onTransformChange={handleTransformChange}
                onCanvasReady={handleCanvasReady}
              />
            </div>

            {/* 3D Interactive Card Presentation */}
            {viewMode === '3d' && (
              <div className="w-full canvas-wrapper relative bg-slate-950 p-2 flex flex-col items-center justify-center rounded-2xl border-2 border-emerald-800/60">
                <div className="w-full text-center text-[10px] font-mono hh-tracking text-rose-400 font-bold mb-1">
                  INTERACTIVE 3D BUILDER MARK PREVIEW
                </div>
                <BuilderCard3D imageUrl={canvasImageUrl} />
              </div>
            )}

            {/* Hidden FrameCanvas during 3D mode so canvasRef stays populated */}
            {viewMode === '3d' && (
              <div className="sr-only aria-hidden">
                <FrameCanvas
                  format={format}
                  userImage={userImage}
                  builderData={builderData}
                  theme={theme}
                  transform={transform}
                  onTransformChange={handleTransformChange}
                  onCanvasReady={handleCanvasReady}
                />
              </div>
            )}

            {/* Zoom strip — appears below canvas once photo is loaded */}
            {userImage && (
              <div className="bg-emerald-950/50 backdrop-blur-sm px-4 py-3 rounded-xl border border-emerald-800/60">
                <AdjustmentControls
                  transform={transform}
                  onChange={handleTransformChange}
                  onReset={handleResetTransform}
                />
              </div>
            )}

            {/* Download / Share */}
            <DownloadShareActions
              canvasRef={canvasRef}
              format={format}
              builderData={builderData}
            />

          </div>
        </div>

        {/* ── Minimal footer strip ── */}
        <footer className="mt-14 pt-6 border-t border-emerald-900/50 text-center">
          <p className="font-mono text-[10px] hh-tracking uppercase text-emerald-200/25">
            GOA, INDIA &nbsp;·&nbsp; 28–31 OCTOBER 2026 &nbsp;·&nbsp; 100% CLIENT-SIDE &nbsp;·&nbsp; #FrameInGoa
          </p>
        </footer>

      </div>
    </main>
  );
}

/** Inline step label — "STEP 1 • UPLOAD PHOTO" in monospace wide tracking */
function SectionLabel({
  index,
  text,
  color,
}: {
  index: string;
  text: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 font-mono text-[11px] font-black hh-tracking">
      <span className={color}>{index}</span>
      <span className="text-emerald-700" aria-hidden>•</span>
      <span className={color}>{text}</span>
    </div>
  );
}

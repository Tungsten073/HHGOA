'use client';

import React, { useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { BuilderData, FormatType, FrameTheme, TransformState } from '@/types';
import { getRandomTitle } from '@/constants/titles';
import { Header, NavTab } from '@/components/Header';
import { ImageUploader } from '@/components/ImageUploader';
import { BuilderForm } from '@/components/BuilderForm';
import { AdjustmentControls } from '@/components/AdjustmentControls';
import { FrameCanvas } from '@/components/FrameCanvas';
import { DownloadShareActions } from '@/components/DownloadShareActions';
import { SocialEdition } from '@/components/social/SocialEdition';
import { Sparkles, Box, Image as ImageIcon, CheckCircle2, Terminal } from 'lucide-react';


const BuilderCard3D = dynamic(
  () => import('@/components/three/BuilderCard3D').then((mod) => mod.BuilderCard3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full rounded-none bg-[#F5F1E8] border-2 border-[#151B2B] shadow-brutal animate-pulse flex items-center justify-center text-xs font-mono text-[#151B2B]/60">
        LOADING 3D PASS PREVIEW…
      </div>
    ),
  }
);

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('event');
  const [format, setFormat] = useState<FormatType>('id-card');
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [theme, setTheme] = useState<FrameTheme>('editorial');
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d');
  const [canvasImageUrl, setCanvasImageUrl] = useState<string>('');

  const [builderData, setBuilderData] = useState<BuilderData>({
    name: 'ALEX.DEV',
    stack: 'AI / ML',
    title: getRandomTitle('AI / ML'),
  });

  const [transform, setTransform] = useState<TransformState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const generatorRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'builder-id' && generatorRef.current) {
      generatorRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'gallery' && socialRef.current) {
      socialRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <main className="min-h-screen bg-[#FDF9F0] text-[#151B2B] pb-16 relative overflow-hidden bg-technical-grid">
      {/* Background Topographic Overlay */}
      <div className="absolute inset-0 bg-topographic z-0 opacity-40 mix-blend-multiply pointer-events-none" />

      {/* ── Navigation & Dynamic Hero Header ── */}
      <Header
        format={format}
        onFormatChange={setFormat}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />


      <div className="max-w-6xl mx-auto px-4 z-10 relative">
        {/* Status Indicator Banner */}
        {userImage && (
          <div className="mb-6 bg-[#F5F1E8] border-2 border-[#151B2B] p-4 shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs uppercase tracking-widest">
            <div className="flex items-center gap-2 text-[#315746] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#9F452D]" />
              <span>YOUR BUILDER MARK IS READY</span>
              <span className="text-[#151B2B]/40">// INIT SUCCESS</span>
            </div>
            <div className="flex items-center gap-2 text-[#9F452D] font-bold text-[11px]">
              <Terminal className="w-3.5 h-3.5" />
              <span>REF: 15.4909° N, 73.8278° E</span>
            </div>
          </div>
        )}

        {/* ── Generator Workspace Section ── */}
        <div ref={generatorRef} id="generator" className="scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 items-start">
            {/* LEFT — Controls */}
            <div className="flex flex-col gap-6">
              {/* Step 1: Upload */}
              <div className="space-y-2">
                <SectionLabel index="01" text="UPLOAD PHOTO" color="bg-[#151B2B] text-[#F5F1E8]" />
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
                <SectionLabel index="02" text="CUSTOMIZE DETAILS" color="bg-[#9F452D] text-[#F5F1E8]" />
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
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              {/* Canvas label row + 2D/3D View Switcher */}
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#151B2B] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9F452D]" />
                  <span>
                    CANVAS OUTPUT ({format === 'frame' ? '1080×1080' : '1080×1350 4:5'})
                  </span>
                </span>

                {/* View Switcher */}
                <div className="flex items-center p-0.5 bg-[#F5F1E8] border-2 border-[#151B2B] shadow-brutal">
                  <button
                    type="button"
                    onClick={() => setViewMode('2d')}
                    className={`flex items-center gap-1 px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                      viewMode === '2d'
                        ? 'bg-[#151B2B] text-[#F5F1E8]'
                        : 'text-[#151B2B] hover:bg-[#151B2B]/10'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>2D</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('3d')}
                    className={`flex items-center gap-1 px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all ${
                      viewMode === '3d'
                        ? 'bg-[#9F452D] text-[#F5F1E8]'
                        : 'text-[#151B2B] hover:bg-[#151B2B]/10'
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
                <div className="w-full relative bg-[#151B2B] p-3 flex flex-col items-center justify-center border-2 border-[#151B2B] shadow-brutal-lg">
                  <div className="w-full text-center text-[10px] font-mono tracking-widest text-[#D8A928] font-bold mb-1 uppercase">
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
                <AdjustmentControls
                  transform={transform}
                  onChange={handleTransformChange}
                  onReset={handleResetTransform}
                />
              )}

              {/* Download / Share */}
              <DownloadShareActions
                canvasRef={canvasRef}
                format={format}
                builderData={builderData}
              />
            </div>
          </div>
        </div>

        {/* ── SOCIAL EDITION / 05 — THE BUILDERS OF GOA ── */}
        <div ref={socialRef} id="social-edition" className="scroll-mt-24">
          <SocialEdition
            onNavigateToGenerator={() => handleTabChange('builder-id')}
          />
        </div>

        {/* ── Footer ── */}
        <footer className="pt-8 border-t-2 border-[#151B2B] flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-[#151B2B]">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="font-bold tracking-wider uppercase">
              © 2026 GOA HACKER HOUSE. POWERED BY 247.
            </span>
            <span className="text-[#9F452D] font-bold">#FrameInGoa</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold tracking-widest text-[#151B2B]/70 uppercase">
            <button type="button" onClick={() => handleTabChange('event')} className="hover:text-[#9F452D] transition-colors uppercase cursor-pointer">
              MANIFESTO
            </button>
            <a
              href="https://github.com/Tungsten073/HHGOA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9F452D] transition-colors"
            >
              REPOSITORY
            </a>
            <button type="button" onClick={() => handleTabChange('builder-id')} className="hover:text-[#9F452D] transition-colors uppercase cursor-pointer">
              SUPPORT
            </button>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#9F452D] transition-colors">
              X.COM
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}

/** Step section label badge — "01 • UPLOAD PHOTO" in monospace wide tracking */
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
    <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase">
      <span className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-[10px] shrink-0 border-2 border-[#151B2B]`}>
        {index}
      </span>
      <span className="text-[#151B2B] font-extrabold">{text}</span>
    </div>
  );
}

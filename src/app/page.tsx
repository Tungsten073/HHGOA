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
import { TropicalBackground } from '@/components/background/TropicalBackground';
import { Sparkles, Box, Image as ImageIcon, ArrowRight, Download, Share2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const HHGoaHero3D = dynamic(
  () => import('@/components/three/HHGoaHero3D').then((mod) => mod.HHGoaHero3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] sm:h-[420px] w-full max-w-sm mx-auto my-2 rounded-none bg-[#F5F1E8]/60 border-2 border-[#151B2B] shadow-brutal animate-pulse flex items-center justify-center text-xs font-mono text-[#151B2B]/60">
        LOADING 3D ARTIFACT…
      </div>
    ),
  }
);

const BuilderCard3D = dynamic(
  () => import('@/components/three/BuilderCard3D').then((mod) => mod.BuilderCard3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] sm:h-[420px] w-full rounded-none bg-[#F5F1E8]/60 border-2 border-[#151B2B] shadow-brutal animate-pulse flex items-center justify-center text-xs font-mono text-[#151B2B]/60">
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
    name: 'Aaditya Dolas',
    stack: 'Infra / Security',
    title: getRandomTitle('Infra / Security'),
  });

  const [transform, setTransform] = useState<TransformState>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const generatorRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'event' && heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'build' && generatorRef.current) {
      generatorRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'social' && socialRef.current) {
      socialRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'about' && footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
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
    <main className="min-h-screen bg-[#FDF9F0] text-[#151B2B] pb-16 relative overflow-hidden bg-technical-grid font-syne">
      {/* Dynamic Animated Tropical Environment Background (Sunrise -> Day -> Golden Hour -> Sunset) */}
      <TropicalBackground />

      {/* Background Topographic Overlay */}
      <div className="absolute inset-0 bg-topographic z-0 opacity-40 mix-blend-multiply pointer-events-none" />

      {/* ── Fixed Navigation Bar ── */}
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      {/* ── SECTION 1: HERO — GOA SUNRISE (Top of Page) ── */}
      <section ref={heroRef} id="hero-sunrise" className="w-full pt-28 pb-16 px-6 md:px-16 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[540px]">
          {/* Left Column: Hero Title & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs tracking-widest text-[#151B2B]/70 uppercase">
              <span>GOA, INDIA</span>
              <span className="text-[#9F452D] font-bold">15.4909° N, 73.8278° E</span>
              <span className="text-[#151B2B]/40">BATCH 247</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-[#151B2B] leading-[0.9] tracking-tight">
              HACKER HOUSE<br />
              <span className="text-[#9F452D]">GOA 2026</span>
            </h1>

            <p className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#151B2B]/80 uppercase border-b-2 border-[#151B2B] pb-2">
              THE ROAD TO 247
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleTabChange('build')}
                className="inline-flex items-center gap-2 bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] px-6 py-3.5 hover:bg-[#9F452D] hover:border-[#9F452D] transition-colors font-mono font-bold shadow-brutal active:scale-95 text-xs tracking-widest uppercase cursor-pointer"
              >
                <span>CREATE YOUR BUILDER MARK</span>
                <ArrowRight className="w-4 h-4 text-[#D8A928]" />
              </button>
            </div>

            {/* Stamp Seal Metadata */}
            <div className="pt-4 flex items-center gap-4 font-mono text-[11px] text-[#151B2B]/60 tracking-widest uppercase">
              <div className="border border-[#151B2B] px-3 py-1.5 rounded-full bg-[#F5F1E8]">
                INDIA · 28—31 OCTOBER 2026
              </div>
            </div>
          </div>

          {/* Right Column: Floating 3D Hero Builder Mark Pass */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md relative">
              <HHGoaHero3D />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: GENERATOR WORKSPACE — BRIGHT GOA DAYLIGHT (Middle) ── */}
      <section ref={generatorRef} id="generator" className="w-full py-16 px-4 sm:px-6 relative z-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 border-b-2 border-[#151B2B] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#151B2B] tracking-tight">
                BUILD YOUR MARK.
              </h2>
              <p className="font-mono text-xs font-bold text-[#9F452D] tracking-widest uppercase mt-1">
                01 PHOTO → 02 STACK → 03 TITLE → 04 ARTIFACT
              </p>
            </div>
            {/* Format Selector Pills */}
            <div className="flex items-center gap-2 p-1 bg-[#F5F1E8] border-2 border-[#151B2B] shadow-brutal font-mono text-xs font-bold uppercase">
              <button
                type="button"
                onClick={() => setFormat('frame')}
                className={`px-3 py-1.5 transition-colors ${
                  format === 'frame'
                    ? 'bg-[#151B2B] text-[#F5F1E8]'
                    : 'text-[#151B2B] hover:bg-[#151B2B]/10'
                }`}
              >
                PFP FRAME (1080×1080)
              </button>
              <button
                type="button"
                onClick={() => setFormat('id-card')}
                className={`px-3 py-1.5 transition-colors ${
                  format === 'id-card'
                    ? 'bg-[#9F452D] text-[#F5F1E8]'
                    : 'text-[#151B2B] hover:bg-[#151B2B]/10'
                }`}
              >
                BUILDER ID (1080×1350)
              </button>
            </div>
          </div>

          {/* Two-Column Bento Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8 items-start">
            {/* LEFT — Controls & Forms */}
            <div className="flex flex-col gap-6">
              {/* Step 1: Upload */}
              <div className="space-y-2">
                <SectionLabel index="01" text="PHOTO" color="bg-[#151B2B] text-[#F5F1E8]" />
                <ImageUploader
                  onImageLoaded={(img) => {
                    setUserImage(img);
                    handleResetTransform();
                  }}
                  currentImageLoaded={!!userImage}
                />
              </div>

              {/* Step 2 & 3: Customize Details */}
              <div className="space-y-2">
                <SectionLabel index="02" text="STACK & TITLE" color="bg-[#9F452D] text-[#F5F1E8]" />
                <BuilderForm
                  format={format}
                  builderData={builderData}
                  theme={theme}
                  onDataChange={handleDataChange}
                  onThemeChange={setTheme}
                />
              </div>
            </div>

            {/* RIGHT — Live Canvas Output & 3D Preview */}
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              <div className="flex items-center justify-between px-1 font-mono text-xs font-bold uppercase tracking-widest text-[#151B2B]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9F452D]" />
                  <span>OUTPUT ({format === 'frame' ? '1080×1080' : '1080×1350'})</span>
                </span>

                {/* 2D / 3D Mode Toggle */}
                <div className="flex items-center p-0.5 bg-[#F5F1E8] border-2 border-[#151B2B] shadow-brutal">
                  <button
                    type="button"
                    onClick={() => setViewMode('2d')}
                    className={`flex items-center gap-1 px-3 py-1 text-[10px] transition-all ${
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
                    className={`flex items-center gap-1 px-3 py-1 text-[10px] transition-all ${
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

              {/* 2D Canvas */}
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

              {/* Hidden 2D Canvas during 3D mode so canvasRef stays populated */}
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

              {/* Zoom Controls */}
              {userImage && (
                <AdjustmentControls
                  transform={transform}
                  onChange={handleTransformChange}
                  onReset={handleResetTransform}
                />
              )}

              {/* Download & Share Actions */}
              <DownloadShareActions
                canvasRef={canvasRef}
                format={format}
                builderData={builderData}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: RESULT STATE — GOLDEN HOUR (Middle Bottom) ── */}
      <section ref={resultRef} id="result-state" className="w-full py-16 px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#F5F1E8] border-2 border-[#151B2B] p-8 sm:p-12 shadow-brutal-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Result Context */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="font-mono text-xs font-bold text-[#9F452D] tracking-widest uppercase">
                04 / ARTIFACT
              </div>
              <h3 className="text-3xl sm:text-5xl font-black uppercase text-[#151B2B] tracking-tight">
                YOUR BUILDER MARK IS READY.
              </h3>
              <p className="font-mono text-xs font-bold text-[#151B2B]/75 uppercase tracking-widest">
                BUILT IN GOA / BATCH 247 &nbsp;·&nbsp; #FrameInGoa
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (canvasRef.current) {
                      try { confetti({ particleCount: 80, spread: 70 }); } catch {}
                      const link = document.createElement('a');
                      link.download = 'HH_Goa_Builder_Mark.png';
                      link.href = canvasRef.current.toDataURL('image/png');
                      link.click();
                    }
                  }}
                  className="bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#9F452D] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>[ DOWNLOAD MARK ]</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent('I just generated my Builder Mark for Hacker House Goa 2026! 🚀🌴 #FrameInGoa');
                    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                  }}
                  className="bg-[#9F452D] text-[#F5F1E8] border-2 border-[#151B2B] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#151B2B] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>[ SHARE TO X ]</span>
                </button>
                <button
                  type="button"
                  onClick={handleResetTransform}
                  className="bg-[#FDF9F0] text-[#151B2B] border-2 border-[#151B2B] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider shadow-brutal hover:bg-[#151B2B] hover:text-[#F5F1E8] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>[ RESET ]</span>
                </button>
              </div>
            </div>

            {/* Right Pedestal 3D Pass Preview */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full relative bg-[#151B2B] p-4 border-2 border-[#151B2B] shadow-brutal">
                <div className="text-center font-mono text-[10px] text-[#D8A928] font-bold tracking-widest uppercase mb-2">
                  / ARTIFACT / 04 · BATCH 247 · GOA, INDIA
                </div>
                <BuilderCard3D imageUrl={canvasImageUrl} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: SOCIAL EDITION — SUNSET AT GOA BEACH (Lower) ── */}
      <div ref={socialRef} id="social-edition" className="scroll-mt-24 relative z-10">
        <SocialEdition
          onNavigateToGenerator={() => handleTabChange('build')}
        />
      </div>

      {/* ── SECTION 5: FOOTER — EVENING / DUSK BEACH (Bottom) ── */}
      <footer ref={footerRef} id="about-footer" className="w-full pt-16 pb-8 px-6 md:px-16 border-t-2 border-[#151B2B] bg-[#0A111E] text-[#F5F1E8] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-xs">
          {/* Left Footer Branding */}
          <div className="flex flex-col space-y-2 text-center md:text-left">
            <div className="font-syne text-2xl font-black uppercase text-[#F5F1E8]">
              HACKER HOUSE GOA 2026
            </div>
            <div className="text-[#9F452D] font-bold tracking-widest uppercase">
              THE ROAD TO 247 &nbsp;·&nbsp; #FrameInGoa
            </div>
          </div>

          {/* Center Coordinates & Event Dates Stamp */}
          <div className="text-center text-[11px] font-bold text-[#F5F1E8]/70 tracking-widest uppercase border-t md:border-t-0 border-[#F5F1E8]/20 pt-4 md:pt-0">
            GOA, INDIA &nbsp;|&nbsp; 15.4909° N, 73.8278° E &nbsp;|&nbsp; 28 — 31 OCTOBER 2026 &nbsp;|&nbsp; HHG.26 BATCH 247
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-6 font-bold tracking-widest text-[#F5F1E8]/80 uppercase">
            <button type="button" onClick={() => handleTabChange('event')} className="hover:text-[#9F452D] transition-colors cursor-pointer">
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
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#9F452D] transition-colors">
              X.COM
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

/** Step section label badge — "01 • PHOTO" in monospace wide tracking */
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

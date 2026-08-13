'use client';

import React, { useState, useRef } from 'react';
import { BuilderMarkCard } from './BuilderMarkCard';
import { GalleryArtifactModal, IconCardData } from './GalleryArtifactModal';
import { ChevronLeft, ChevronRight, Award, ShieldAlert } from 'lucide-react';

export const EDITORIAL_ICON_CARDS: IconCardData[] = [
  {
    id: '01',
    name: 'Narendra Modi',
    category: 'EDITORIAL FEATURE',
    theme: 'LEADERSHIP & INFRASTRUCTURE',
    subtitle: 'Digital India · Scale Vision',
    description: 'Editorial concept card celebrating scale, digital infrastructure, and national vision on the Road to 247. (Concept feature only).',
    disclaimer: 'EDITORIAL FEATURE — CONCEPT BUILDER ONLY / NOT AN EVENT PARTICIPANT',
    accent: '#D8A928',
    avatarBg: '#0B1020',
    iconSymbol: '🏛️',
    goaElement: 'Golden Morning Shore & Palm Horizon',
    bgGradient: 'from-[#0B1020] via-[#1F3A2E] to-[#9F452D]',
  },
  {
    id: '02',
    name: 'Elon Musk',
    category: 'ICON SERIES',
    theme: 'SYSTEMS & SPACE',
    subtitle: 'First Principles · High Frequency',
    description: 'Editorial concept card celebrating first-principles engineering, interplanetary ambition, and high-frequency execution. (Concept feature only).',
    disclaimer: 'EDITORIAL FEATURE — CONCEPT BUILDER ONLY / NOT AN EVENT PARTICIPANT',
    accent: '#9F452D',
    avatarBg: '#151B2B',
    iconSymbol: '🚀',
    goaElement: 'Dusk Horizon & Rocket Specular Flare',
    bgGradient: 'from-[#151B2B] via-[#0F2238] to-[#9F452D]',
  },
  {
    id: '03',
    name: 'Charlie Chaplin',
    category: 'CULTURAL ICON',
    theme: 'CINEMA & CREATIVITY',
    subtitle: 'Timeless Storytelling · Comic Genius',
    description: 'Vintage monochrome-inspired editorial concept card celebrating timeless storytelling, comedy, and creative genius. (Concept feature only).',
    disclaimer: 'EDITORIAL FEATURE — CONCEPT BUILDER ONLY / NOT AN EVENT PARTICIPANT',
    accent: '#F5F1E8',
    avatarBg: '#1A1D24',
    iconSymbol: '🎩',
    goaElement: 'Monochrome Coastal Palm Shadow & Sepia Wave',
    bgGradient: 'from-[#1A1D24] via-[#2A2E39] to-[#D8A928]',
  },
  {
    id: '04',
    name: 'Lucy the Racer',
    category: 'ROAD & SPEED',
    theme: 'PERFORMANCE & MOTORSPORT',
    subtitle: 'Apex Speed · High-Octane',
    description: 'Motorsport-inspired editorial concept card celebrating precision, apex speed, and high-octane performance. (Concept feature only).',
    disclaimer: 'EDITORIAL FEATURE — CONCEPT BUILDER ONLY / NOT AN EVENT PARTICIPANT',
    accent: '#CCFF00',
    avatarBg: '#06261C',
    iconSymbol: '🏎️',
    goaElement: 'Coastal Highway Curve & Sunset Speedlines',
    bgGradient: 'from-[#06261C] via-[#1B4D3E] to-[#CCFF00]',
  },
  {
    id: '05',
    name: 'Hulk',
    category: 'FICTIONAL ICON',
    theme: 'POWER & STRENGTH',
    subtitle: 'Gamma Compute · Unbreakable Force',
    description: 'Stylized comic-inspired editorial concept card celebrating raw force, gamma computing power, and unbreakable strength. (Concept feature only).',
    disclaimer: 'EDITORIAL FEATURE — CONCEPT BUILDER ONLY / NOT AN EVENT PARTICIPANT',
    accent: '#00FF66',
    avatarBg: '#2D124D',
    iconSymbol: '⚡',
    goaElement: 'Tropical Night Storm & Gamma Glow Wave',
    bgGradient: 'from-[#2D124D] via-[#1B0B33] to-[#00FF66]',
  },
];

export const SocialGallery: React.FC = () => {
  const [selectedBuilder, setSelectedBuilder] = useState<IconCardData | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Editorial Disclaimer Top Notice ── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#F5F1E8] border-2 border-[#151B2B] shadow-brutal font-mono text-xs text-[#151B2B]">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#9F452D]" />
          <span className="font-extrabold uppercase tracking-widest text-[#151B2B]">
            EDITORIAL ICON WALL // ROAD TO 247 ARCHIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#9F452D] uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>EDITORIAL CONCEPT CARDS ONLY · NOT EVENT PARTICIPANTS</span>
        </div>
      </div>

      {/* ── Interactive Horizontal Carousel Controls & Track ── */}
      <div className="relative w-full">
        {/* Navigation Arrow Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs font-bold text-[#151B2B] uppercase tracking-widest">
            COLLECTIBLE ICON SERIES (01 / 05)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] shadow-brutal hover:bg-[#9F452D] transition-colors cursor-pointer"
              aria-label="Scroll gallery left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-[#151B2B] text-[#F5F1E8] border-2 border-[#151B2B] shadow-brutal hover:bg-[#9F452D] transition-colors cursor-pointer"
              aria-label="Scroll gallery right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Track with Snap-to-Card behavior */}
        <div
          ref={carouselRef}
          className="flex items-center gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#151B2B] scrollbar-track-[#F5F1E8]"
        >
          {EDITORIAL_ICON_CARDS.map((card, idx) => (
            <div key={card.id} className="snap-center shrink-0">
              <BuilderMarkCard
                builder={card}
                isFeatured={idx === 1} // Center Elon Musk card featured
                onClick={() => setSelectedBuilder(card)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Artifact Modal */}
      <GalleryArtifactModal
        builder={selectedBuilder}
        onClose={() => setSelectedBuilder(null)}
      />
    </>
  );
};

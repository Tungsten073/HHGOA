'use client';

import React, { useState, useRef } from 'react';
import { BuilderMarkCard } from './BuilderMarkCard';
import { GalleryArtifactModal, IconCardData } from './GalleryArtifactModal';
import { ChevronLeft, ChevronRight, Award, ShieldAlert } from 'lucide-react';

export const UPLOADED_ICON_CARDS: IconCardData[] = [
  {
    id: '01',
    name: 'Adolf H.',
    category: 'HISTORICAL ARCHIVE',
    subtitle: 'Archive // 01 · Historical Record',
    description: 'Restrained historical archival record for documentation and visual culture analysis. (Concept archive feature only).',
    disclaimer: 'HISTORICAL ARCHIVE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/AH.jpeg',
    accent: '#D8A928',
    themeBg: 'from-[#111827] via-[#1F2937] to-[#0C3027]',
  },
  {
    id: '02',
    name: 'Dharmendra Pradhan',
    category: 'PUBLIC LIFE / LEADERSHIP',
    subtitle: 'Archive // 02 · Public Policy',
    description: 'Editorial public life archive card celebrating governance and educational infrastructure vision. (Concept feature only).',
    disclaimer: 'PUBLIC LIFE FEATURE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/DP.jpeg',
    accent: '#A9482E',
    themeBg: 'from-[#111827] via-[#2D1B18] to-[#A9482E]',
  },
  {
    id: '03',
    name: 'Hulk',
    category: 'FICTIONAL ICON',
    subtitle: 'Archive // 03 · Gamma Compute',
    description: 'Stylized comic-inspired fictional icon card celebrating raw force, gamma computing power, and unbreakable strength. (Fictional character).',
    disclaimer: 'FICTIONAL CHARACTER — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/HULK.jpeg',
    accent: '#00FF66',
    themeBg: 'from-[#0C3027] via-[#1B0B33] to-[#00FF66]',
  },
  {
    id: '04',
    name: 'Lucy the Racer',
    category: 'RACING / PERFORMANCE',
    subtitle: 'Archive // 04 · High-Octane Speed',
    description: 'Motorsport-inspired editorial concept card celebrating precision, apex speed, and high-octane performance. (Concept feature only).',
    disclaimer: 'EDITORIAL FEATURE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/LTR.jpg',
    objectPosition: 'center 20%',
    accent: '#E2B93B',
    themeBg: 'from-[#0C3027] via-[#1C3D32] to-[#E2B93B]',
  },
  {
    id: '05',
    name: 'Ravi Kishan',
    category: 'CINEMA / CULTURE',
    subtitle: 'Archive // 05 · Performing Arts & Cinema',
    description: 'Cinematic cultural archive card celebrating Indian cinema, performance craft, and regional storytelling. (Concept feature only).',
    disclaimer: 'CULTURE ARCHIVE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/RK.jpeg',
    objectPosition: 'center 15%',
    accent: '#A9482E',
    themeBg: 'from-[#111827] via-[#2A1D28] to-[#A9482E]',
  },
  {
    id: '06',
    name: 'Charlie Chaplin',
    category: 'CINEMA / CULTURE',
    subtitle: 'Archive // 06 · Silent Era Visionary',
    description: 'Vintage monochrome-inspired cultural card celebrating comedy, creative genius, and timeless performance. (Concept feature only).',
    disclaimer: 'CULTURE ARCHIVE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/CC.jpg',
    accent: '#F5F0E6',
    themeBg: 'from-[#1F2430] via-[#2A2E39] to-[#E2B93B]',
  },
];

export const SocialGallery: React.FC = () => {
  const [selectedBuilder, setSelectedBuilder] = useState<IconCardData | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ── Editorial Archive Header Notice ── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#F5F0E6] border-2 border-[#111827] shadow-brutal font-mono text-xs text-[#111827]">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#A9482E]" />
          <span className="font-extrabold uppercase tracking-widest text-[#111827]">
            EDITORIAL ARCHIVE // ROAD TO 247 ICONS
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#A9482E] uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>EDITORIAL ARCHIVE ONLY · NOT EVENT PARTICIPANTS</span>
        </div>
      </div>

      {/* ── Full-Screen Edge-to-Edge Horizontal Carousel Track & Controls ── */}
      <div className="relative w-screen left-1/2 -translate-x-1/2 px-4 sm:px-8 lg:px-12">
        {/* Navigation Arrow Controls & Track Indicator */}
        <div className="max-w-7xl mx-auto flex items-center justify-between mb-4 px-2">
          <div className="font-mono text-xs font-bold text-[#F5F0E6] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E2B93B] animate-pulse" />
            <span>COLLECTIBLE ARCHIVE (01 / 06) · EDGE-TO-EDGE GALLERY</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2.5 bg-[#111827] text-[#F5F0E6] border-2 border-[#F5F0E6]/30 shadow-brutal hover:bg-[#A9482E] transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2.5 bg-[#111827] text-[#F5F0E6] border-2 border-[#F5F0E6]/30 shadow-brutal hover:bg-[#A9482E] transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Track - Spans from one end of screen to another end */}
        <div
          ref={carouselRef}
          className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-8 pt-4 px-4 sm:px-8 lg:px-16 snap-x snap-mandatory scrollbar-none w-full scroll-smooth"
        >
          {UPLOADED_ICON_CARDS.map((card, idx) => (
            <div key={card.id} className="snap-center shrink-0">
              <BuilderMarkCard
                builder={card}
                isFeatured={idx === 2} // Center card featured elevation
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

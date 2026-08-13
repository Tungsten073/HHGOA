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
    name: 'Charlie Chaplin',
    category: 'CINEMA / CULTURE',
    subtitle: 'Archive // 02 · Silent Era Visionary',
    description: 'Vintage monochrome-inspired cultural card celebrating comedy, creative genius, and timeless performance. (Concept feature only).',
    disclaimer: 'CULTURE ARCHIVE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/CC.jpg',
    accent: '#F5F0E6',
    themeBg: 'from-[#1F2430] via-[#2A2E39] to-[#E2B93B]',
  },
  {
    id: '03',
    name: 'Dharmendra Pradhan',
    category: 'PUBLIC LIFE / LEADERSHIP',
    subtitle: 'Archive // 03 · Public Policy',
    description: 'Editorial public life archive card celebrating governance and educational infrastructure vision. (Concept feature only).',
    disclaimer: 'PUBLIC LIFE FEATURE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/DP.jpeg',
    accent: '#A9482E',
    themeBg: 'from-[#111827] via-[#2D1B18] to-[#A9482E]',
  },
  {
    id: '04',
    name: 'Hulk',
    category: 'FICTIONAL ICON',
    subtitle: 'Archive // 04 · Gamma Compute',
    description: 'Stylized comic-inspired fictional icon card celebrating raw force, gamma computing power, and unbreakable strength. (Fictional character).',
    disclaimer: 'FICTIONAL CHARACTER — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/HULK.jpeg',
    accent: '#00FF66',
    themeBg: 'from-[#0C3027] via-[#1B0B33] to-[#00FF66]',
  },
  {
    id: '05',
    name: 'Lucy the Racer',
    category: 'RACING / PERFORMANCE',
    subtitle: 'Archive // 05 · High-Octane Speed',
    description: 'Motorsport-inspired editorial concept card celebrating precision, apex speed, and high-octane performance. (Concept feature only).',
    disclaimer: 'EDITORIAL FEATURE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/LTR.jpg',
    accent: '#E2B93B',
    themeBg: 'from-[#0C3027] via-[#1C3D32] to-[#E2B93B]',
  },
  {
    id: '06',
    name: 'Ranbir Kapoor',
    category: 'CINEMA / CULTURE',
    subtitle: 'Archive // 06 · Performing Arts',
    description: 'Cinematic cultural card celebrating Indian cinema, performance craft, and creative storytelling. (Concept feature only).',
    disclaimer: 'CULTURE ARCHIVE — CONCEPT ONLY / NOT AN EVENT PARTICIPANT',
    imagePath: '/icons/RK.jpeg',
    accent: '#A9482E',
    themeBg: 'from-[#111827] via-[#2A1D28] to-[#A9482E]',
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

      {/* ── Horizontal Snap Carousel Track & Controls ── */}
      <div className="relative w-full">
        {/* Navigation Arrow Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs font-bold text-[#111827] uppercase tracking-widest">
            COLLECTIBLE ARCHIVE (01 / 06)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="p-2 bg-[#111827] text-[#F5F0E6] border-2 border-[#111827] shadow-brutal hover:bg-[#A9482E] transition-colors cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-[#111827] text-[#F5F0E6] border-2 border-[#111827] shadow-brutal hover:bg-[#A9482E] transition-colors cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Track with Snap-to-Card behavior */}
        <div
          ref={carouselRef}
          className="flex items-center gap-6 overflow-x-auto pb-6 pt-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-[#111827] scrollbar-track-[#F5F0E6]"
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

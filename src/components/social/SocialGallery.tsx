'use client';

import React, { useState } from 'react';
import { BuilderMarkCard } from './BuilderMarkCard';
import { GalleryArtifactModal, DemoBuilder } from './GalleryArtifactModal';

export const DEMO_BUILDERS: DemoBuilder[] = [
  {
    id: '01',
    name: 'Ari Mehta',
    title: 'AI Agent Architect',
    stack: 'AI / ML',
    track: 'AI & INTELLIGENCE',
    format: 'id-card',
    theme: 'editorial',
    aspect: 'tall',
    avatarBg: '#0F382C',
    accent: '#9F452D',
  },
  {
    id: '02',
    name: 'Nia Rao',
    title: 'Solana Speedrunner',
    stack: 'Solana / Web3',
    track: 'SOLANA PROTOCOLS',
    format: 'frame',
    theme: 'sunset',
    aspect: 'square',
    avatarBg: '#F86624',
    accent: '#D8A928',
  },
  {
    id: '03',
    name: 'Kian Shah',
    title: 'Systems Alchemist',
    stack: 'Rust / Systems',
    track: 'SYSTEMS & KERNEL',
    format: 'id-card',
    theme: 'volt',
    aspect: 'portrait',
    avatarBg: '#181A20',
    accent: '#CCFF00',
  },
  {
    id: '04',
    name: 'Maya Fernandes',
    title: 'Interface Shaper',
    stack: 'Design / Product',
    track: 'PRODUCT DESIGN',
    format: 'frame',
    theme: 'ocean',
    aspect: 'square',
    avatarBg: '#006680',
    accent: '#00A8CC',
  },
  {
    id: '05',
    name: 'Dev Kapoor',
    title: 'Cloud Tactician',
    stack: 'Infra / Security',
    track: 'INFRASTRUCTURE',
    format: 'id-card',
    theme: 'editorial',
    aspect: 'tall',
    avatarBg: '#315746',
    accent: '#D8A928',
  },
  {
    id: '06',
    name: 'Rhea Nair',
    title: 'Full-Stack Alchemist',
    stack: 'Full-Stack',
    track: 'DECENTRALIZED APPS',
    format: 'id-card',
    theme: 'sunset',
    aspect: 'portrait',
    avatarBg: '#9F452D',
    accent: '#F5F1E8',
  },
];

export const SocialGallery: React.FC = () => {
  const [selectedBuilder, setSelectedBuilder] = useState<DemoBuilder | null>(null);

  return (
    <>
      {/* Asymmetric Controlled Masonry Composition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {DEMO_BUILDERS.map((builder, idx) => (
          <div
            key={builder.id}
            className={`${
              idx === 0
                ? 'lg:col-span-2 lg:row-span-2'
                : idx === 3
                ? 'sm:col-span-2 lg:col-span-1'
                : ''
            }`}
          >
            <BuilderMarkCard
              builder={builder}
              onClick={() => setSelectedBuilder(builder)}
            />
          </div>
        ))}
      </div>

      {/* Artifact Modal */}
      <GalleryArtifactModal
        builder={selectedBuilder}
        onClose={() => setSelectedBuilder(null)}
      />
    </>
  );
};

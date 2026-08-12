'use client';

import React from 'react';
import { TechStack } from '@/types';
import { getRandomTitle } from '@/constants/titles';
import { Dices, Sparkles } from 'lucide-react';

interface Props {
  stack: TechStack;
  onGenerate: (newTitle: string) => void;
}

export const TitleGeneratorButton: React.FC<Props> = ({ stack, onGenerate }) => {
  const handleClick = () => {
    const title = getRandomTitle(stack);
    onGenerate(title);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#9F452D] text-[#F5F1E8] border-2 border-[#151B2B] text-[10px] font-mono font-bold uppercase tracking-wider transition-colors hover:bg-[#151B2B] cursor-pointer shadow-brutal active:scale-95"
      title="Generate random builder title"
    >
      <Dices className="w-3.5 h-3.5" />
      <span>RANDOM TITLE</span>
      <Sparkles className="w-3 h-3 text-[#D8A928]" />
    </button>
  );
};

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
      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
      title="Generate random builder title"
    >
      <Dices className="w-3.5 h-3.5 text-amber-400" />
      <span>Auto-Generate</span>
      <Sparkles className="w-3 h-3 text-rose-400" />
    </button>
  );
};

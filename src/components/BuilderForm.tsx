'use client';

import React from 'react';
import { BuilderData, FrameTheme, TechStack, FormatType } from '@/types';
import { STACK_OPTIONS } from '@/constants/titles';
import { THEME_CONFIGS } from '@/constants/templates';
import { TitleGeneratorButton } from './TitleGenerator';
import { User, Code, Sparkles, Palette } from 'lucide-react';

interface Props {
  format: FormatType;
  builderData: BuilderData;
  theme: FrameTheme;
  onDataChange: (newData: Partial<BuilderData>) => void;
  onThemeChange: (theme: FrameTheme) => void;
}

export const BuilderForm: React.FC<Props> = ({
  format,
  builderData,
  theme,
  onDataChange,
  onThemeChange,
}) => {
  return (
    <div className="w-full space-y-5 bg-[#F5F1E8] p-6 border-2 border-[#151B2B] shadow-brutal">

      {/* Theme Color Palette — always visible */}
      <div>
        <label className="text-xs font-mono font-bold tracking-widest uppercase text-[#151B2B] flex items-center gap-1.5 mb-2.5">
          <Palette className="w-3.5 h-3.5 text-[#9F452D]" />
          <span>VISUAL THEME</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(THEME_CONFIGS) as FrameTheme[]).map((themeKey) => {
            const cfg = THEME_CONFIGS[themeKey];
            const isSelected = theme === themeKey;
            return (
              <button
                key={themeKey}
                type="button"
                onClick={() => onThemeChange(themeKey)}
                aria-pressed={isSelected}
                className={`flex items-center justify-center gap-2 p-2.5 border-2 text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#151B2B] bg-[#151B2B] text-[#F5F1E8] shadow-brutal'
                    : 'border-[#151B2B] bg-[#FDF9F0] text-[#151B2B] hover:bg-[#151B2B]/10'
                }`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border border-current shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.primaryColor}, ${cfg.secondaryColor})`,
                  }}
                />
                <span>{cfg.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Builder ID mode — Name, Stack/Role, Builder Title */}
      {format === 'id-card' && (
        <>
          {/* Name & Stack Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="text-xs font-mono font-bold tracking-widest uppercase text-[#151B2B] flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-[#9F452D]" />
                <span>NAME <span className="text-[#9F452D]">*</span></span>
              </label>
              <input
                type="text"
                value={builderData.name}
                onChange={(e) => onDataChange({ name: e.target.value })}
                placeholder="Enter builder handle…"
                maxLength={28}
                className="w-full terminal-input text-sm font-mono font-bold text-[#151B2B] placeholder-[#151B2B]/30 py-2"
              />
            </div>

            {/* Stack / Role */}
            <div>
              <label className="text-xs font-mono font-bold tracking-widest uppercase text-[#151B2B] flex items-center gap-1.5 mb-1.5">
                <Code className="w-3.5 h-3.5 text-[#315746]" />
                <span>STACK / ROLE <span className="text-[#9F452D]">*</span></span>
              </label>
              <select
                value={builderData.stack}
                onChange={(e) => onDataChange({ stack: e.target.value as TechStack })}
                className="w-full bg-[#FDF9F0] border-2 border-[#151B2B] p-2 text-xs font-mono font-bold uppercase text-[#151B2B] focus:outline-none focus:border-[#9F452D]"
              >
                {STACK_OPTIONS.map((stk) => (
                  <option key={stk} value={stk} className="bg-[#F5F1E8] text-[#151B2B]">
                    {stk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Builder Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono font-bold tracking-widest uppercase text-[#151B2B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#D8A928]" />
                <span>
                  BUILDER TITLE{' '}
                  <span className="text-[#151B2B]/50 font-normal normal-case">
                    (optional)
                  </span>
                </span>
              </label>
              <TitleGeneratorButton
                stack={builderData.stack}
                onGenerate={(title) => onDataChange({ title })}
              />
            </div>
            <input
              type="text"
              value={builderData.title}
              onChange={(e) => onDataChange({ title: e.target.value })}
              placeholder="e.g. SYSTEMS ARCHITECT"
              maxLength={26}
              className="w-full terminal-input text-sm font-mono font-bold text-[#9F452D] placeholder-[#151B2B]/30 py-2 uppercase"
            />
          </div>
        </>
      )}
    </div>
  );
};

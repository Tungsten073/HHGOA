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
    <div className="w-full space-y-4 bg-emerald-950/60 backdrop-blur-md p-5 rounded-2xl border border-emerald-800/80 shadow-xl">

      {/* Theme Color Palette — always visible (PFP ring changes per theme) */}
      <div>
        <label className="text-[11px] font-bold hh-tracking uppercase text-emerald-200 flex items-center gap-1.5 mb-2">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span>Visual Theme</span>
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(THEME_CONFIGS) as FrameTheme[]).map((themeKey) => {
            const cfg = THEME_CONFIGS[themeKey];
            const isSelected = theme === themeKey;
            return (
              <button
                key={themeKey}
                type="button"
                onClick={() => onThemeChange(themeKey)}
                aria-pressed={isSelected}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/15 text-white shadow-sm shadow-amber-400/20'
                    : 'border-emerald-900 bg-emerald-950/40 text-emerald-300/70 hover:border-emerald-700 hover:text-emerald-100'
                }`}
              >
                <div
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
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
          {/* Name + Stack row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="text-[11px] font-bold hh-tracking uppercase text-emerald-200 flex items-center gap-1.5 mb-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Name <span className="text-rose-400">*</span></span>
              </label>
              <input
                type="text"
                value={builderData.name}
                onChange={(e) => onDataChange({ name: e.target.value })}
                placeholder="Enter your name"
                maxLength={28}
                className="w-full px-3.5 py-2.5 rounded-xl editorial-input text-sm font-semibold placeholder:text-emerald-400/40"
              />
            </div>

            {/* Stack / Role */}
            <div>
              <label className="text-[11px] font-bold hh-tracking uppercase text-emerald-200 flex items-center gap-1.5 mb-1.5">
                <Code className="w-3.5 h-3.5 text-rose-400" />
                <span>Stack / Role <span className="text-rose-400">*</span></span>
              </label>
              <select
                value={builderData.stack}
                onChange={(e) => onDataChange({ stack: e.target.value as TechStack })}
                className="w-full px-3 py-2.5 rounded-xl editorial-input text-sm font-bold text-emerald-100 bg-emerald-950 border-emerald-700"
              >
                {STACK_OPTIONS.map((stk) => (
                  <option key={stk} value={stk} className="bg-emerald-950 text-emerald-100">
                    {stk}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Builder Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold hh-tracking uppercase text-emerald-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  Builder Title{' '}
                  <span className="text-emerald-400/50 font-normal normal-case tracking-normal">
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
              placeholder="e.g. Full-Stack Alchemist"
              maxLength={26}
              className="w-full px-3.5 py-2.5 rounded-xl editorial-input text-sm font-extrabold text-amber-300 placeholder:text-emerald-400/40"
            />
          </div>
        </>
      )}
    </div>
  );
};

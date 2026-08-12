import { FrameTheme } from '@/types';

export interface ThemeConfig {
  id: FrameTheme;
  name: string;
  bgColor: string;
  cardBg: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  mutedTextColor: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
}

export const THEME_CONFIGS: Record<FrameTheme, ThemeConfig> = {
  editorial: {
    id: 'editorial',
    name: 'Palm',
    bgColor: '#0B231B',
    cardBg: '#F5F2EB',
    primaryColor: '#0F382C',
    secondaryColor: '#FF5A36',
    accentColor: '#FFC72C',
    textColor: '#0B231B',
    mutedTextColor: '#4A6B5D',
    badgeBg: '#0F382C',
    badgeText: '#F5F2EB',
    borderColor: '#FF5A36',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    bgColor: '#1C0D24',
    cardBg: '#FFFDF9',
    primaryColor: '#F86624',
    secondaryColor: '#EA3546',
    accentColor: '#F9C80E',
    textColor: '#1C0D24',
    mutedTextColor: '#6B4A78',
    badgeBg: '#EA3546',
    badgeText: '#FFFDF9',
    borderColor: '#F86624',
  },
  volt: {
    id: 'volt',
    name: 'Volt',
    bgColor: '#0D0E11',
    cardBg: '#181A20',
    primaryColor: '#CCFF00',
    secondaryColor: '#FF0055',
    accentColor: '#00F0FF',
    textColor: '#F5F2EB',
    mutedTextColor: '#8E95A5',
    badgeBg: '#CCFF00',
    badgeText: '#0D0E11',
    borderColor: '#CCFF00',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    bgColor: '#05131D',
    cardBg: '#F0F7F9',
    primaryColor: '#006680',
    secondaryColor: '#F07167',
    accentColor: '#00B4D8',
    textColor: '#05131D',
    mutedTextColor: '#3A6B7E',
    badgeBg: '#006680',
    badgeText: '#F0F7F9',
    borderColor: '#F07167',
  },
};

export const PFP_CANVAS_SIZE = 1080;
export const ID_CARD_WIDTH = 1080;
export const ID_CARD_HEIGHT = 1350;

export const EVENT_DETAILS = {
  name: 'HACKER HOUSE GOA 2026',
  dates: '28–31 OCTOBER 2026',
  location: 'GOA, INDIA',
  hashtag: '#FrameInGoa',
  code: '247',
  statusBadge: 'BUILDER',
};

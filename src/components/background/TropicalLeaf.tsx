'use client';

import React from 'react';

export type LeafVariant =
  | 'palm-frond-left'
  | 'palm-frond-right'
  | 'monstera-leaf'
  | 'coastal-contour'
  | 'abstract-foliage';

interface Props {
  variant: LeafVariant;
  className?: string;
  color?: string;
  opacity?: number;
}

export const TropicalLeaf: React.FC<Props> = ({
  variant,
  className = '',
  color = '#315746',
  opacity = 0.12,
}) => {
  switch (variant) {
    case 'palm-frond-left':
      return (
        <svg
          className={`pointer-events-none select-none ${className}`}
          style={{ opacity }}
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Stem */}
          <path d="M10 310 C120 220 220 120 300 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
          {/* Palm Frond Leaves */}
          <path d="M50 270 Q10 240 20 210 Q65 240 90 245 Z" fill={color} />
          <path d="M90 235 Q30 190 40 160 Q105 200 130 210 Z" fill={color} />
          <path d="M135 195 Q60 140 75 110 Q145 160 170 175 Z" fill={color} />
          <path d="M175 155 Q100 90 120 60 Q185 125 210 140 Z" fill={color} />
          <path d="M220 115 Q150 45 170 20 Q225 80 250 100 Z" fill={color} />
          <path d="M260 70 Q200 10 220 0 Q265 40 290 55 Z" fill={color} />
          {/* Right Frond Leaves */}
          <path d="M90 245 Q130 290 160 300 Q120 260 100 240 Z" fill={color} />
          <path d="M130 210 Q180 250 210 260 Q160 220 140 200 Z" fill={color} />
          <path d="M170 175 Q225 210 250 220 Q200 185 180 165 Z" fill={color} />
          <path d="M210 140 Q260 170 285 180 Q235 150 220 130 Z" fill={color} />
        </svg>
      );

    case 'palm-frond-right':
      return (
        <svg
          className={`pointer-events-none select-none ${className}`}
          style={{ opacity }}
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Stem Reversed */}
          <path d="M310 310 C200 220 100 120 20 10" stroke={color} strokeWidth="3" strokeLinecap="round" />
          <path d="M270 270 Q310 240 300 210 Q255 240 230 245 Z" fill={color} />
          <path d="M230 235 Q290 190 280 160 Q215 200 190 210 Z" fill={color} />
          <path d="M185 195 Q260 140 245 110 Q175 160 150 175 Z" fill={color} />
          <path d="M145 155 Q220 90 200 60 Q135 125 110 140 Z" fill={color} />
          <path d="M100 115 Q170 45 150 20 Q95 80 70 100 Z" fill={color} />
        </svg>
      );

    case 'monstera-leaf':
      return (
        <svg
          className={`pointer-events-none select-none ${className}`}
          style={{ opacity }}
          width="240"
          height="240"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M120 10 C180 10 220 60 220 120 C220 180 170 230 120 230 C70 230 20 180 20 120 C20 60 60 10 120 10 Z"
            fill={color}
          />
          {/* Internal Monstera Slits */}
          <path d="M120 40 L120 200" stroke="#FDF9F0" strokeWidth="4" />
          <ellipse cx="75" cy="80" rx="25" ry="8" fill="#FDF9F0" transform="rotate(-25 75 80)" />
          <ellipse cx="165" cy="80" rx="25" ry="8" fill="#FDF9F0" transform="rotate(25 165 80)" />
          <ellipse cx="60" cy="130" rx="30" ry="8" fill="#FDF9F0" transform="rotate(-15 60 130)" />
          <ellipse cx="180" cy="130" rx="30" ry="8" fill="#FDF9F0" transform="rotate(15 180 130)" />
          <ellipse cx="80" cy="175" rx="20" ry="6" fill="#FDF9F0" transform="rotate(-10 80 175)" />
          <ellipse cx="160" cy="175" rx="20" ry="6" fill="#FDF9F0" transform="rotate(10 160 175)" />
        </svg>
      );

    case 'coastal-contour':
      return (
        <svg
          className={`pointer-events-none select-none ${className}`}
          style={{ opacity }}
          width="400"
          height="120"
          viewBox="0 0 400 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 40 C100 10 200 70 400 30" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="6 4" />
          <path d="M0 70 C120 40 240 100 400 60" stroke={color} strokeWidth="1" fill="none" />
          <path d="M0 100 C150 80 250 120 400 90" stroke={color} strokeWidth="0.5" fill="none" />
        </svg>
      );

    case 'abstract-foliage':
    default:
      return (
        <svg
          className={`pointer-events-none select-none ${className}`}
          style={{ opacity }}
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M90 10 C140 40 170 90 160 140 C120 170 60 160 20 120 C10 70 40 20 90 10 Z" fill={color} />
          <path d="M90 20 C130 50 150 90 140 130" stroke="#FDF9F0" strokeWidth="2" fill="none" />
        </svg>
      );
  }
};

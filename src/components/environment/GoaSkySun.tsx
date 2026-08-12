'use client';

import React from 'react';

interface Props {
  progress: number;
}

/** Interpolates between 2 RGB color tuples [r, g, b] */
function interpolateColor(color1: [number, number, number], color2: [number, number, number], factor: number): string {
  const r = Math.round(color1[0] + factor * (color2[0] - color1[0]));
  const g = Math.round(color1[1] + factor * (color2[1] - color1[1]));
  const b = Math.round(color1[2] + factor * (color2[2] - color1[2]));
  return `rgb(${r}, ${g}, ${b})`;
}

export const GoaSkySun: React.FC<Props> = ({ progress }) => {
  // Color Palettes for Sunrise (0), Day (0.4), Golden Hour (0.7), Sunset (1.0)
  // Top Sky Color
  let topColor: string;
  // Middle Sky Color
  let midColor: string;
  // Horizon Sky Color
  let botColor: string;

  if (progress <= 0.35) {
    // Sunrise -> Day
    const t = progress / 0.35;
    topColor = interpolateColor([23, 43, 73], [121, 199, 232], t);
    midColor = interpolateColor([242, 167, 160], [191, 231, 243], t);
    botColor = interpolateColor([255, 213, 138], [255, 240, 197], t);
  } else if (progress <= 0.7) {
    // Day -> Golden Hour
    const t = (progress - 0.35) / 0.35;
    topColor = interpolateColor([121, 199, 232], [246, 179, 75], t);
    midColor = interpolateColor([191, 231, 243], [240, 122, 79], t);
    botColor = interpolateColor([255, 240, 197], [216, 92, 82], t);
  } else {
    // Golden Hour -> Sunset/Night
    const t = (progress - 0.7) / 0.3;
    topColor = interpolateColor([246, 179, 75], [73, 52, 95], t);
    midColor = interpolateColor([240, 122, 79], [196, 76, 104], t);
    botColor = interpolateColor([216, 92, 82], [17, 24, 39], t);
  }

  // Sun Movement:
  // Progress 0: Sun low left/center (y = 65%)
  // Progress 0.4: Sun high (y = 15%)
  // Progress 1.0: Sun touching horizon (y = 72%)
  let sunX = 35 + progress * 30; // 35% -> 65%
  let sunY = 65 - Math.sin(progress * Math.PI) * 50; // Arc trajectory
  let sunRadius = 60 + (1 - Math.abs(progress - 0.5) * 2) * 20;

  // Sun Glow Color
  const sunColor = progress > 0.65 ? '#FF5A36' : progress > 0.3 ? '#FFF2D6' : '#FFD58A';

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0">
      {/* Multi-stop Procedural Gradient Sky */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: `linear-gradient(180deg, ${topColor} 0%, ${midColor} 50%, ${botColor} 100%)`,
        }}
      />

      {/* Procedural Traveling Sun */}
      <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
        <circle
          cx={`${sunX}%`}
          cy={`${sunY}%`}
          r={sunRadius}
          fill={sunColor}
          opacity={progress > 0.95 ? 0.4 : 0.85}
          className="transition-all duration-300"
        />
        <circle
          cx={`${sunX}%`}
          cy={`${sunY}%`}
          r={sunRadius * 2.2}
          fill={sunColor}
          opacity={0.25}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
};

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TropicalLeaf } from '../background/TropicalLeaf';

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * Math.max(0, Math.min(1, t));
}

function lerpColor(c1: string, c2: string, t: number): string {
  const parseHex = (hex: string) => {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const [r1, g1, b1] = parseHex(c1);
  const [r2, g2, b2] = parseHex(c2);

  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));

  return `rgb(${r}, ${g}, ${b})`;
}

interface ColorStop {
  stop: number;
  topSky: string;
  midSky: string;
  horizonSky: string;
  oceanTop: string;
  oceanBottom: string;
  sandColor: string;
  palmColor: string;
  palmRim: string;
}

const COLOR_TIMELINE: ColorStop[] = [
  // 0.00 — Sunrise
  {
    stop: 0.0,
    topSky: '#2B4162',
    midSky: '#D97757',
    horizonSky: '#F8B068',
    oceanTop: '#2C5364',
    oceanBottom: '#D97757',
    sandColor: '#E6C594',
    palmColor: '#2B4533',
    palmRim: '#F8B068',
  },
  // 0.25 — Morning
  {
    stop: 0.25,
    topSky: '#3A82C4',
    midSky: '#88C0E8',
    horizonSky: '#FBF5D4',
    oceanTop: '#1E6488',
    oceanBottom: '#5AA7CD',
    sandColor: '#F5E4BC',
    palmColor: '#225838',
    palmRim: '#88C0E8',
  },
  // 0.50 — Bright Daylight
  {
    stop: 0.5,
    topSky: '#1D67B2',
    midSky: '#59A6E3',
    horizonSky: '#DDF0FF',
    oceanTop: '#175E9B',
    oceanBottom: '#3B98D4',
    sandColor: '#F7E7C4',
    palmColor: '#1B5231',
    palmRim: '#59A6E3',
  },
  // 0.75 — Golden Hour
  {
    stop: 0.75,
    topSky: '#69231B',
    midSky: '#C45727',
    horizonSky: '#F2A03D',
    oceanTop: '#3D1C1D',
    oceanBottom: '#C45727',
    sandColor: '#CFA068',
    palmColor: '#1D2520',
    palmRim: '#F2A03D',
  },
  // 1.00 — Sunset / Blue Hour
  {
    stop: 1.0,
    topSky: '#0F1526',
    midSky: '#521D28',
    horizonSky: '#C84C27',
    oceanTop: '#0B101D',
    oceanBottom: '#451B25',
    sandColor: '#3B2926',
    palmColor: '#090D17',
    palmRim: '#C84C27',
  },
];

function getInterpolatedColors(progress: number) {
  const p = Math.max(0, Math.min(1, progress));

  let idx = 0;
  for (let i = 0; i < COLOR_TIMELINE.length - 1; i++) {
    if (p >= COLOR_TIMELINE[i].stop && p <= COLOR_TIMELINE[i + 1].stop) {
      idx = i;
      break;
    }
  }

  const c1 = COLOR_TIMELINE[idx];
  const c2 = COLOR_TIMELINE[idx + 1] || c1;
  const range = c2.stop - c1.stop;
  const t = range > 0 ? (p - c1.stop) / range : 0;

  return {
    topSky: lerpColor(c1.topSky, c2.topSky, t),
    midSky: lerpColor(c1.midSky, c2.midSky, t),
    horizonSky: lerpColor(c1.horizonSky, c2.horizonSky, t),
    oceanTop: lerpColor(c1.oceanTop, c2.oceanTop, t),
    oceanBottom: lerpColor(c1.oceanBottom, c2.oceanBottom, t),
    sandColor: lerpColor(c1.sandColor, c2.sandColor, t),
    palmColor: lerpColor(c1.palmColor, c2.palmColor, t),
    palmRim: lerpColor(c1.palmRim, c2.palmRim, t),
  };
}

export const GoaProceduralMasterEnvironment: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const bgParallaxRef = useRef<HTMLDivElement>(null);
  const fgParallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    let rafId: number;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const rawProgress = totalScroll > 0 ? Math.max(0, Math.min(1, window.scrollY / totalScroll)) : 0;
      targetProgressRef.current = rawProgress;
    };

    const animateLoop = () => {
      // Damped lerp spring inertia physics (0.08 factor for luxury feel)
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.08;

      const p = currentProgressRef.current;
      setProgress(p);

      if (bgParallaxRef.current && !mediaQuery.matches && window.innerWidth >= 768) {
        bgParallaxRef.current.style.transform = `translate3d(0, ${p * -20}px, 0)`;
      }
      if (fgParallaxRef.current && !mediaQuery.matches && window.innerWidth >= 768) {
        fgParallaxRef.current.style.transform = `translate3d(0, ${p * -45}px, 0)`;
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(animateLoop);

    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const colors = getInterpolatedColors(progress);

  // Traveling Sun Dynamics
  const sunX = 72 - progress * 20; // 72% -> 52%
  const sunY = 55 - Math.sin(progress * Math.PI) * 42; // Arcs from 55% -> 13% -> 55%
  const sunOpacity = Math.max(0, Math.min(1, 1 - Math.pow(progress - 0.85, 2) * 20));
  const shackLightsOpacity = Math.max(0, Math.min(1, (progress - 0.5) / 0.4));

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
      {/* ── LAYER 1: PROCEDURAL ATMOSPHERIC SKY ── */}
      <div
        className="absolute inset-0 w-full h-full transition-colors duration-300 ease-out"
        style={{
          background: `linear-gradient(180deg, ${colors.topSky} 0%, ${colors.midSky} 45%, ${colors.horizonSky} 100%)`,
        }}
      />

      {/* ── LAYER 2: TRAVELING PHYSICAL SUN & ATMOSPHERIC RAY GLARE ── */}
      <div
        className="absolute transition-all duration-300 ease-out rounded-full pointer-events-none"
        style={{
          left: `${sunX}%`,
          top: `${sunY}%`,
          width: '140px',
          height: '140px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,220,150,0.8) 35%, rgba(255,180,90,0) 70%)',
          boxShadow: `0 0 90px 40px ${colors.horizonSky}`,
          opacity: sunOpacity,
        }}
      />

      {/* ── LAYER 3 & 4: MIDGROUND OCEAN, COASTLINE & HILLS ── */}
      <div ref={bgParallaxRef} className="absolute inset-0 w-full h-full">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
          <defs>
            {/* Ocean Gradient */}
            <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colors.oceanTop} />
              <stop offset="100%" stopColor={colors.oceanBottom} />
            </linearGradient>

            {/* Sun Reflection Trail on Water */}
            <linearGradient id="sunReflection" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#FFF5D4" stopOpacity="0.8" />
              <stop offset="50%" stopColor={colors.horizonSky} stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Sand Gradient */}
            <linearGradient id="sandGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={colors.sandColor} />
              <stop offset="100%" stopColor="#2A1B18" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Distant Goa Headland Hills */}
          <path
            d="M 680 480 Q 850 420 1020 470 T 1440 450 L 1440 500 L 680 500 Z"
            fill={colors.topSky}
            opacity="0.65"
          />

          {/* Horizon Line & Ocean Water */}
          <rect x="0" y="470" width="1440" height="260" fill="url(#oceanGrad)" />

          {/* Ocean Waves Foamy Paths */}
          <path
            d="M 350 510 Q 700 500 1440 530 L 1440 540 Q 700 510 350 520 Z"
            fill="#FFFFFF"
            opacity={0.35 + Math.sin(progress * 8) * 0.1}
          />
          <path
            d="M 280 550 Q 750 540 1440 580 L 1440 595 Q 750 550 280 565 Z"
            fill="#FFFFFF"
            opacity={0.45 + Math.cos(progress * 6) * 0.1}
          />

          {/* Sun Reflection Mirror Path on Water */}
          <polygon
            points={`${sunX * 14.4 - 70},470 ${sunX * 14.4 + 70},470 1100,700 600,700`}
            fill="url(#sunReflection)"
            opacity={0.6}
          />

          {/* Curved Sandy Beach Coast */}
          <path
            d="M 0 540 Q 450 520 750 620 T 1440 820 L 1440 900 L 0 900 Z"
            fill="url(#sandGrad)"
          />

          {/* Goan Beach Huts & Shacks on Shoreline */}
          <g transform="translate(60, 480)">
            {/* Shack 1 Structure */}
            <polygon points="40,60 120,40 200,60 190,110 50,110" fill="#1C1412" />
            <polygon points="30,60 120,25 210,60" fill="#2E201B" />
            {/* Shack String Lights */}
            <circle cx="60" cy="65" r="4" fill="#FFAA33" opacity={shackLightsOpacity} />
            <circle cx="90" cy="62" r="4" fill="#FFAA33" opacity={shackLightsOpacity} />
            <circle cx="120" cy="60" r="4" fill="#FFAA33" opacity={shackLightsOpacity} />
            <circle cx="150" cy="62" r="4" fill="#FFAA33" opacity={shackLightsOpacity} />
            <circle cx="180" cy="65" r="4" fill="#FFAA33" opacity={shackLightsOpacity} />

            {/* Shack 2 Structure */}
            <polygon points="230,70 300,55 370,70 360,115 240,115" fill="#1C1412" />
            <polygon points="220,70 300,42 380,70" fill="#2E201B" />
            {/* Shack 2 String Lights */}
            <circle cx="250" cy="74" r="3.5" fill="#FFC857" opacity={shackLightsOpacity} />
            <circle cx="280" cy="70" r="3.5" fill="#FFC857" opacity={shackLightsOpacity} />
            <circle cx="310" cy="70" r="3.5" fill="#FFC857" opacity={shackLightsOpacity} />
            <circle cx="340" cy="74" r="3.5" fill="#FFC857" opacity={shackLightsOpacity} />
          </g>

          {/* Silhouetted Beach Campfire at Dusk (Progress > 0.65) */}
          <g transform="translate(480, 680)" opacity={Math.max(0, (progress - 0.6) / 0.3)}>
            <circle cx="0" cy="0" r="16" fill="#FF5500" opacity="0.7" />
            <circle cx="0" cy="0" r="8" fill="#FFAA00" opacity="0.9" />
            {/* Silhouetted People Sitting around Campfire */}
            <circle cx="-25" cy="-5" r="5" fill="#0A111E" />
            <rect x="-28" y="0" width="6" height="12" fill="#0A111E" rx="2" />
            <circle cx="25" cy="-5" r="5" fill="#0A111E" />
            <rect x="22" y="0" width="6" height="12" fill="#0A111E" rx="2" />
          </g>

          {/* Swaying Coastal Coconut Palms (Dynamic Lighting Rim) */}
          <g>
            {/* Left Palm Cluster */}
            <path
              d="M 120 900 Q 180 650 260 420"
              stroke={colors.palmColor}
              strokeWidth="18"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Palm Fronds */}
            <g transform="translate(260, 420)">
              <path d="M 0 0 Q -80 -60 -160 -30" stroke={colors.palmColor} strokeWidth="6" fill="none" />
              <path d="M 0 0 Q -60 -90 -120 -120" stroke={colors.palmColor} strokeWidth="6" fill="none" />
              <path d="M 0 0 Q 30 -90 90 -110" stroke={colors.palmColor} strokeWidth="6" fill="none" />
              <path d="M 0 0 Q 80 -40 140 10" stroke={colors.palmColor} strokeWidth="6" fill="none" />
              <path d="M 0 0 Q -40 40 -90 80" stroke={colors.palmColor} strokeWidth="6" fill="none" />
            </g>

            {/* Second Left Palm */}
            <path
              d="M 0 900 Q 80 600 140 340"
              stroke={colors.palmColor}
              strokeWidth="22"
              strokeLinecap="round"
              fill="none"
            />
            <g transform="translate(140, 340)">
              <path d="M 0 0 Q -70 -70 -140 -40" stroke={colors.palmColor} strokeWidth="7" fill="none" />
              <path d="M 0 0 Q -40 -100 -90 -140" stroke={colors.palmColor} strokeWidth="7" fill="none" />
              <path d="M 0 0 Q 40 -100 110 -120" stroke={colors.palmColor} strokeWidth="7" fill="none" />
              <path d="M 0 0 Q 90 -30 150 30" stroke={colors.palmColor} strokeWidth="7" fill="none" />
            </g>
          </g>
        </svg>
      </div>

      {/* ── LAYER 5: FOREGROUND SWAYING PALM FRONDS (Slightly Faster Parallax) ── */}
      <div ref={fgParallaxRef} className="absolute inset-0 pointer-events-none z-10">
        <div className={reducedMotion ? '' : 'animate-goa-breeze'}>
          <TropicalLeaf
            variant="palm-frond-right"
            className="absolute -top-12 -right-12 w-72 sm:w-96 drop-shadow-md"
            color={colors.palmColor}
            opacity={0.3}
          />
        </div>
        <div className={reducedMotion ? '' : 'animate-goa-breeze-reverse'}>
          <TropicalLeaf
            variant="palm-frond-left"
            className="absolute -bottom-16 -left-16 w-80 sm:w-[420px] drop-shadow-md"
            color={colors.palmColor}
            opacity={0.35}
          />
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Scene } from './Scene';

function createHeroFrontTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#151B2B';
  ctx.fillRect(0, 0, 600, 800);

  // Grid lines
  ctx.strokeStyle = 'rgba(245, 241, 232, 0.08)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 600; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 800);
    ctx.stroke();
  }
  for (let y = 0; y < 800; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(600, y);
    ctx.stroke();
  }

  // Border
  ctx.strokeStyle = '#9F452D';
  ctx.lineWidth = 12;
  ctx.strokeRect(16, 16, 568, 768);

  // Corner accents
  ctx.fillStyle = '#D8A928';
  ctx.fillRect(24, 24, 16, 16);
  ctx.fillRect(560, 24, 16, 16);
  ctx.fillRect(24, 760, 16, 16);
  ctx.fillRect(560, 760, 16, 16);

  // Header pill
  ctx.fillStyle = '#F5F1E8';
  ctx.fillRect(60, 60, 480, 50);

  ctx.fillStyle = '#151B2B';
  ctx.font = 'bold 20px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('HACKER HOUSE GOA 2026', 300, 85);

  // Big 247
  ctx.fillStyle = '#F5F1E8';
  ctx.font = '900 160px "Syne", sans-serif';
  ctx.fillText('247', 300, 380);

  // Tagline
  ctx.fillStyle = '#9F452D';
  ctx.font = '800 28px "Syne", sans-serif';
  ctx.fillText('THE ROAD TO 247', 300, 520);

  // Subtext
  ctx.fillStyle = 'rgba(245, 241, 232, 0.7)';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('BUILDER MARK ARTIFACT', 300, 680);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createHeroBackTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 800;
  const ctx = canvas.getContext('2d')!;

  // Background
  ctx.fillStyle = '#151B2B';
  ctx.fillRect(0, 0, 600, 800);

  // Border
  ctx.strokeStyle = '#F5F1E8';
  ctx.lineWidth = 8;
  ctx.strokeRect(16, 16, 568, 768);

  ctx.fillStyle = '#F5F1E8';
  ctx.font = '900 42px "Syne", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GOA, INDIA', 300, 240);

  ctx.fillStyle = '#D8A928';
  ctx.font = '700 28px "JetBrains Mono", monospace';
  ctx.fillText('28–31 OCTOBER 2026', 300, 360);

  ctx.fillStyle = '#9F452D';
  ctx.font = '800 32px "JetBrains Mono", monospace';
  ctx.fillText('#FrameInGoa', 300, 500);

  ctx.fillStyle = 'rgba(245, 241, 232, 0.5)';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('OFFICIAL EVENT PASS', 300, 680);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const HeroCardMesh: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotation.current = {
        x: -ny * 0.14,
        y: nx * 0.14,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const frontTexture = useMemo(() => createHeroFrontTexture(), []);
  const backTexture = useMemo(() => createHeroBackTexture(), []);

  const materials = useMemo(() => {
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x151b2b, roughness: 0.3 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.2,
      metalness: 0.1,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.2,
      metalness: 0.1,
    });

    return [sideMat, sideMat, sideMat, sideMat, frontMat, backMat];
  }, [frontTexture, backTexture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (reducedMotion) {
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
      meshRef.current.position.y = 0;
      return;
    }

    const time = state.clock.getElapsedTime();
    const floatY = Math.sin(time * 1.5) * 0.08;
    meshRef.current.position.y = floatY;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      delta * 4
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y + Math.sin(time * 0.5) * 0.05,
      delta * 4
    );
  });

  return (
    <mesh ref={meshRef} material={materials} castShadow receiveShadow>
      <boxGeometry args={[1.8, 2.4, 0.08]} />
    </mesh>
  );
};

export const HHGoaHero3D: React.FC = () => {
  return (
    <div className="w-full h-[260px] sm:h-[320px] relative flex items-center justify-center">
      <Scene cameraPosition={[0, 0, 4]} fov={42}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-3, -2, -3]} intensity={0.5} color="#D8A928" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#9F452D" />
        <HeroCardMesh />
      </Scene>
    </div>
  );
};

export default HHGoaHero3D;

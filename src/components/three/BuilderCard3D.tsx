'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Scene } from './Scene';

interface BuilderCard3DProps {
  imageUrl: string;
  className?: string;
}

const CardMesh: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imageUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        setTexture(tex);
      },
      undefined,
      (err) => console.warn('Failed to load 3D texture from canvas output:', err)
    );
  }, [imageUrl]);

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
        x: -ny * 0.12,
        y: nx * 0.12,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      mediaQuery.removeEventListener('change', handler);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 540;
    canvas.height = 675;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#07120E';
    ctx.fillRect(0, 0, 540, 675);

    ctx.strokeStyle = 'rgba(255, 90, 54, 0.4)';
    ctx.lineWidth = 6;
    ctx.strokeRect(12, 12, 516, 651);

    ctx.fillStyle = '#FFC72C';
    ctx.font = 'bold 24px "Fira Code", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('HACKER HOUSE GOA 2026', 270, 260);

    ctx.fillStyle = '#F5F2EB';
    ctx.font = '900 64px "Outfit", sans-serif';
    ctx.fillText('247', 270, 340);

    ctx.fillStyle = '#FF5A36';
    ctx.font = 'bold 20px "Fira Code", monospace';
    ctx.fillText('AUTHENTICATED BUILDER MARK', 270, 420);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const materials = useMemo(() => {
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x0f382c, roughness: 0.3 });
    const frontMat = new THREE.MeshStandardMaterial({
      map: texture || null,
      color: texture ? 0xffffff : 0x0f382c,
      roughness: 0.25,
      metalness: 0.05,
    });
    const backMat = new THREE.MeshStandardMaterial({
      map: backTexture,
      roughness: 0.3,
      metalness: 0.1,
    });

    return [sideMat, sideMat, sideMat, sideMat, frontMat, backMat];
  }, [texture, backTexture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (reducedMotion) {
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.y = 0;
      meshRef.current.position.y = 0;
      return;
    }

    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time * 1.8) * 0.06;

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotation.current.x,
      delta * 4
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetRotation.current.y + Math.sin(time * 0.6) * 0.04,
      delta * 4
    );
  });

  return (
    <mesh ref={meshRef} material={materials} castShadow receiveShadow>
      <boxGeometry args={[2.0, 2.5, 0.06]} />
    </mesh>
  );
};

export const BuilderCard3D: React.FC<BuilderCard3DProps> = ({
  imageUrl,
  className = 'w-full h-[320px] sm:h-[400px]',
}) => {
  if (!imageUrl) return null;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Scene cameraPosition={[0, 0, 4.2]} fov={45} className="w-full h-full">
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} castShadow />
        <directionalLight position={[-3, -2, -3]} intensity={0.4} color="#FFC72C" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#FF5A36" />
        <CardMesh imageUrl={imageUrl} />
      </Scene>
    </div>
  );
};

export default BuilderCard3D;

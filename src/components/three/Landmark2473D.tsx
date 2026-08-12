'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Landmark247Props {
  progress?: number;
}

/**
 * 3D Physical "247" Coastal Art Installation Sculpture
 * Built with procedural 3D box meshes forming "2", "4", "7"
 * Dark weathered stone/metallic finish that casts shadows & receives sun lighting
 */
export const Landmark2473D: React.FC<Landmark247Props> = ({ progress = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      // Gentle floating sway in the coastal breeze
      groupRef.current.position.y = Math.sin(timeRef.current * 0.8) * 0.08;
      groupRef.current.rotation.y = Math.sin(timeRef.current * 0.4) * 0.06;
    }
  });

  const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: '#151B2B',
    roughness: 0.35,
    metalness: 0.65,
  });

  const orangeAccentMaterial = new THREE.MeshStandardMaterial({
    color: '#9F452D',
    roughness: 0.2,
    metalness: 0.8,
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={[0.9, 0.9, 0.9]}>
      {/* ── NUMBER 2 ── */}
      <group position={[-1.6, 0, 0]}>
        {/* Top Horizontal */}
        <mesh position={[0, 0.9, 0]} material={darkMetalMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.22, 0.22]} />
        </mesh>
        {/* Top Right Vertical */}
        <mesh position={[0.4, 0.5, 0]} material={darkMetalMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.6, 0.22]} />
        </mesh>
        {/* Middle Horizontal */}
        <mesh position={[0, 0.1, 0]} material={orangeAccentMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.22, 0.22]} />
        </mesh>
        {/* Bottom Left Vertical */}
        <mesh position={[-0.4, -0.3, 0]} material={darkMetalMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.6, 0.22]} />
        </mesh>
        {/* Bottom Horizontal */}
        <mesh position={[0, -0.7, 0]} material={darkMetalMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.22, 0.22]} />
        </mesh>
      </group>

      {/* ── NUMBER 4 ── */}
      <group position={[0, 0, 0]}>
        {/* Left Vertical Upper */}
        <mesh position={[-0.4, 0.4, 0]} material={darkMetalMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.8, 0.22]} />
        </mesh>
        {/* Middle Horizontal Bar */}
        <mesh position={[0, 0.1, 0]} material={orangeAccentMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.22, 0.22]} />
        </mesh>
        {/* Main Vertical Bar */}
        <mesh position={[0.3, 0.1, 0]} material={darkMetalMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.22, 1.8, 0.22]} />
        </mesh>
      </group>

      {/* ── NUMBER 7 ── */}
      <group position={[1.6, 0, 0]}>
        {/* Top Horizontal Bar */}
        <mesh position={[0, 0.9, 0]} material={orangeAccentMaterial} castShadow receiveShadow>
          <boxGeometry args={[1.1, 0.22, 0.22]} />
        </mesh>
        {/* Slanted Vertical Leg */}
        <mesh position={[0.1, 0.0, 0]} rotation={[0, 0, -0.22]} material={darkMetalMaterial} castShadow receiveShadow>
          <boxGeometry args={[0.22, 1.6, 0.22]} />
        </mesh>
      </group>

      {/* ── SCULPTURE PEDESTAL BASE ── */}
      <mesh position={[0, -1.05, 0]} material={darkMetalMaterial} castShadow receiveShadow>
        <boxGeometry args={[4.8, 0.18, 0.8]} />
      </mesh>
    </group>
  );
};

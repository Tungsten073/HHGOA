'use client';

import React, { Component, ErrorInfo, ReactNode, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { WebGLFallback } from './WebGLFallback';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('3D Scene Error Boundary caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <WebGLFallback />;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

interface SceneProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  aspectRatio?: number;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export const Scene: React.FC<SceneProps> = ({
  children,
  className = 'w-full h-full min-h-[220px]',
  fallback,
  cameraPosition = [0, 0, 4.2],
  fov = 45,
}) => {
  const [isSupported, setIsSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setIsSupported(checkWebGLSupport());
  }, []);

  if (isSupported === false) {
    return <div className={className}>{fallback || <WebGLFallback />}</div>;
  }

  if (isSupported === null) {
    return <div className={className} />;
  }

  return (
    <div className={`relative ${className}`}>
      <ThreeErrorBoundary fallback={fallback || <WebGLFallback />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: cameraPosition, fov }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}
        >
          {children}
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
};

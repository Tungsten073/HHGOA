'use client';

import React from 'react';

interface WebGLFallbackProps {
  children?: React.ReactNode;
  message?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({ children, message }) => {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 text-center bg-emerald-950/40 rounded-2xl border border-emerald-800/40 backdrop-blur-sm">
      <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-3 font-mono font-bold text-sm">
        2D
      </div>
      <p className="text-xs font-mono font-semibold text-emerald-200/80 max-w-xs">
        {message || '3D hardware acceleration off — running in pure 2D mode.'}
      </p>
    </div>
  );
};

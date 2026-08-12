'use client';

import React, { useEffect, useRef } from 'react';
import { BuilderData, FormatType, FrameTheme, TransformState } from '@/types';
import { drawPfpFrame } from '@/lib/canvas/drawPfpFrame';
import { drawBuilderCard } from '@/lib/canvas/drawBuilderCard';

interface Props {
  format: FormatType;
  userImage: HTMLImageElement | null;
  builderData: BuilderData;
  theme: FrameTheme;
  transform: TransformState;
  /** Called when the user drags on the canvas to reposition the photo. */
  onTransformChange?: (newTransform: Partial<TransformState>) => void;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const FrameCanvas: React.FC<Props> = ({
  format,
  userImage,
  builderData,
  theme,
  transform,
  onTransformChange,
  onCanvasReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Drag state: pointer start position + initial offsets at drag start
  const dragState = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (format === 'frame') {
      drawPfpFrame(canvas, userImage, theme, transform, builderData.name);
    } else {
      drawBuilderCard(canvas, userImage, builderData, theme, transform);
    }

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [format, userImage, builderData, theme, transform, onCanvasReady]);

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!userImage || !onTransformChange) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(e.pointerId);
    dragState.current = {
      x: e.clientX,
      y: e.clientY,
      ox: transform.offsetX,
      oy: transform.offsetY,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragState.current || !userImage || !onTransformChange) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Convert screen-pixel delta → canvas-pixel delta so drag feels 1:1
    const rect = canvas.getBoundingClientRect();
    const ratio = canvas.width / rect.width;
    const dx = (e.clientX - dragState.current.x) * ratio;
    const dy = (e.clientY - dragState.current.y) * ratio;
    onTransformChange({
      offsetX: dragState.current.ox + dx,
      offsetY: dragState.current.oy + dy,
    });
  };

  const onPointerUp = () => {
    dragState.current = null;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full relative bg-[#151B2B] p-2 border-2 border-[#151B2B] shadow-brutal-lg flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`w-full h-auto object-contain transition-all ${
            userImage ? 'cursor-grab active:cursor-grabbing touch-none' : ''
          }`}
          aria-label={`${format === 'frame' ? 'PFP overlay' : 'Builder ID'} preview`}
        />
      </div>
    </div>
  );
};

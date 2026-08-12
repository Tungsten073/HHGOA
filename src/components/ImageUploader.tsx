'use client';

import React, { useRef, useState } from 'react';
import { convertHeicToJpegIfNeeded } from '@/lib/utils/heicConverter';
import { Upload, Image as ImageIcon, Loader2, RefreshCw } from 'lucide-react';

interface Props {
  onImageLoaded: (img: HTMLImageElement | null) => void;
  currentImageLoaded: boolean;
}

export const ImageUploader: React.FC<Props> = ({ onImageLoaded, currentImageLoaded }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFile = async (file: File) => {
    if (!file) return;
    setError(null);
    setIsProcessing(true);
    setFileName(file.name);

    try {
      const processedBlob = await convertHeicToJpegIfNeeded(file);
      const url = URL.createObjectURL(processedBlob);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        onImageLoaded(img);
        setIsProcessing(false);
      };
      img.onerror = () => {
        setError("Couldn't read that image. Try a different file.");
        setIsProcessing(false);
      };
      img.src = url;
    } catch (err) {
      console.error('Image upload error:', err);
      setError('Something went wrong loading that image.');
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full space-y-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/jpg,image/heic,image/heif"
        className="hidden"
      />

      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        aria-label="Upload photo"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        className={`w-full relative cursor-pointer border-2 border-dashed rounded-2xl transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[160px] px-6 py-8 space-y-3 select-none ${
          dragActive
            ? 'border-amber-400 bg-amber-400/10 scale-[1.01]'
            : currentImageLoaded
            ? 'border-emerald-700 bg-emerald-950/60 hover:border-amber-400/60'
            : 'border-emerald-800/80 bg-emerald-950/40 hover:border-amber-400 hover:bg-emerald-950/60'
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center space-y-2 text-amber-300">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-semibold">Processing photo…</span>
            <span className="text-[11px] text-emerald-200/50">Converting HEIC if iPhone photo</span>
          </div>
        ) : currentImageLoaded ? (
          <div className="flex items-center space-x-3 text-emerald-100">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-bold truncate max-w-[200px] sm:max-w-xs">
                {fileName || 'Photo Uploaded'}
              </p>
              <p className="text-[11px] text-amber-400 font-mono font-medium mt-0.5 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 shrink-0" />
                <span>Tap to change photo</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-amber-400/15 border border-amber-400/20 flex items-center justify-center text-amber-400 transition-transform group-hover:scale-105">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-emerald-100">
                Upload photo <span className="text-amber-400">(JPG, PNG, iPhone HEIC)</span>
              </p>
              <p className="text-xs text-emerald-200/50 mt-1">
                Drag & drop or tap to browse
              </p>
            </div>
          </>
        )}
      </div>

      {/* Drag hint — shown after photo loads */}
      {currentImageLoaded && !isProcessing && (
        <p className="font-mono text-[10px] hh-tracking text-amber-400/70 text-center pt-0.5">
          Drag on canvas to reposition · zoom below
        </p>
      )}

      {/* Error alert */}
      {error && (
        <p
          role="alert"
          className="rounded-lg bg-rose-950/60 border border-rose-700/60 px-3 py-2 text-xs text-rose-300 text-center"
        >
          {error}
        </p>
      )}
    </div>
  );
};

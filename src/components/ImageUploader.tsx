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
        className={`w-full relative cursor-pointer border-2 border-dashed border-[#151B2B] rounded-none transition-all duration-200 flex flex-col items-center justify-center text-center min-h-[160px] px-6 py-8 space-y-3 select-none ${
          dragActive
            ? 'border-[#9F452D] bg-[#9F452D]/10 scale-[1.01]'
            : currentImageLoaded
            ? 'bg-[#F5F1E8] hover:border-[#9F452D] shadow-brutal'
            : 'bg-[#F5F1E8]/60 hover:bg-[#F5F1E8] hover:shadow-brutal'
        }`}
      >
        {isProcessing ? (
          <div className="flex flex-col items-center space-y-2 text-[#9F452D]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-mono font-bold uppercase">Processing photo…</span>
            <span className="text-[11px] font-mono text-[#151B2B]/60">Converting HEIC if iPhone photo</span>
          </div>
        ) : currentImageLoaded ? (
          <div className="flex items-center space-x-3 text-[#151B2B]">
            <div className="w-10 h-10 rounded-full bg-[#9F452D]/15 border border-[#9F452D] flex items-center justify-center text-[#9F452D] shrink-0">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-xs font-mono font-bold truncate max-w-[200px] sm:max-w-xs">
                {fileName || 'Photo Uploaded'}
              </p>
              <p className="text-[11px] text-[#9F452D] font-mono font-bold mt-0.5 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 shrink-0" />
                <span>TAP TO CHANGE PHOTO</span>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-[#151B2B]/5 border-2 border-[#151B2B] flex items-center justify-center text-[#151B2B] transition-transform group-hover:scale-105">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-syne font-extrabold uppercase text-[#151B2B]">
                Upload photo <span className="text-[#9F452D]">(JPG, PNG, HEIC)</span>
              </p>
              <p className="text-xs font-mono text-[#151B2B]/60 mt-1 uppercase">
                Drag & drop or tap to browse
              </p>
            </div>
          </>
        )}
      </div>

      {/* Drag hint — shown after photo loads */}
      {currentImageLoaded && !isProcessing && (
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#9F452D] text-center pt-0.5 font-bold">
          Drag on canvas to reposition · zoom below
        </p>
      )}

      {/* Error alert */}
      {error && (
        <p
          role="alert"
          className="rounded-none bg-[#ba1a1a]/10 border-2 border-[#ba1a1a] px-3 py-2 text-xs font-mono text-[#ba1a1a] text-center font-bold"
        >
          {error}
        </p>
      )}
    </div>
  );
};

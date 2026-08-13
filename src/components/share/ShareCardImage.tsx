'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  shareId: string;
  initialImageUrl: string;
}

export const ShareCardImage: React.FC<Props> = ({ shareId, initialImageUrl }) => {
  const [imgSrc, setImgSrc] = useState<string>(initialImageUrl);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if client has local cached image data for this share ID or latest build
    try {
      const cachedImage = localStorage.getItem(`hh-mark-${shareId}`) || localStorage.getItem('hh-latest-builder-mark');
      if (cachedImage) {
        setImgSrc(cachedImage);
      }
    } catch {}
  }, [shareId]);

  const handleError = () => {
    // Fallback to latest local storage or API URL
    try {
      const latestImage = localStorage.getItem('hh-latest-builder-mark');
      if (latestImage && imgSrc !== latestImage) {
        setImgSrc(latestImage);
        return;
      }
    } catch {}
    setImgSrc(`/api/share?id=${shareId}`);
  };

  return (
    <div className="relative w-full max-w-xl bg-[#111827] p-2 border-2 border-[#111827] shadow-brutal-lg overflow-hidden flex items-center justify-center min-h-[320px]">
      <img
        src={imgSrc}
        alt="Hacker House Goa 2026 Graphic"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={`w-full h-auto object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-50 blur-sm' : 'opacity-100'
        }`}
      />
    </div>
  );
};

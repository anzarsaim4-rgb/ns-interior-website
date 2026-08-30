'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  location?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Execution',
  afterLabel = 'After Completion',
  title,
  location,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {title && (
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center text-xs">
          <div className="font-bold text-white text-sm">{title}</div>
          {location && <div className="text-amber-400 font-semibold">{location}</div>}
        </div>
      )}

      <div
        className="relative h-64 sm:h-80 md:h-96 select-none cursor-ew-resize overflow-hidden"
        onMouseMove={handleSliderMove}
        onTouchMove={handleSliderMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            className="object-cover"
          />
          <span className="absolute bottom-3 right-3 bg-emerald-600/90 text-white font-bold text-xs px-2.5 py-1 rounded-md shadow">
            {afterLabel}
          </span>
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-0 h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              className="object-cover"
            />
          </div>
          <span className="absolute bottom-3 left-3 bg-slate-900/90 text-amber-400 font-bold text-xs px-2.5 py-1 rounded-md shadow border border-amber-500/30 z-10">
            {beforeLabel}
          </span>
        </div>

        {/* Divider Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-400 cursor-ew-resize z-10 shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shadow-xl border-2 border-slate-900">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadGallery = async () => {
    try {
      const response = await fetch('/api/gallery', {
        cache: 'no-store',
      });

      const data = await response.json();

      setImages(data.images || []);
    } catch {
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
          Gallery
        </p>

        <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
          Our Completed Interior Work
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Explore our completed residential and commercial interior projects.
        </p>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center text-sm text-slate-400">
          Loading gallery...
        </div>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/60 p-10 text-center">
          <p className="text-lg font-semibold text-white">
            No project photos uploaded yet.
          </p>

          <p className="mt-2 text-sm text-slate-400">
            Our latest completed interior projects will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_20px_40px_rgba(2,6,23,0.35)] transition duration-300 hover:-translate-y-1 hover:border-amber-500/60"
            >
              <div className="overflow-hidden">
                <img
                  src={src}
                  alt={`Completed interior project ${index + 1}`}
                  loading="lazy"
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
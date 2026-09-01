'use client';

import { useEffect, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { Maximize2 } from 'lucide-react';

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const loadGallery = async () => {
    try {
      const response = await fetch('/api/gallery', {
        cache: 'no-store',
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Unable to load gallery');
      }

      setImages(data.images || []);
      setErrorMessage('');
    } catch (error) {
      setImages([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load gallery.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const slides = images.map((src) => ({ src }));

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
          Explore our completed residential and commercial interior projects. Tap any image for fullscreen HD zoom.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
          {errorMessage}
        </div>
      )}

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
              onClick={() => setLightboxIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-[0_20px_40px_rgba(2,6,23,0.35)] transition duration-300 hover:-translate-y-1 hover:border-amber-500/60"
            >
              <div className="overflow-hidden relative">
                <img
                  src={src}
                  alt={`Completed interior project ${index + 1}`}
                  loading="lazy"
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-lg backdrop-blur-sm">
                    <Maximize2 className="h-3.5 w-3.5" />
                    View HD
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen HD Lightbox Modal with Zoom & Thumbnails */}
      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Thumbnails]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.5,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
        }}
        thumbnails={{
          position: 'bottom',
          width: 90,
          height: 60,
          border: 2,
          borderRadius: 8,
          padding: 4,
          gap: 12,
        }}
      />
    </div>
  );
}
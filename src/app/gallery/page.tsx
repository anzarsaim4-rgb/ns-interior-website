'use client';

import { useEffect, useMemo, useState } from 'react';

export default function AdminGalleryPage() {
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadMessage, setUploadMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const fileCountLabel = useMemo(() => {
    if (!selectedFiles.length) {
      return 'No files selected';
    }

    return `${selectedFiles.length} file${
      selectedFiles.length > 1 ? 's' : ''
    } selected`;
  }, [selectedFiles]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFiles(Array.from(event.target.files || []));
    setUploadMessage('');
    setErrorMessage('');
  };

  const handleUpload = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedFiles.length) {
      setErrorMessage('Please select at least one image.');
      return;
    }

    setIsUploading(true);
    setUploadMessage('Uploading project photos...');
    setErrorMessage('');

    const formData = new FormData();

    selectedFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Upload failed');
      }

      setImages(data.images || []);
      setSelectedFiles([]);
      setUploadMessage(
        'Project photos uploaded successfully.'
      );

      event.currentTarget.reset();
    } catch (error) {
      setUploadMessage('');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to upload photos.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageUrl: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this project photo?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setErrorMessage('');
      setUploadMessage('');

      const response = await fetch(
        `/api/gallery?url=${encodeURIComponent(imageUrl)}`,
        {
          method: 'DELETE',
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Delete failed');
      }

      setImages(data.images || []);
      setUploadMessage(
        'Project photo deleted successfully.'
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to delete image.'
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Admin Gallery
          </p>

          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Manage Interior Projects
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Upload and delete completed residential and commercial project photos.
          </p>
        </div>

        <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.4)] backdrop-blur-sm">
          <form onSubmit={handleUpload} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  Upload Project Photos
                </p>

                <p className="text-xs text-slate-400">
                  Add completed residential or commercial work
                </p>
              </div>

              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">
                Admin Only
              </span>
            </div>

            <label className="block">
              <span className="sr-only">
                Choose project photos
              </span>

              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="block w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3 text-sm text-slate-200 shadow-inner file:mr-3 file:rounded-md file:border-0 file:bg-amber-500 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-950 file:cursor-pointer"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs text-slate-400">
                {fileCountLabel}
              </span>

              <button
                type="submit"
                disabled={
                  isUploading || !selectedFiles.length
                }
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md transition hover:from-amber-400 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploading
                  ? 'Uploading...'
                  : 'Upload Project Photos'}
              </button>
            </div>

            {uploadMessage && (
              <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300">
                {uploadMessage}
              </div>
            )}

            {errorMessage && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
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
            Upload your completed interior projects above.
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

              <button
                type="button"
                onClick={() => handleDelete(src)}
                className="absolute right-3 top-3 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-red-500/60 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Before & After Transformation Showcase | N.S. INTERIOR',
  description: 'Compare raw civil site conditions vs finished interior execution by N.S. INTERIOR across Mumbai, Mumbra, and Thane.',
};

export default function BeforeAfterPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
          Visual Execution Proof
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Before & After Showcase
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Interactive slider showing actual site conditions before execution and final delivered output by N.S. INTERIOR.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <BeforeAfterSlider
          title="Living Room & False Ceiling Overhaul"
          location="Thane West"
          beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
          afterImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
          beforeLabel="Raw Brick & Cement Site"
          afterLabel="Finished Living Room"
        />

        <BeforeAfterSlider
          title="Modular Kitchen Renovation"
          location="Mumbra"
          beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
          afterImage="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
          beforeLabel="Old Platform Setup"
          afterLabel="Acrylic Modular Kitchen"
        />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white">Want to Transform Your Space?</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Book a site visit for direct physical inspection and exact scope planning.
        </p>
        <Link
          href="/enquiry"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs"
        >
          <span>Schedule Site Visit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

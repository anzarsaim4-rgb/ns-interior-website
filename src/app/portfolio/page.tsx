import React from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Layers, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Portfolio & Completed Projects | N.S. INTERIOR',
  description: 'View portfolio showcase of interior execution projects by N.S. INTERIOR in Mumbai, Mumbra, and Thane. Real site work and execution examples.',
};

export default function PortfolioPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
          Work Showcase
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Completed Projects & Portfolio
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          N.S. INTERIOR takes pride in direct on-site execution. Real completed projects added directly by our master contractor.
        </p>
      </div>

      {/* Portfolio Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: 'Modern 2 BHK Turnkey Flat Execution',
            location: 'Thane West',
            type: 'Residential Apartment',
            services: ['Modular Kitchen', 'False Ceiling', 'Wardrobe', 'Painting'],
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          },
          {
            title: 'Acrylic Modular Kitchen Overhaul',
            location: 'Mumbra',
            type: 'Kitchen Renovation',
            services: ['Modular Kitchen', 'Tile Work', 'Plumbing'],
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
          },
          {
            title: 'Corporate Office Fit-out & Glass Partitioning',
            location: 'Mumbai (Andheri East)',
            type: 'Commercial Office',
            services: ['Office Interior', 'Gypsum Work', 'Electrical', 'Painting'],
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
          },
        ].map((proj, idx) => (
          <div
            key={idx}
            className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all group flex flex-col justify-between"
          >
            <div className="relative h-56 bg-slate-950 overflow-hidden">
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-amber-500/30">
                {proj.type}
              </span>
            </div>

            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{proj.location}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {proj.title}
                </h3>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex flex-wrap gap-1">
                  {proj.services.map((s, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link
                  href="/enquiry"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition-all"
                >
                  <span>Enquire Similar Execution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

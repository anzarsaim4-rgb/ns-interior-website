import React from 'react';
import Link from 'next/link';
import { ALL_SERVICES } from '@/lib/constants';
import { ArrowRight, CheckCircle2, Hammer, Home, Building2, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Interior Execution Services | N.S. INTERIOR Mumbai, Mumbra, Thane',
  description: 'Explore all 21 specialized interior execution services including modular kitchens, false ceilings, carpenter work, painting, electrical, plumbing, and full home renovation.',
};

export default function ServicesPage() {
  const categories = [
    { key: 'core', label: 'Core Execution Services', icon: Hammer },
    { key: 'residential', label: 'Residential Execution', icon: Home },
    { key: 'commercial', label: 'Commercial & Office Execution', icon: Building2 },
    { key: 'renovation', label: 'Renovation & Overhaul', icon: Wrench },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
          21 Specialized Execution Services
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Interior Execution & Contracting Services
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          N.S. INTERIOR delivers complete direct-execution services across Mumbai, Mumbra, and Thane. Select any service below to review full scope, highlights, and process.
        </p>
      </div>

      {/* Services Grouped by Category */}
      <div className="space-y-12">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const filtered = ALL_SERVICES.filter((s) => s.category === cat.key);
          if (filtered.length === 0) return null;

          return (
            <div key={cat.key} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                  <Icon className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {cat.label}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((srv) => (
                  <Link
                    key={srv.slug}
                    href={`/services/${srv.slug}`}
                    className="bg-slate-900 border border-slate-800 hover:border-amber-500/50 p-6 rounded-2xl transition-all space-y-4 group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {srv.name}
                        </h3>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {srv.shortDesc}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-950">
                      {srv.highlights.slice(0, 3).map((hl, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

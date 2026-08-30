import React from 'react';
import Link from 'next/link';
import { BUSINESS_INFO } from '@/lib/constants';
import { MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Interior Service Areas | Mumbai, Mumbra, Thane | N.S. INTERIOR',
  description: 'N.S. INTERIOR provides direct interior execution services across Mumbai, Mumbra, Thane, and nearby suburbs.',
};

export default function ServiceAreasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
          Execution Regions
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Service Locations & Coverage
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          N.S. INTERIOR provides active site supervision and direct execution across Mumbai, Mumbra, Thane, and nearby locations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BUSINESS_INFO.primaryLocations.map((loc) => (
          <div
            key={loc}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-4 hover:border-amber-500/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center border border-amber-500/20">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">{loc}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full turnkey interior execution, modular kitchen fitting, custom woodwork, ceiling work, and home renovation in {loc}.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <Link
                href={`/service-areas/${loc.toLowerCase()}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold py-3 rounded-xl text-xs transition-all"
              >
                <span>View {loc} Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

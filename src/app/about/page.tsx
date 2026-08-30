import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import { BUSINESS_INFO } from '@/lib/constants';
import { ShieldCheck, Hammer, Clock, Phone, MessageSquare, Award, CheckCircle2, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'About N.S. INTERIOR | 7+ Years Execution Experience',
  description: 'Learn about N.S. INTERIOR, an interior execution and contracting specialist serving Mumbai, Mumbra, and Thane with direct site supervision.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <ShieldCheck className="w-4 h-4" />
          <span>7+ Years of Master Execution</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          About N.S. INTERIOR
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          N.S. INTERIOR is an interior execution and contracting business with over 7 years of hands-on site experience serving Mumbai, Mumbra, Thane, and nearby locations.
        </p>
      </div>

      {/* Profile & Positioning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-slate-900 border border-slate-800 rounded-3xl p-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Direct Execution — No Middlemen, No Hidden Commissions
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Unlike design studios that outsource actual execution work to third-party subcontractors with high markups, N.S. INTERIOR operates on a direct contracting model.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Led by experienced contractor <strong>Naushad</strong>, our dedicated team of carpenters, masons, electricians, plumbers, and painters carry out every stage of execution under active daily site supervision.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-semibold text-slate-200">On-Site Supervision</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-semibold text-slate-200">Quality Finishing</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-amber-400 uppercase tracking-wider text-xs">
            Verified Business Strengths
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {BUSINESS_INFO.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Target Customers */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">
          Who We Serve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-amber-400">Residential Clients</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Complete turnkey interior execution and renovation for 1 BHK, 2 BHK, 3 BHK, 4 BHK+ apartments, and villas.
            </p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-amber-400">Commercial Clients</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Interior fit-outs, partitions, ceiling grid work, and custom furniture for Offices, Retail Shops, Restaurants, and Commercial spaces.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-3xl p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Need Professional Execution for Your Project?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Contact N.S. INTERIOR today for site measurement, physical laminate samples, and a transparent cost estimate.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call {BUSINESS_INFO.formattedPhone}</span>
          </a>
          <Link
            href="/enquiry"
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-xl text-xs border border-slate-700"
          >
            Book Free Site Visit
          </Link>
        </div>
      </div>
    </div>
  );
}

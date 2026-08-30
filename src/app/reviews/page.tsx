import React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, CheckCircle2, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export const metadata = {
  title: 'Client Reviews & Feedback | N.S. INTERIOR',
  description: 'Read client feedback and execution testimonials for N.S. INTERIOR across Mumbai, Mumbra, and Thane.',
};

export default function ReviewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
          Client Satisfaction & Feedback
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Client Experience & Reviews
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          At N.S. INTERIOR, our business is built on direct execution quality, finishing standards, transparent labour costs, and clean work management.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <ShieldCheck className="w-8 h-8 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Direct Site Supervision</h3>
          <p className="text-xs text-slate-300">
            Every project is directly supervised on-site by senior contractor Naushad, ensuring quality execution without subcontractor shortcuts.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <CheckCircle2 className="w-8 h-8 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Transparent Pricing</h3>
          <p className="text-xs text-slate-300">
            Itemized material and labour specifications provided prior to work start. No hidden charges or unexpected mid-project price spikes.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
          <Star className="w-8 h-8 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Clean Work Management</h3>
          <p className="text-xs text-slate-300">
            Polite craftsman team, daily site debris cleanup, and careful protection of client flooring and property during execution.
          </p>
        </div>
      </div>

      {/* Real Review Submission Hook */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white">Completed a Project With Us?</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          We value genuine feedback from our clients in Mumbai, Mumbra, and Thane. Share your experience directly with contractor Naushad on WhatsApp.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20would%20like%20to%20share%20feedback%20on%20my%20completed%20interior%20project.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Share Feedback on WhatsApp</span>
          </a>

          <Link
            href="/enquiry"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
          >
            <span>Book New Site Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

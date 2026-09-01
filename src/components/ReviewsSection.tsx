'use client';

import React from 'react';
import { Star, MapPin, CheckCircle2, Quote } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  location: string;
  projectType: string;
  reviewText: string;
  rating: number;
  date: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    name: 'Mohammed Tariq Shaikh',
    location: 'Kausa, Mumbra',
    projectType: 'Full 2 BHK Turnkey Interior',
    reviewText:
      'Naushad bhai and team completed our 2 BHK interior work within 35 days. No hidden charges—pricing was completely transparent compared to design agencies. Plywood and laminate quality is top grade.',
    rating: 5,
    date: 'February 2026',
  },
  {
    id: '2',
    name: 'Rajesh Sharma',
    location: 'Majiwada, Thane West',
    projectType: 'Modular Kitchen & Wardrobes',
    reviewText:
      'Direct contractor execution is the best decision we made. Finish on the acrylic kitchen and soft-close channel fittings is showroom standard. Highly recommend N.S. INTERIOR for direct site execution.',
    rating: 5,
    date: 'January 2026',
  },
  {
    id: '3',
    name: 'Imran Ansari',
    location: 'Amrut Nagar, Mumbra',
    projectType: 'False Ceiling & Profile Lighting',
    reviewText:
      'Master craftsmanship in gypsum false ceiling and magnetic track lighting. Naushad Chaudhary personally managed on-site alignment and delivered before our family shifting date.',
    rating: 5,
    date: 'March 2026',
  },
  {
    id: '4',
    name: 'Pooja Kulkarni',
    location: 'Ghodbunder Road, Thane',
    projectType: '3 BHK Complete Renovation',
    reviewText:
      'Extremely polite and skilled carpentry team. Daily site updates on WhatsApp and flawless laminate pressing. Total peace of mind throughout the renovation.',
    rating: 5,
    date: 'April 2026',
  },
  {
    id: '5',
    name: 'Dr. Farhan Qureshi',
    location: 'Shilphata, Mumbai-Thane Link',
    projectType: 'Commercial Clinic & Waiting Lounge',
    reviewText:
      'Commercial execution needs speed and precision. N.S. INTERIOR executed partitions, acoustic panels, and reception desk flawlessly without disturbing the building premises.',
    rating: 5,
    date: 'May 2026',
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-12 sm:py-20 border-t border-slate-800 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Client Feedback
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Trusted by Homeowners Across Mumbai, Mumbra & Thane
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Real experiences from clients who chose direct contractor execution with N.S. INTERIOR over high middleman commissions.
          </p>
        </div>

        {/* Direct Grid Layout (Mobile Full Width Stacked + Desktop 3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="w-full bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 sm:space-y-5 transition duration-300 hover:-translate-y-1 shadow-xl relative"
            >
              <Quote className="absolute top-5 right-5 w-7 h-7 sm:w-8 sm:h-8 text-slate-800/80 pointer-events-none" />

              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Client Info & Tag */}
              <div className="pt-3 sm:pt-4 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-white">{review.name}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{review.date}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <span className="text-amber-400/90 font-medium flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {review.location}
                  </span>
                  <span className="text-slate-400 bg-slate-950 px-2 py-0.5 rounded text-[10px] border border-slate-800 font-semibold">
                    {review.projectType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
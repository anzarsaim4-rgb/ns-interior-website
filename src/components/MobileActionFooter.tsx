'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Calculator } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';

export default function MobileActionFooter() {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/98 backdrop-blur border-t border-slate-800 p-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20would%20like%20to%20enquire%20about%20interior%20execution.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors shadow-md"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        <Link
          href="/estimate-calculator"
          className="flex flex-col items-center justify-center py-2 px-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-lg transition-colors shadow-md"
        >
          <Calculator className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-extrabold">Get Estimate</span>
        </Link>
      </div>
    </div>
  );
}

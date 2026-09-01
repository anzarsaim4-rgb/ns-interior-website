'use client';

import React from 'react';
import { Phone, MessageSquare, CalendarCheck } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';
import Link from 'next/link';

export default function MobileStickyBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2.5 shadow-[0_-8px_20px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Direct Call Button */}
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex flex-col items-center justify-center bg-slate-900 active:bg-slate-800 text-slate-200 py-2 rounded-xl border border-slate-800 transition-colors"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Direct Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20want%20to%20enquire%20about%20interior%20execution.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center bg-emerald-600/90 active:bg-emerald-600 text-white py-2 rounded-xl shadow-md transition-colors"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Free Visit Enquiry Button */}
        <Link
          href="/enquiry"
          className="flex flex-col items-center justify-center bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-400 active:to-amber-500 text-slate-950 py-2 rounded-xl font-black shadow-md transition-all"
        >
          <CalendarCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] font-extrabold tracking-tight">Site Visit</span>
        </Link>

      </div>
    </div>
  );
}
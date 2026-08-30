import React from 'react';
import LeadForm from '@/components/LeadForm';
import { BUSINESS_INFO } from '@/lib/constants';
import { Phone, Mail, Instagram, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact & Free Consultation | N.S. INTERIOR',
  description: 'Book a free interior site visit and detailed quotation with N.S. INTERIOR. Direct contractor phone: 6391916867.',
};

export default function EnquiryPage({
  searchParams,
}: {
  searchParams?: { bhk?: string; area?: string };
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-3xl space-y-3">
        <span className="text-amber-400 text-xs font-bold uppercase tracking-wider block">
          Direct Contractor Handoff
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Contact & Free Consultation
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Request an on-site physical measurement visit in Mumbai, Mumbra, or Thane.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <h3 className="text-lg font-bold text-white uppercase tracking-wider text-xs border-b border-slate-800 pb-3">
            Verified Business Contacts
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone & WhatsApp</span>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="text-base font-bold text-amber-400 hover:underline flex items-center gap-2 mt-1"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                {BUSINESS_INFO.formattedPhone}
              </a>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email Address</span>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="text-slate-200 hover:text-amber-400 flex items-center gap-2 mt-1"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                {BUSINESS_INFO.email}
              </a>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Instagram Profile</span>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-200 hover:text-amber-400 flex items-center gap-2 mt-1"
              >
                <Instagram className="w-4 h-4 text-amber-400" />
                @{BUSINESS_INFO.instagram}
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Primary Areas: Mumbai, Mumbra, Thane</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Working Hours: Mon-Sun 9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <LeadForm
            initialBhk={searchParams?.bhk}
            initialArea={searchParams?.area ? Number(searchParams.area) : undefined}
          />
        </div>
      </div>
    </div>
  );
}

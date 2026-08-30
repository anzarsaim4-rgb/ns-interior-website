import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BUSINESS_INFO, ALL_SERVICES } from '@/lib/constants';
import { MapPin, Phone, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

interface ServiceAreaPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServiceAreaPageProps) {
  const locName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return {
    title: `Interior Contractor & Execution Services in ${locName} | N.S. INTERIOR`,
    description: `N.S. INTERIOR provides direct interior execution, modular kitchen, custom carpentry, false ceiling, and renovation in ${locName}. 7+ years experience.`,
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'mumbra' },
    { slug: 'thane' },
    { slug: 'mumbai' },
  ];
}

export default function ServiceAreaDetailPage({ params }: ServiceAreaPageProps) {
  const locName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <MapPin className="w-4 h-4" />
          <span>Primary Execution Region: {locName}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
          Interior Execution Services in {locName}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          N.S. INTERIOR is a trusted local interior execution contractor serving residential flats, villas, offices, and shops across {locName}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <ShieldCheck className="w-6 h-6 text-amber-400" />
          <h3 className="font-bold text-white">On-Site Supervision in {locName}</h3>
          <p className="text-xs text-slate-400">Continuous daily site management by senior contractor Naushad.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <CheckCircle2 className="w-6 h-6 text-amber-400" />
          <h3 className="font-bold text-white">Direct Contractor Rates</h3>
          <p className="text-xs text-slate-400">Transparent pricing with no design studio middleman markups.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <MapPin className="w-6 h-6 text-amber-400" />
          <h3 className="font-bold text-white">Fast Site Measurement Visit</h3>
          <p className="text-xs text-slate-400">Quick site visits with physical laminate & material catalogues.</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Execution Services Available in {locName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-amber-400 flex justify-between items-center"
            >
              <span>{s.name} in {locName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <LeadForm />
      </div>
    </div>
  );
}

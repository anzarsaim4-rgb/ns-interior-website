import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ALL_SERVICES, BUSINESS_INFO } from '@/lib/constants';
import { getServiceSchema, getBreadcrumbSchema } from '@/lib/seo';
import { CheckCircle2, ShieldCheck, Phone, MessageSquare, ArrowLeft, Layers, Wrench, Clock } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

interface ServicePageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ServicePageProps) {
  const service = ALL_SERVICES.find((s) => s.slug === params.slug);
  if (!service) return {};

  return {
    title: `${service.name} Execution & Services in Mumbai, Mumbra, Thane | N.S. INTERIOR`,
    description: `${service.fullDesc} Professional contracting and direct execution by N.S. INTERIOR with 7+ years experience.`,
    alternates: {
      canonical: `https://nsinterior.in/services/${service.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = ALL_SERVICES.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const serviceSchema = getServiceSchema(service.slug);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://nsinterior.in' },
    { name: 'Services', url: 'https://nsinterior.in/services' },
    { name: service.name, url: `https://nsinterior.in/services/${service.slug}` },
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Back Link */}
      <div>
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-xs text-amber-400 hover:underline font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All 21 Services</span>
        </Link>
      </div>

      {/* Service Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Contractor Execution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            {service.name} Services
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {service.fullDesc}
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Key Execution Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {service.highlights.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Process Steps */}
          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold text-white">Our Service Execution Process</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-extrabold block text-sm">Step 1</span>
                <strong className="text-white block">Site Measurement</strong>
                <p className="text-slate-400">On-site physical inspection, layout assessment, and material consultation.</p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-extrabold block text-sm">Step 2</span>
                <strong className="text-white block">Quotation & Scope</strong>
                <p className="text-slate-400">Itemized quotation breakdown with clear timeline and material specifications.</p>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-extrabold block text-sm">Step 3</span>
                <strong className="text-white block">Direct Execution</strong>
                <p className="text-slate-400">Skilled craftsman work under continuous daily site supervision by Naushad.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Call-out / Quick Contact */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white">Get {service.name} Quotation</h3>
            <p className="text-xs text-slate-400">
              Serving Mumbai, Mumbra, Thane and nearby areas with time commitment and clean finishing.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-4 rounded-xl border border-slate-700"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Contractor: {BUSINESS_INFO.phone}</span>
            </a>

            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(service.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Embedded Lead Form with Preselected Service */}
      <div className="pt-8 max-w-4xl mx-auto">
        <LeadForm initialServices={[service.slug]} />
      </div>
    </div>
  );
}

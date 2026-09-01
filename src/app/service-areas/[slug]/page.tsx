import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BUSINESS_INFO, ALL_SERVICES } from '@/lib/constants';
import { MapPin, Phone, MessageSquare, ShieldCheck, CheckCircle2, ArrowRight, HelpCircle, Star, Hammer } from 'lucide-react';
import LeadForm from '@/components/LeadForm';

interface ServiceAreaPageProps {
  params: { slug: string };
}

const LOCAL_AREAS_DATA: Record<string, {
  name: string;
  tagline: string;
  pincodes: string;
  keyLocalities: string[];
  faqs: { q: string; a: string }[];
}> = {
  mumbra: {
    name: 'Mumbra',
    tagline: 'Direct Interior Contractor & Carpentry Execution in Kausa, Amrut Nagar & Shilphata',
    pincodes: '400612',
    keyLocalities: ['Kausa Talaw Pali Road', 'Amrut Nagar', 'Tanwar Nagar', 'Shilphata Link Road', 'Dosti Planet North', 'MM Valley', 'Kausa Bypass'],
    faqs: [
      {
        q: 'How fast can N.S. INTERIOR visit my site in Mumbra?',
        a: 'Since our head workshop and office are located at Tihama Complex, Kausa Mumbra, Naushad Chaudhary and our senior team can visit your site within 1 to 2 hours with material samples and catalogues.',
      },
      {
        q: 'Do you provide direct carpenter contractor rates in Mumbra?',
        a: 'Yes, 100% direct contractor execution with zero middleman or agency commission. You pay strictly for actual materials and skilled craftsmanship.',
      },
    ],
  },
  thane: {
    name: 'Thane',
    tagline: 'Premium Turnkey Interior Contracting & Modular Kitchens in Thane West & East',
    pincodes: '400601, 400607, 400615',
    keyLocalities: ['Majiwada', 'Ghodbunder Road', 'Vartak Nagar', 'Hiranandani Estate', 'Kolshet Road', 'Panchpakhadi', 'Wagle Estate', 'Thane West'],
    faqs: [
      {
        q: 'Do you execute high-rise apartment interiors in Thane?',
        a: 'Yes, we regularly execute 1 BHK, 2 BHK, and 3 BHK turnkey projects across major residential towers in Majiwada, Ghodbunder Road, and Hiranandani Estate with full society work-hour compliance.',
      },
      {
        q: 'What material brands do you use for interiors in Thane?',
        a: 'We use premium waterproof marine ply (IS:710), Greenply, Century, Merino/Royal Touche laminates, and genuine Hafele/Hettich soft-close hardware fittings.',
      },
    ],
  },
  mumbai: {
    name: 'Mumbai',
    tagline: 'Turnkey Residential Renovation & Commercial Interior Execution across Mumbai Suburbs',
    pincodes: '400001 - 400099',
    keyLocalities: ['Bandra', 'Kurla', 'Ghatkopar', 'Powai', 'Andheri', 'Chembur', 'Mulund', 'Bhandup', 'Dadar'],
    faqs: [
      {
        q: 'How does N.S. INTERIOR manage turnkey projects in Mumbai?',
        a: 'We assign a dedicated on-site team led by Master Contractor Naushad Chaudhary, providing daily WhatsApp video/photo milestones, zero project delays, and factory-finish edge-banding execution.',
      },
      {
        q: 'Can I get a detailed itemized estimate for my Mumbai flat?',
        a: 'Yes, use our instant online estimate calculator or book a free physical measurement visit to receive a complete branded PDF quotation breakdown.',
      },
    ],
  },
};

export async function generateMetadata({ params }: ServiceAreaPageProps) {
  const locKey = params.slug.toLowerCase();
  const areaData = LOCAL_AREAS_DATA[locKey];
  const locName = areaData ? areaData.name : params.slug.charAt(0).toUpperCase() + params.slug.slice(1);

  return {
    title: `Best Interior Contractor in ${locName} | N.S. INTERIOR Execution`,
    description: `Direct interior contractor in ${locName}. Modular kitchens, custom carpentry, false ceilings, and turnkey 1/2/3 BHK flat renovations. Call +91 6391916867.`,
    keywords: [
      `interior contractor in ${locName}`,
      `carpenter in ${locName}`,
      `modular kitchen contractor ${locName}`,
      `turnkey interior ${locName}`,
      `false ceiling ${locName}`,
      `home renovation ${locName}`,
    ],
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
  const locKey = params.slug.toLowerCase();
  const areaData = LOCAL_AREAS_DATA[locKey] || {
    name: params.slug.charAt(0).toUpperCase() + params.slug.slice(1),
    tagline: `Direct Interior Contracting & Execution Services in ${params.slug}`,
    pincodes: 'Mumbai Metropolitan Region',
    keyLocalities: ['Central City', 'Suburbs', 'Residential Complexes'],
    faqs: [
      {
        q: `Do you provide interior execution in ${params.slug}?`,
        a: `Yes, N.S. INTERIOR provides complete turnkey interior contracting with senior on-site supervision in ${params.slug}.`,
      },
    ],
  };

  // Structured Data Schema for Local Search Bots
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `N.S. INTERIOR - Contractor in ${areaData.name}`,
    image: 'https://ns-interior-website.vercel.app/logo.png',
    telephone: '+916391916867',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tihama Complex, Kausa Talaw Pali Road',
      addressLocality: areaData.name,
      addressRegion: 'Maharashtra',
      postalCode: areaData.pincodes.split(',')[0],
      addressCountry: 'IN',
    },
    areaServed: areaData.name,
    description: areaData.tagline,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
          <MapPin className="w-4 h-4" />
          <span>Primary Execution Region: {areaData.name} (Pin: {areaData.pincodes})</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Interior Contractor & Execution in <span className="text-amber-400">{areaData.name}</span>
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {areaData.tagline}. Supervised directly by <strong>Naushad Chaudhary</strong> with 7+ years of hands-on carpentry, modular kitchen, and full home renovation expertise.
        </p>

        {/* Quick Contact Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call +91 6391916867</span>
          </a>
          <a
            href={`https://wa.me/916391916867?text=Hi%20Naushad%20bhai,%20I%20need%20interior%20execution%20work%20in%20${areaData.name}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>
      </div>

      {/* Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2 hover:border-amber-500/40 transition-colors">
          <ShieldCheck className="w-6 h-6 text-amber-400" />
          <h3 className="font-bold text-white text-base">On-Site Supervision in {areaData.name}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Daily site visits, zero delays, and personal master craftsmanship oversight by Naushad.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2 hover:border-amber-500/40 transition-colors">
          <CheckCircle2 className="w-6 h-6 text-amber-400" />
          <h3 className="font-bold text-white text-base">Zero Middleman Markup</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Direct contractor rates. Save up to 25% compared to commercial design studios.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2 hover:border-amber-500/40 transition-colors">
          <Hammer className="w-6 h-6 text-amber-400" />
          <h3 className="font-bold text-white text-base">Fast Physical Measurement</h3>
          <p className="text-xs text-slate-400 leading-relaxed">Quick site measurements with physical laminate samples, ply grades, and hardware catalogues.</p>
        </div>
      </div>

      {/* Localities Covered Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          <span>Local Areas Covered in {areaData.name}</span>
        </h3>
        <div className="flex flex-wrap gap-2 pt-1">
          {areaData.keyLocalities.map((loc) => (
            <span
              key={loc}
              className="bg-slate-950 text-slate-300 text-xs px-3 py-1.5 rounded-lg border border-slate-800 font-medium"
            >
              📍 {loc}
            </span>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Execution Services Available in {areaData.name}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-4 rounded-xl text-xs font-semibold text-slate-200 hover:text-amber-400 flex justify-between items-center transition-colors"
            >
              <span>{s.name} in {areaData.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ))}
        </div>
      </div>

      {/* Local SEO FAQs */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Frequently Asked Questions</span>
          <h2 className="text-2xl font-bold text-white">Interior Contracting in {areaData.name}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areaData.faqs.map((faq, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="max-w-4xl mx-auto pt-6">
        <LeadForm />
      </div>
    </div>
  );
}
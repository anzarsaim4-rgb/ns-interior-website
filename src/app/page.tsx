'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  BUSINESS_INFO,
  ALL_SERVICES,
} from '@/lib/constants';
import {
  ShieldCheck,
  Phone,
  MessageSquare,
  Calculator,
  ArrowRight,
  Hammer,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Star,
  Layers,
  Award,
} from 'lucide-react';
import LeadForm from '@/components/LeadForm';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import EstimateCalculator from '@/components/EstimateCalculator';
import ReviewsSection from '@/components/ReviewsSection';

const slideshowImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80',
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideshowImages.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-hidden">
      <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden">
        {slideshowImages.map((image, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={`${image}-${index}`}
              className={`absolute inset-0 w-full h-full transition-transform duration-[1500ms] ease-in-out ${
                isActive
                  ? 'translate-x-0 opacity-100 scale-100'
                  : '-translate-x-24 opacity-0 scale-100'
              }`}
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: index % 2 === 0 ? '50%' : '58%',
                backgroundPositionY: index % 3 === 0 ? '45%' : '50%',
                filter: 'saturate(1.08) contrast(1.04)',
              }}
            />
          );
        })}

        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(15, 23, 42, 0.12)',
          }}
        />
      </div>

      <div className="relative z-10 space-y-16 sm:space-y-24 pb-12">
        {/* HERO SECTION */}
        <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-center border-b border-slate-800/80 overflow-hidden py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
              {/* Left Hero Text */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 bg-slate-900/35 border border-amber-500/30 text-amber-200 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-[0_8px_24px_rgba(2,6,23,0.4)] backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">{BUSINESS_INFO.experienceYears} Years of Direct Interior Execution • Mumbai, Mumbra & Thane</span>
                </div>

                <h1 className="max-w-[12ch] text-3xl sm:max-w-none sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-[0_4px_18px_rgba(2,6,23,0.9)]">
                  Interior Execution <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 drop-shadow-[0_4px_18px_rgba(2,6,23,0.9)]">& Contracting</span>
                </h1>

                <div className="text-amber-300 font-bold text-base sm:text-lg tracking-wide drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">
                  Directly Supervised. Professionally Executed.
                </div>

                <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(2,6,23,0.7)]">
                  Specializing in <strong>Residential & Commercial Interiors</strong> across <strong>Mumbai, Mumbra & Thane</strong>. From modular kitchens and custom carpentry to false ceilings, painting, and turnkey home renovations — with zero middleman markups.
                </p>

                {/* Verified Strength Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="border border-white/20 bg-slate-900/40 p-2.5 rounded-xl text-xs flex items-center gap-2 backdrop-blur-md shadow-[0_8px_20px_rgba(2,6,23,0.22)]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-100 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">Direct Execution</span>
                  </div>
                  <div className="border border-white/20 bg-slate-900/40 p-2.5 rounded-xl text-xs flex items-center gap-2 backdrop-blur-md shadow-[0_8px_20px_rgba(2,6,23,0.22)]">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-100 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">Fast Completion</span>
                  </div>
                  <div className="border border-white/20 bg-slate-900/40 p-2.5 rounded-xl text-xs flex items-center gap-2 backdrop-blur-md shadow-[0_8px_20px_rgba(2,6,23,0.22)]">
                    <Hammer className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="font-semibold text-slate-100 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">On-Site Supervision</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Link
                    href="/enquiry"
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-6 py-3.5 rounded-xl text-sm sm:text-base transition-all shadow-xl flex items-center gap-2"
                  >
                    <span>Book Free Site Visit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3.5 rounded-xl text-sm transition-all border border-slate-800 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-400" />
                    <span>Call {BUSINESS_INFO.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20want%20to%20enquire%20about%20interior%20execution.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3.5 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Hero Card / Quick Lead Trigger */}
              <div className="lg:col-span-5">
                <div className="border border-white/20 bg-slate-900/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-[0_20px_40px_rgba(2,6,23,0.28)] backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">
                      Quick Consultation
                    </span>
                    <span className="text-[10px] text-slate-200 bg-slate-800/70 px-2 py-0.5 rounded border border-white/10 shadow-[0_4px_10px_rgba(2,6,23,0.25)]">
                      Mumbai • Mumbra • Thane
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">Planning Interior Work?</h3>
                  <p className="text-xs text-slate-200 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">
                    Get direct advice from master contractor <strong>Naushad</strong>. We provide on-site measurements, material samples, and fixed timeline commitments.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-slate-200 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>No middleman commission — direct contractor pricing</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-200 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>100% custom furniture, modular kitchen & ceilings</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-slate-200 drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>Clean work site management & polite team</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Link
                      href="/estimate-calculator"
                      className="w-full flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold py-3 px-4 rounded-xl text-xs border border-amber-500/30 transition-all"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Calculate Approximate Cost First →</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS STRENGTHS SECTION */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-[0_3px_12px_rgba(2,6,23,0.85)]">
              Why Home & Business Owners Choose <span className="text-amber-400 drop-shadow-[0_3px_12px_rgba(2,6,23,0.85)]">N.S. INTERIOR</span>
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm drop-shadow-[0_2px_10px_rgba(2,6,23,0.75)]">
              Our core business strengths built over 7+ years of hands-on interior contracting across Mumbai, Mumbra, and Thane.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUSINESS_INFO.strengths.map((strength, index) => (
              <div
                key={index}
                className="border border-white/20 bg-slate-900/35 hover:border-amber-500/40 p-6 rounded-2xl transition-all space-y-3 group backdrop-blur-md shadow-[0_12px_24px_rgba(2,6,23,0.2)]"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform shadow-[0_6px_16px_rgba(2,6,23,0.2)]">
                  0{index + 1}
                </div>
                <h3 className="font-bold text-white text-base leading-snug drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">{strength}</h3>
                <p className="text-xs text-slate-200 leading-relaxed drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">
                  Executed directly under senior supervision with high finishing standards and clean cleanup.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ALL 21 SERVICES SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-amber-300 text-xs font-extrabold uppercase tracking-wider block mb-1 drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">
                Complete Scope of Work
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-[0_3px_12px_rgba(2,6,23,0.85)]">
                Our Interior Execution Services
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1 drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]"
            >
              <span>View All 21 Verified Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_SERVICES.slice(0, 9).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="border border-white/20 bg-slate-900/35 hover:border-amber-500/50 p-6 rounded-2xl transition-all space-y-3 group block backdrop-blur-md shadow-[0_12px_24px_rgba(2,6,23,0.2)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800/80 text-amber-300 px-2.5 py-1 rounded border border-white/10">
                    {service.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">
                  {service.shortDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-1">
                  {service.highlights.slice(0, 2).map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-950/70 text-slate-200 px-2 py-0.5 rounded border border-white/10"
                    >
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ESTIMATE CALCULATOR TEASER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateCalculator />
        </section>

        {/* BEFORE & AFTER SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <span className="text-amber-300 text-xs font-extrabold uppercase tracking-wider block drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">
              Quality Finishing Proof
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-[0_3px_12px_rgba(2,6,23,0.85)]">
              Before & After Transformation
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm drop-shadow-[0_2px_10px_rgba(2,6,23,0.75)]">
              Drag the divider to compare raw civil site status vs finished execution by N.S. INTERIOR.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <BeforeAfterSlider
              title="Full Apartment Living Room Renovation"
              location="Thane West"
              beforeImage="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
              afterImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              beforeLabel="Raw Civil Site"
              afterLabel="Finished Living Room"
            />

            <BeforeAfterSlider
              title="Acrylic Modular Kitchen Transformation"
              location="Mumbra"
              beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
              afterImage="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
              beforeLabel="Old Kitchen Platform"
              afterLabel="Acrylic Modular Setup"
            />
          </div>

          <div className="text-center pt-6">
            <Link
              href="/before-and-after"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:underline"
            >
              <span>Explore All Before & After Cases</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* SERVICE AREAS SECTION */}
        <section className="border-y border-white/10 bg-slate-900/20 py-16 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[0_3px_12px_rgba(2,6,23,0.85)]">
                Primary Service Locations
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 drop-shadow-[0_2px_10px_rgba(2,6,23,0.75)]">
                We provide rapid on-site supervision and execution across Mumbai, Mumbra, Thane, and nearby suburbs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {BUSINESS_INFO.primaryLocations.map((loc) => (
                <div
                  key={loc}
                  className="border border-white/10 bg-slate-950/35 p-6 rounded-2xl space-y-3 text-center backdrop-blur-sm shadow-[0_10px_20px_rgba(2,6,23,0.15)]"
                >
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20 shadow-[0_6px_16px_rgba(2,6,23,0.2)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]">{loc}</h3>
                  <p className="text-xs text-slate-200 leading-relaxed drop-shadow-[0_1px_8px_rgba(2,6,23,0.8)]">
                    Full turnkey interior execution, site measurements, custom furniture making, and renovation services in {loc}.
                  </p>
                  <Link
                    href={`/service-areas/${loc.toLowerCase()}`}
                    className="inline-block text-xs font-bold text-amber-300 hover:underline pt-1 drop-shadow-[0_2px_10px_rgba(2,6,23,0.8)]"
                  >
                    View Services in {loc} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERIFIED CUSTOMER REVIEWS / TESTIMONIALS */}
        <ReviewsSection />

        {/* LEAD CAPTURE FORM SECTION */}
        <section id="enquire" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadForm />
        </section>
      </div>
    </div>
  );
}
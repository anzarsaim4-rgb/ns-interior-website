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
import MobileStickyBar from '@/components/MobileStickyBar';

const heroInteriorSlides = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85',
];

export default function HomePage() {
  const [activeSlide, setActiveSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroInteriorSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden pb-20 sm:pb-0">
      
      {/* 1. HERO SECTION WITH CLEAR & VIBRANT BACKGROUND WALLPAPER */}
      <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center border-b border-slate-800/80 overflow-hidden py-10 sm:py-20">
        
        {/* Background Slideshow */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          {heroInteriorSlides.map((image, index) => {
            const isActive = index === activeSlide;

            return (
              <div
                key={`${image}-${index}`}
                className={`absolute inset-0 w-full h-full transition-all duration-[2000ms] ease-out ${
                  isActive ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }`}
                style={{
                  backgroundImage: `url('${image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            );
          })}

          {/* Soft & Lightened Overlays for Maximum Wallpaper Visibility */}
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-slate-950/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/35" />
        </div>

        {/* Hero Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">
            
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-slate-950/35 border border-amber-500/40 text-amber-300 font-bold text-[11px] sm:text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                <span className="drop-shadow-sm">{BUSINESS_INFO.experienceYears} Years of Direct Interior Execution • Mumbai, Mumbra & Thane</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                Interior Execution <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">& Contracting</span>
              </h1>

              <div className="text-amber-300 font-bold text-sm sm:text-lg tracking-wide drop-shadow-md">
                Directly Supervised. Professionally Executed. Zero Middlemen.
              </div>

              <p className="text-slate-100 text-xs sm:text-base leading-relaxed max-w-2xl drop-shadow-md">
                Specializing in <strong>Residential & Commercial Interiors</strong> across <strong>Mumbai, Mumbra & Thane</strong>. From modular kitchens and custom carpentry to false ceilings, painting, and turnkey home renovations — with zero middleman markups.
              </p>

              {/* Verified Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2">
                <div className="border border-white/20 bg-slate-950/35 p-2 sm:p-3 rounded-xl text-[10px] sm:text-xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-left backdrop-blur-md shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-100">Direct Execution</span>
                </div>
                <div className="border border-white/20 bg-slate-950/35 p-2 sm:p-3 rounded-xl text-[10px] sm:text-xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-left backdrop-blur-md shadow-lg">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-100">Fast Completion</span>
                </div>
                <div className="border border-white/20 bg-slate-950/35 p-2 sm:p-3 rounded-xl text-[10px] sm:text-xs flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5 text-center sm:text-left backdrop-blur-md shadow-lg">
                  <Hammer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
                  <span className="font-semibold text-slate-100">On-Site Supervision</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2 sm:pt-4">
                <Link
                  href="/enquiry"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl text-xs sm:text-base transition-all shadow-xl flex items-center gap-2"
                >
                  <span>Book Free Site Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="bg-slate-950/50 hover:bg-slate-900 text-white font-bold px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all border border-white/20 backdrop-blur-md flex items-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20want%20to%20enquire%20about%20interior%20execution.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Consultation Card (Soft & Transparent Glassmorphism) */}
            <div className="lg:col-span-5">
              <div className="border border-white/20 bg-slate-950/35 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-xl space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
                  <span className="text-[11px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Quick Consultation
                  </span>
                  <span className="text-[10px] text-slate-200 bg-slate-900/80 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-white/10">
                    Mumbai • Mumbra • Thane
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-extrabold text-white">Planning Interior Work?</h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Get direct advice from master contractor <strong>Naushad Chaudhary</strong>. We provide on-site measurements, authentic material samples, and fixed timeline commitments.
                </p>

                <div className="space-y-2 sm:space-y-2.5 pt-1">
                  <div className="flex items-start gap-2 sm:gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>No middleman commission — direct contractor pricing</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>100% custom furniture, modular kitchen & ceilings</span>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>Clean work site management & polite team</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/estimate-calculator"
                    className="w-full flex items-center justify-center gap-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold py-2.5 sm:py-3 px-4 rounded-xl text-xs border border-amber-500/40 transition-all backdrop-blur-md"
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

      {/* 2. BODY CONTENT */}
      <div className="relative z-10 space-y-16 sm:space-y-28 py-12 sm:py-16">
        
        {/* BUSINESS STRENGTHS SECTION (Direct Grid Layout - 100% Width) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Why Home & Business Owners Choose <span className="text-amber-400">N.S. INTERIOR</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Our core business strengths built over 7+ years of hands-on interior contracting across Mumbai, Mumbra, and Thane.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {BUSINESS_INFO.strengths.map((strength, index) => (
              <div
                key={index}
                className="w-full border border-slate-850 bg-slate-900/70 hover:border-amber-500/40 p-5 sm:p-6 rounded-2xl transition-all space-y-3 group shadow-lg"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs sm:text-sm group-hover:scale-110 transition-transform">
                  0{index + 1}
                </div>
                <h3 className="font-bold text-white text-sm sm:text-base leading-snug">{strength}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Executed directly under senior supervision with high finishing standards and clean cleanup.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ALL 21 SERVICES SHOWCASE */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4">
            <div>
              <span className="text-amber-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider block mb-1">
                Complete Scope of Work
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Our Interior Execution Services
              </h2>
            </div>
            <Link
              href="/services"
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All 21 Verified Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {ALL_SERVICES.slice(0, 9).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="border border-slate-850 bg-slate-900/70 hover:border-amber-500/50 p-4 sm:p-6 rounded-2xl transition-all space-y-3 group block shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-950 text-amber-300 px-2.5 py-1 rounded border border-slate-800">
                    {service.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {service.shortDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-1">
                  {service.highlights.slice(0, 2).map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-850"
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
            <span className="text-amber-400 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider block">
              Quality Finishing Proof
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Before & After Transformation
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Drag the divider to compare raw civil site status vs finished execution by N.S. INTERIOR.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
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

          <div className="text-center pt-2 sm:pt-6">
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
        <section className="border-y border-slate-850 bg-slate-900/40 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Primary Service Locations
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                We provide rapid on-site supervision and execution across Mumbai, Mumbra, Thane, and nearby suburbs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {BUSINESS_INFO.primaryLocations.map((loc) => (
                <div
                  key={loc}
                  className="border border-slate-800 bg-slate-950/80 p-5 sm:p-6 rounded-2xl space-y-2.5 sm:space-y-3 text-center shadow-lg"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/20 shadow-md">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{loc}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Full turnkey interior execution, site measurements, custom furniture making, and renovation services in {loc}.
                  </p>
                  <Link
                    href={`/service-areas/${loc.toLowerCase()}`}
                    className="inline-block text-xs font-bold text-amber-400 hover:underline pt-1"
                  >
                    View Services in {loc} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VERIFIED CUSTOMER REVIEWS */}
        <ReviewsSection />

        {/* LEAD CAPTURE FORM SECTION */}
        <section id="enquire" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadForm />
        </section>

      </div>

      {/* 3. MOBILE FIXED 1-TAP STICKY BOTTOM BAR */}
      <MobileStickyBar />

    </div>
  );
}
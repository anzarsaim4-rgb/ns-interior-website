'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Menu, X, ChevronDown, ShieldCheck, Calculator } from 'lucide-react';
import { BUSINESS_INFO, ALL_SERVICES } from '@/lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-[0_0_35px_rgba(2,6,23,0.42)] text-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:border-white/15 lg:bg-slate-950/70 lg:backdrop-blur-2xl lg:shadow-[0_0_35px_rgba(2,6,23,0.5)]">
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-slate-950 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2 lg:hidden">
        <ShieldCheck className="w-4 h-4 text-slate-950 flex-shrink-0" />
        <span>
          7+ Years of Direct Interior Execution in <strong>Mumbai, Mumbra & Thane</strong>. No Middlemen.
        </span>
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="underline font-bold hover:text-slate-900 ml-1 hidden sm:inline"
        >
          Call: {BUSINESS_INFO.formattedPhone}
        </a>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-5 lg:h-full">
        <div className="flex items-center justify-between h-16 sm:h-20 lg:h-full lg:flex-col lg:items-stretch lg:justify-start lg:pt-4 lg:pb-6 lg:gap-5">
        <div className="lg:w-full">
      <Link
        href="/"
        className="flex items-center justify-center lg:justify-start group shrink-0 lg:mb-5 lg:px-3"
        aria-label="N.S. INTERIOR Home"
      >
        <img
          src="/32e32672-bcdb-4515-b3e2-a0eb7106e693.png"
          alt="N.S. INTERIOR"
          className="h-16 sm:h-20 lg:h-24 w-auto max-w-full object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </Link>
    </div>

          <div className="hidden lg:flex lg:flex-col lg:w-full lg:flex-1 lg:items-stretch lg:px-3">
            <nav className="space-y-2 text-sm font-medium">
              <Link href="/" className="flex items-center gap-3 rounded-xl border border-white/12 bg-slate-950/40 px-3 py-2.5 text-slate-100 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Home</span>
              </Link>
              <Link href="/about" className="flex items-center gap-3 rounded-xl border border-white/12 bg-slate-950/40 px-3 py-2.5 text-slate-100 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>About Us</span>
              </Link>

              <div className="relative group">
                <Link
                  href="/services"
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/12 bg-slate-950/40 px-3 py-2.5 text-slate-100 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 backdrop-blur-md"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Services</span>
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
                </Link>
                <div className="absolute left-0 top-full z-50 mt-2 w-72 rounded-xl border border-white/12 bg-slate-950/80 p-4 shadow-[0_18px_35px_rgba(2,6,23,0.45)] opacity-0 invisible transition-all duration-200 backdrop-blur-xl group-hover:visible group-hover:opacity-100">
                  <div className="mb-2 border-b border-white/10 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-400">
                    All 21 Execution Services
                  </div>
                  {ALL_SERVICES.slice(0, 10).map((srv) => (
                    <Link
                      key={srv.slug}
                      href={`/services/${srv.slug}`}
                      className="block rounded-md px-2 py-1.5 text-xs text-slate-200 transition-colors hover:bg-white/5 hover:text-amber-300"
                    >
                      {srv.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="mt-2 block border-t border-white/10 pt-2 text-center text-xs font-bold text-amber-400 hover:underline"
                  >
                    View All 21 Services →
                  </Link>
                </div>
              </div>

              <Link href="/gallery" className="flex items-center gap-3 rounded-xl border border-white/12 bg-slate-950/40 px-3 py-2.5 text-slate-100 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Gallery</span>
              </Link>
              <Link href="/portfolio" className="flex items-center gap-3 rounded-xl border border-white/12 bg-slate-950/40 px-3 py-2.5 text-slate-100 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Portfolio</span>
              </Link>
              <Link href="/before-and-after" className="flex items-center gap-3 rounded-xl border border-white/12 bg-slate-950/40 px-3 py-2.5 text-slate-100 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Before & After</span>
              </Link>
              <Link href="/service-areas" className="flex items-center gap-3 rounded-xl border border-white/12 bg-slate-950/40 px-3 py-2.5 text-slate-100 transition-all hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Service Areas</span>
              </Link>
            </nav>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
              <Link
                href="/estimate-calculator"
                className="flex items-center gap-2 rounded-xl border border-amber-500/35 bg-amber-500/10 px-3 py-2.5 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-500/15 backdrop-blur-md"
              >
                <Calculator className="w-3.5 h-3.5" />
                Calculator
              </Link>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="flex items-center gap-2 rounded-xl border border-white/12 bg-slate-900/35 px-3 py-2.5 text-xs font-semibold text-slate-100 transition-colors hover:border-slate-500/60 hover:text-white backdrop-blur-md"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{BUSINESS_INFO.formattedPhone}</span>
              </a>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20want%20to%20enquire%20about%20interior%20work.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-emerald-600/90 px-3 py-2.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-emerald-500 backdrop-blur-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <Link
                href="/enquiry"
                className="block rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-2.5 text-center text-xs font-bold text-slate-950 shadow-md transition-all hover:from-amber-400 hover:to-amber-500"
              >
                Book Site Visit
              </Link>
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <Link
              href="/enquiry"
              className="text-xs font-bold bg-amber-500 text-slate-950 px-3 py-1.5 rounded-md"
            >
              Enquire
            </Link>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-slate-200 hover:text-white rounded-lg border border-white/10 bg-slate-900/50 transition-all hover:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-b border-slate-800/80 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3 shadow-[0_18px_30px_rgba(2,6,23,0.35)] backdrop-blur-xl">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-slate-800"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-slate-800"
          >
            About N.S. INTERIOR
          </Link>
          <Link
            href="/gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-slate-800"
          >
            Gallery
          </Link>

          <div>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full flex items-center justify-between py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-slate-800"
            >
              <span>Services (21 Available)</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && (
              <div className="pl-4 py-2 space-y-2 bg-slate-950/50 rounded-lg my-2 max-h-60 overflow-y-auto">
                {ALL_SERVICES.map((srv) => (
                  <Link
                    key={srv.slug}
                    href={`/services/${srv.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-sm text-slate-300 hover:text-amber-400 py-1"
                  >
                    • {srv.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-slate-800"
          >
            Portfolio & Projects
          </Link>
          <Link
            href="/before-and-after"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-slate-800"
          >
            Before & After Showcase
          </Link>
          <Link
            href="/service-areas"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400 border-b border-slate-800"
          >
            Service Areas (Mumbai, Thane, Mumbra)
          </Link>
          <Link
            href="/estimate-calculator"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-bold text-amber-400 border-b border-slate-800"
          >
            Estimate Calculator
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-slate-200 hover:text-amber-400"
          >
            Contact Details
          </Link>

          <div className="pt-4 grid grid-cols-2 gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 bg-slate-800 text-white font-bold py-2.5 rounded-lg text-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call Now
            </a>
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hi%20N.S.%20INTERIOR,%20I%20want%20to%20enquire%20about%20interior%20work.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-2.5 rounded-lg text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

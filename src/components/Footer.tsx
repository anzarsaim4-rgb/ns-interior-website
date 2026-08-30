import React from 'react';
import Link from 'next/link';
import { Phone, Mail, Instagram, MapPin, Shield, Clock, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO, ALL_SERVICES } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-24 lg:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Business Branding & Strengths */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl">
                NS
              </div>
              <div>
                <div className="font-bold text-xl text-white">N.S. INTERIOR</div>
                <div className="text-xs text-amber-400 font-medium tracking-wider uppercase">
                  Execution & Contracting
                </div>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-300">
              N.S. INTERIOR is a dedicated interior execution and contracting specialist with 7+ years of experience delivering high-quality finishing, custom woodwork, modular kitchens, and turnkey transformations across Mumbai, Mumbra, and Thane.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Direct Site Supervision & Execution</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Time-Committed Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Transparent & Reasonable Labour Rates</span>
              </div>
            </div>
          </div>

          {/* Col 2: Featured Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Execution Services
            </h3>
            <ul className="space-y-2 text-xs">
              {ALL_SERVICES.slice(0, 8).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-amber-500/60">•</span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-amber-400 font-semibold hover:underline">
                  View All 21 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Areas & Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Primary Service Locations
            </h3>
            <ul className="space-y-2 text-xs mb-6">
              {BUSINESS_INFO.primaryLocations.map((loc) => (
                <li key={loc}>
                  <Link
                    href={`/service-areas/${loc.toLowerCase()}`}
                    className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Interior Services in {loc}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-amber-500 pl-2">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/about" className="hover:text-amber-400">About Us</Link>
              <Link href="/portfolio" className="hover:text-amber-400">Portfolio</Link>
              <Link href="/before-and-after" className="hover:text-amber-400">Before & After</Link>
              <Link href="/reviews" className="hover:text-amber-400">Client Reviews</Link>
              <Link href="/estimate-calculator" className="hover:text-amber-400">Calculator</Link>
              <Link href="/enquiry" className="hover:text-amber-400">Free Site Visit</Link>
            </div>
          </div>

          {/* Col 4: Verified Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Direct Contact
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone & WhatsApp</span>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="text-base font-bold text-amber-400 hover:underline flex items-center gap-2 mt-0.5"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  {BUSINESS_INFO.formattedPhone}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-slate-200 hover:text-amber-400 flex items-center gap-2 mt-0.5"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  {BUSINESS_INFO.email}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Instagram</span>
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-amber-400 flex items-center gap-2 mt-0.5"
                >
                  <Instagram className="w-4 h-4 text-amber-400" />
                  @{BUSINESS_INFO.instagram}
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/admin/login"
                  className="inline-block text-[11px] text-slate-400 hover:text-amber-400 underline"
                >
                  Admin Portal Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} N.S. INTERIOR. All Rights Reserved. Interior Execution & Contracting Services.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

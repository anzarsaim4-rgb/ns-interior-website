'use client';

import React, { useState, useMemo } from 'react';
import { calculateEstimate, DEFAULT_RATES, QUALITY_MULTIPLIERS } from '@/lib/estimate';
import { BHK_OPTIONS, PROPERTY_TYPES } from '@/lib/constants';
import { Calculator, AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

export default function EstimateCalculator() {
  const [propertyType, setPropertyType] = useState('Residential Apartment');
  const [bhk, setBhk] = useState('2 BHK');
  const [approxArea, setApproxArea] = useState<number>(850);
  const [qualityFinish, setQualityFinish] = useState<'essential' | 'standard' | 'premium'>('standard');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'modular-kitchen',
    'wardrobe',
    'false-ceiling',
    'painting',
  ]);

  const result = useMemo(() => {
    return calculateEstimate({
      propertyType,
      bhk,
      approxAreaSqFt: Number(approxArea) || 850,
      selectedServices,
      qualityFinish,
    });
  }, [propertyType, bhk, approxArea, selectedServices, qualityFinish]);

  const toggleService = (slug: string) => {
    if (selectedServices.includes(slug)) {
      if (selectedServices.length === 1) return; // keep at least 1
      setSelectedServices(selectedServices.filter((s) => s !== slug));
    } else {
      setSelectedServices([...selectedServices, slug]);
    }
  };

  const formatRupees = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-2xl space-y-8">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-2">
            <Calculator className="w-4 h-4" />
            Configurable Rate Card Model
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Approximate Interior Estimate Calculator
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Select your space size and service scope to generate an instant budget range for Mumbai, Mumbra & Thane execution.
          </p>
        </div>
      </div>

      {/* Mandatory High-Visibility Disclaimer */}
      <div className="bg-amber-950/60 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-200 leading-relaxed space-y-1">
          <strong className="block font-bold text-amber-300 uppercase tracking-wide">
            Notice: Approximate Estimate Disclaimer
          </strong>
          <p>{result.disclaimer}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Property Type & BHK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {PROPERTY_TYPES.map((pt) => (
                  <option key={pt} value={pt}>
                    {pt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                BHK / Property Size
              </label>
              <select
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {BHK_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Area Slider */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300">Carpet / Built-up Area</span>
              <span className="font-extrabold text-amber-400 text-sm">{approxArea} Sq.Ft.</span>
            </div>
            <input
              type="range"
              min={300}
              max={3000}
              step={50}
              value={approxArea}
              onChange={(e) => setApproxArea(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>300 sq.ft</span>
              <span>1500 sq.ft</span>
              <span>3000 sq.ft</span>
            </div>
          </div>

          {/* Scope / Finish Quality Level */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Quality & Finish Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'essential', label: 'Essential', desc: 'Standard Laminate & Hardware' },
                { id: 'standard', label: 'Standard', desc: 'Premium Marine Ply & Soft Close' },
                { id: 'premium', label: 'Premium', desc: 'Acrylic/PU, Quartz & Italian Polish' },
              ].map((q) => (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => setQualityFinish(q.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    qualityFinish === q.id
                      ? 'bg-amber-500/20 border-amber-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{q.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{q.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Service Scope Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">
              Select Execution Scope (Toggle Services)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(DEFAULT_RATES).map(([slug, info]) => {
                const isChecked = selectedServices.includes(slug);
                return (
                  <button
                    type="button"
                    key={slug}
                    onClick={() => toggleService(slug)}
                    className={`p-2.5 rounded-xl border text-xs text-left flex items-center justify-between transition-all ${
                      isChecked
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate pr-1">{info.name}</span>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Box (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-400 border-b border-slate-800 pb-2">
              Calculated Budget Range
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatRupees(result.minTotal)} - {formatRupees(result.maxTotal)}
              </div>
              <p className="text-[11px] text-slate-400">
                Estimated execution range for <strong>{approxArea} Sq.Ft ({bhk})</strong> at {qualityFinish.toUpperCase()} finish level.
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 mb-1">
                Estimated Service Breakdown:
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {result.breakdown.map((item) => (
                  <div
                    key={item.serviceSlug}
                    className="flex justify-between text-xs py-1 border-b border-slate-900"
                  >
                    <span className="text-slate-300 font-medium">{item.serviceName}</span>
                    <span className="text-slate-400 font-mono">
                      {formatRupees(item.minCost)} - {formatRupees(item.maxCost)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <Link
              href={`/enquiry?area=${approxArea}&bhk=${encodeURIComponent(bhk)}`}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3.5 px-4 rounded-xl text-sm transition-all shadow-xl"
            >
              <span>Request Site Visit with This Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[10px] text-slate-400 text-center">
              Our master contractor will bring physical laminate catalogues and sample boards during site visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

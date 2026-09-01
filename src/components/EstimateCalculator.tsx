'use client';

import React, { useState, useMemo } from 'react';
import { calculateEstimate, DEFAULT_RATES, QUALITY_MULTIPLIERS } from '@/lib/estimate';
import { BHK_OPTIONS, PROPERTY_TYPES } from '@/lib/constants';
import { Calculator, AlertTriangle, CheckCircle2, ArrowRight, ShieldAlert, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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
      if (selectedServices.length === 1) return;
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

  // 1. Generate Branded PDF Quotation
  // 1. Generate Luxury Branded PDF Quotation
  const handleDownloadPDF = () => {
    try {
      setIsGeneratingPdf(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // --- Background Theme Accents ---
      doc.setFillColor(10, 15, 29); // Premium Dark Navy
      doc.rect(0, 0, 210, 48, 'F');

      // Top Gold Accent Bar
      doc.setFillColor(217, 119, 6); // Amber Gold
      doc.rect(0, 0, 210, 3, 'F');

      // --- Header Brand ---
      doc.setTextColor(245, 158, 11);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('N.S. INTERIOR', 14, 18);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(226, 232, 240);
      doc.text('DIRECT INTERIOR EXECUTION & CONTRACTING', 14, 25);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('Prop: Naushad Chaudhary | Master Contractor', 14, 32);
      doc.text('Tihama Complex, Kausa Talaw Pali Road, Kausa Mumbra - 400612', 14, 37);
      doc.text('Direct Call & WhatsApp: +91 6391916867 | Mumbai - Mumbra - Thane', 14, 42);

      // --- Quotation Meta Details Card ---
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(14, 54, 108, 36, 2, 2, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(14, 54, 108, 36, 2, 2, 'D');

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('PROJECT ESTIMATE SPECIFICATION', 18, 62);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      doc.text(`Generated Date : ${new Date().toLocaleDateString('en-IN')}`, 18, 69);
      doc.text(`Property Type   : ${propertyType} (${bhk})`, 18, 75);
      doc.text(`Carpet Area      : ${approxArea} Sq.Ft.`, 18, 81);
      doc.text(`Finish Grade     : ${qualityFinish.toUpperCase()}`, 18, 87);

      // --- Total Budget Range Card ---
      doc.setFillColor(254, 243, 199); // Light Amber Tint
      doc.roundedRect(126, 54, 70, 36, 2, 2, 'F');
      doc.setDrawColor(245, 158, 11);
      doc.roundedRect(126, 54, 70, 36, 2, 2, 'D');

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 83, 9);
      doc.text('CALCULATED BUDGET RANGE', 131, 62);

      // Clean ASCII Price Rendering (Avoids encoding bugs)
      const formattedMin = `Rs. ${result.minTotal.toLocaleString('en-IN')}`;
      const formattedMax = `Rs. ${result.maxTotal.toLocaleString('en-IN')}`;

      doc.setFontSize(10.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text(`${formattedMin}`, 131, 72);
      doc.text(`to ${formattedMax}`, 131, 79);

      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 53, 15);
      doc.text('*Excluding structural civil changes', 131, 86);

      // --- Itemized Cost Breakdown Table ---
      const tableData = result.breakdown.map((item, idx) => [
        idx + 1,
        item.serviceName,
        qualityFinish.toUpperCase(),
        `Rs. ${item.minCost.toLocaleString('en-IN')} - Rs. ${item.maxCost.toLocaleString('en-IN')}`,
      ]);

      autoTable(doc, {
        startY: 96,
        head: [['#', 'Execution Scope / Service Item', 'Finish Level', 'Approx Cost Range']],
        body: tableData,
        theme: 'striped',
        headStyles: {
          fillColor: [10, 15, 29],
          textColor: [245, 158, 11],
          fontStyle: 'bold',
          fontSize: 8.5,
          cellPadding: 3.5,
        },
        bodyStyles: {
          textColor: [30, 41, 59],
          fontSize: 8,
          cellPadding: 3,
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 80 },
          2: { cellWidth: 32, halign: 'center' },
          3: { cellWidth: 60, halign: 'right', fontStyle: 'bold' },
        },
      });

      const finalY = (doc as any).lastAutoTable?.finalY || 190;

      // --- Disclaimer Box ---
      doc.setFillColor(255, 251, 235);
      doc.roundedRect(14, finalY + 8, 182, 22, 1.5, 1.5, 'F');
      doc.setDrawColor(252, 211, 77);
      doc.roundedRect(14, finalY + 8, 182, 22, 1.5, 1.5, 'D');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 83, 9);
      doc.text('IMPORTANT TERMS & DISCLAIMER', 18, finalY + 14);

      doc.setFontSize(6.8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      const disclaimerLines = doc.splitTextToSize(
        result.disclaimer || 'Approximate estimate only. Final cost will be finalized after on-site physical measurement, laminate brand selection, and hardware requirements.',
        174
      );
      doc.text(disclaimerLines, 18, finalY + 19);

      // --- Page Footer & Signature Info ---
      doc.setDrawColor(226, 232, 240);
      doc.line(14, 275, 196, 275);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(15, 23, 42);
      doc.text('N.S. INTERIOR — Contractor Execution Hub', 14, 281);

      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 116, 139);
      doc.text('Visit our workshop: Kausa Mumbra | Call/WhatsApp: +91 6391916867', 14, 286);

      doc.setFont('helvetica', 'italic');
      doc.text('Authorised by Naushad Chaudhary', 150, 286);

      // Save Document
      doc.save(`NS-Interior-Quotation-${approxArea}sqft-${bhk.replace(/\s+/g, '')}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF quote', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // 2. Share Quotation Directly to WhatsApp
  const handleShareWhatsApp = () => {
    const message = `*N.S. INTERIOR - Estimate Inquiry* 🏛️%0A%0A` +
      `*Property:* ${encodeURIComponent(propertyType)} (${encodeURIComponent(bhk)})%0A` +
      `*Area:* ${approxArea} Sq.Ft.%0A` +
      `*Finish Grade:* ${qualityFinish.toUpperCase()}%0A` +
      `*Estimated Range:* ${encodeURIComponent(formatRupees(result.minTotal))} - ${encodeURIComponent(formatRupees(result.maxTotal))}%0A%0A` +
      `*Selected Services:*%0A` +
      result.breakdown.map((b) => `• ${encodeURIComponent(b.serviceName)}`).join('%0A') +
      `%0A%0APlease schedule a site visit with sample catalogues.`;

    const whatsappUrl = `https://wa.me/916391916867?text=${message}`;
    window.open(whatsappUrl, '_blank');
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

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isGeneratingPdf}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>{isGeneratingPdf ? 'Generating...' : 'Download PDF'}</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex items-center justify-center gap-2 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-500/40 font-semibold py-2.5 px-3 rounded-xl text-xs transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Quote</span>
              </button>
            </div>

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
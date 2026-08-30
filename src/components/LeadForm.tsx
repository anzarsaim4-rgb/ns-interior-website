'use client';

import React, { useState } from 'react';
import {
  BUSINESS_INFO,
  ALL_SERVICES,
  PROPERTY_TYPES,
  BHK_OPTIONS,
  BUDGET_RANGES,
  TIMELINE_OPTIONS,
} from '@/lib/constants';
import {
  CheckCircle2,
  Upload,
  Phone,
  MessageSquare,
  Sparkles,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface LeadFormProps {
  initialServices?: string[];
  initialBhk?: string;
  initialArea?: number;
}

export default function LeadForm({
  initialServices = [],
  initialBhk,
  initialArea,
}: LeadFormProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServices.length > 0 ? initialServices : ['modular-kitchen', 'false-ceiling']
  );
  const [propertyType, setPropertyType] = useState('Residential Apartment');
  const [bhk, setBhk] = useState(initialBhk || '2 BHK');
  const [approxArea, setApproxArea] = useState<number | string>(initialArea || 850);
  const [location, setLocation] = useState('Mumbra');
  const [budgetRange, setBudgetRange] = useState(BUDGET_RANGES[2]);
  const [expectedStart, setExpectedStart] = useState(TIMELINE_OPTIONS[0]);

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedLead, setSubmittedLead] = useState<{ leadCode: string; leadId: string } | null>(null);

  const toggleService = (slug: string) => {
    if (selectedServices.includes(slug)) {
      setSelectedServices(selectedServices.filter((s) => s !== slug));
    } else {
      setSelectedServices([...selectedServices, slug]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).slice(0, 5);
      setFiles(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!mobileNumber.trim() || mobileNumber.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    if (selectedServices.length === 0) {
      setErrorMsg('Please select at least one required service.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName.trim());
      formData.append('mobileNumber', mobileNumber.trim());
      if (whatsappNumber.trim()) formData.append('whatsappNumber', whatsappNumber.trim());
      formData.append('location', location);
      formData.append('propertyType', propertyType);
      formData.append('propertySize', bhk);
      if (approxArea) formData.append('approxAreaSqFt', approxArea.toString());
      formData.append('requiredServices', JSON.stringify(selectedServices));
      formData.append('budgetRange', budgetRange);
      formData.append('expectedStartDate', expectedStart);
      if (description.trim()) formData.append('description', description.trim());

      files.forEach((file) => {
        formData.append('photos', file);
      });

      const res = await fetch('/api/leads', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit enquiry');
      }

      setSubmittedLead({
        leadCode: data.leadCode,
        leadId: data.leadId,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedLead) {
    const serviceNames = selectedServices
      .map((slug) => ALL_SERVICES.find((s) => s.slug === slug)?.name)
      .filter(Boolean)
      .join(', ');

    const whatsappMessage = encodeURIComponent(
      `Hi N.S. INTERIOR! I just submitted an enquiry on your website.\n\n` +
      `*Lead Ref:* ${submittedLead.leadCode}\n` +
      `*Name:* ${fullName}\n` +
      `*Location:* ${location}\n` +
      `*Property:* ${bhk} (${approxArea} sqft)\n` +
      `*Services:* ${serviceNames}\n\n` +
      `Please contact me for site visit and quotation.`
    );

    return (
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-10 text-white shadow-2xl space-y-6 text-center max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-block bg-amber-500/10 text-amber-400 font-extrabold text-sm px-3 py-1 rounded-full border border-amber-500/30">
            Enquiry Reference ID: {submittedLead.leadCode}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Thank You, {fullName}!
          </h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Your project requirements have been registered securely. Senior contractor <strong>Naushad</strong> will review your submission and contact you shortly.
          </p>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl text-left text-xs text-slate-300 space-y-2 border border-slate-800">
          <div><strong className="text-slate-100">Location:</strong> {location}</div>
          <div><strong className="text-slate-100">Property:</strong> {propertyType} — {bhk} ({approxArea} sq.ft)</div>
          <div><strong className="text-slate-100">Services:</strong> {serviceNames}</div>
          <div><strong className="text-slate-100">Target Start:</strong> {expectedStart}</div>
        </div>

        <div className="pt-2 space-y-3">
          <a
            href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Connect Immediately on WhatsApp (Ref: {submittedLead.leadCode})</span>
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all border border-slate-700"
          >
            <Phone className="w-5 h-5 text-amber-400" />
            <span>Call Master Contractor: {BUSINESS_INFO.formattedPhone}</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-2xl space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-amber-400" />
          Request Free Site Visit & Detailed Quote
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Share your interior requirements for direct contractor estimation in Mumbai, Mumbra & Thane.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-950/80 border border-red-800 text-red-200 text-xs sm:text-sm p-3.5 rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Step 1: Services Selection */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-wider font-extrabold text-amber-400">
          1. Select Required Services (Check all that apply) *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
          {ALL_SERVICES.map((srv) => {
            const isSelected = selectedServices.includes(srv.slug);
            return (
              <button
                type="button"
                key={srv.slug}
                onClick={() => toggleService(srv.slug)}
                className={`p-2.5 rounded-xl text-xs font-semibold text-left transition-all flex items-center justify-between border ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className="truncate mr-1">{srv.name}</span>
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Property & Scope */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
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
          <label className="block text-xs font-semibold text-slate-300 mb-1">
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

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Approx. Area (Sq.Ft.)
          </label>
          <input
            type="number"
            value={approxArea}
            onChange={(e) => setApproxArea(e.target.value)}
            placeholder="e.g. 850"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Property Location *
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Mumbra, Thane West, Andheri"
            required
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Target Budget Range
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {BUDGET_RANGES.map((br) => (
              <option key={br} value={br}>
                {br}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Expected Project Start
          </label>
          <select
            value={expectedStart}
            onChange={(e) => setExpectedStart(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 3: Contact Details */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        <label className="block text-xs uppercase tracking-wider font-extrabold text-amber-400">
          2. Customer Contact Details *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Mobile Phone Number *
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="10-digit mobile number"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              WhatsApp Number (Optional)
            </label>
            <input
              type="tel"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="Same as mobile if empty"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Step 4: Description & Photos */}
      <div className="space-y-4 pt-2 border-t border-slate-800">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Additional Requirements or Special Notes
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe room layout, material preferences, or specific work required..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Upload Site Photos / Floor Plan (Max 5 files, 10MB each)
          </label>
          <div className="relative border-2 border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-950/60 rounded-xl p-4 text-center cursor-pointer transition-colors">
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1" />
            <span className="text-xs text-slate-300 font-medium block">
              {files.length > 0
                ? `${files.length} file(s) selected: ${files.map((f) => f.name).join(', ')}`
                : 'Click or drop site photos / floor plans here'}
            </span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-4 px-6 rounded-xl text-sm sm:text-base tracking-wide uppercase transition-all shadow-xl disabled:opacity-50"
        >
          {submitting ? 'Generating Lead Reference ID...' : 'Submit Project Enquiry →'}
        </button>
        <p className="text-[11px] text-slate-400 text-center mt-2">
          Your privacy is protected. No spam. Direct contractor evaluation only.
        </p>
      </div>
    </form>
  );
}

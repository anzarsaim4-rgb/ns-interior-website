'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  FileText,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Send,
  Image as ImageIcon,
} from 'lucide-react';
import { ALL_SERVICES } from '@/lib/constants';

const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'SITE_VISIT',
  'MEASUREMENT',
  'QUOTATION_SENT',
  'NEGOTIATION',
  'WON',
  'LOST',
  'ON_HOLD',
];

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;

  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [status, setStatus] = useState('NEW');
  const [noteContent, setNoteContent] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  const fetchLeadDetails = () => {
    fetch(`/api/leads/${leadId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.lead) {
          setLead(data.lead);
          setStatus(data.lead.status);
          if (data.lead.followUpDate) {
            setFollowUpDate(data.lead.followUpDate.split('T')[0]);
          }
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeadDetails();
  }, [leadId]);

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          note: noteContent,
          followUpDate,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLead(data.lead);
        setNoteContent('');
        alert('Lead updated successfully!');
      }
    } catch (err) {
      alert('Failed to update lead');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-xs text-slate-400">Loading Lead Dossier...</div>;
  }

  if (!lead) {
    return <div className="py-12 text-center text-xs text-slate-400">Lead not found.</div>;
  }

  const selectedServicesSlugs: string[] = JSON.parse(lead.requiredServices || '[]');
  const serviceNames = selectedServicesSlugs
    .map((slug) => ALL_SERVICES.find((s) => s.slug === slug)?.name || slug)
    .join(', ');

  const whatsappText = encodeURIComponent(
    `Hi ${lead.fullName}, this is Naushad from N.S. INTERIOR regarding your enquiry (Ref: ${lead.leadCode}) for ${lead.propertyType} in ${lead.location}. When can we schedule the site visit?`
  );

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Top Navigation */}
      <div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Leads</span>
        </Link>
      </div>

      {/* Dossier Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Ref ID: {lead.leadCode}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lead.fullName}
            </h1>
            <p className="text-xs text-slate-400">
              Submitted on {new Date(lead.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${lead.mobileNumber}`}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 border border-slate-700"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Customer</span>
            </a>

            <a
              href={`https://wa.me/${lead.whatsappNumber || lead.mobileNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Lead Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-2">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Location</span>
            <span className="font-bold text-white text-sm">{lead.location}</span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Property & Size</span>
            <span className="font-bold text-white text-sm">
              {lead.propertyType} {lead.propertySize ? `(${lead.propertySize})` : ''}
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Approx Area</span>
            <span className="font-bold text-white text-sm">
              {lead.approxAreaSqFt ? `${lead.approxAreaSqFt} Sq.Ft` : 'Not specified'}
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 font-semibold block text-[10px] uppercase">Target Budget</span>
            <span className="font-bold text-amber-400 text-xs">
              {lead.budgetRange || 'Not specified'}
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
          <div><strong className="text-slate-200">Required Services:</strong> {serviceNames}</div>
          <div><strong className="text-slate-200">Expected Start Timeline:</strong> {lead.expectedStartDate || 'Not specified'}</div>
          {lead.description && (
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-300 mt-2">
              <strong className="text-white block mb-1">Customer Description / Notes:</strong>
              {lead.description}
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Site Photos Inspector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-amber-400" />
          Uploaded Site Photos & Floor Plans ({lead.photos?.length || 0})
        </h3>

        {lead.photos && lead.photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {lead.photos.map((photo: any) => (
              <a
                key={photo.id}
                href={photo.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative h-40 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500 transition-colors"
              >
                <img
                  src={photo.fileUrl}
                  alt="Site Photo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/90 text-amber-400 text-[10px] px-2 py-0.5 rounded font-mono">
                  View Full
                </span>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">No site photos uploaded with this enquiry.</p>
        )}
      </div>

      {/* Status & Contractor Notes Update Form */}
      <form onSubmit={handleUpdateLead} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-white">Update Status & Add Contractor Notes</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Lead Stage Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            >
              {LEAD_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Next Follow-Up Date
            </label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Add Internal Contractor Note
          </label>
          <textarea
            rows={3}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="Record site visit outcome, quoted price, measurement notes, or customer callback time..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50"
        >
          {updating ? 'Saving...' : 'Save Lead Updates →'}
        </button>

        {/* Existing Notes Log */}
        {lead.notes && lead.notes.length > 0 && (
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Internal Activity Log ({lead.notes.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {lead.notes.map((n: any) => (
                <div key={n.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span className="font-bold text-amber-400">{n.author}</span>
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-slate-200">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

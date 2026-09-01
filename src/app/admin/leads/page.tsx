'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Phone, MessageCircle, MapPin, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';

const STATUS_LIST = [
  'ALL',
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

const EDITABLE_STATUSES = [
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

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchLeads = () => {
    setLoading(true);
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
      })
      .catch((err) => console.error('Failed to fetch leads', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Update Status Inline via API + Optimistic UI Instant Update
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    // 1. Instant UI update so user sees immediate feedback
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    setUpdatingId(leadId);

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        // Fallback for PUT if PATCH endpoint not configured
        await fetch(`/api/leads/${leadId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
      }
    } catch (err) {
      console.error('Failed to save lead status to database', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter Logic: Filter by exact status tab & search query
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus =
      statusFilter === 'ALL' ||
      (lead.status && lead.status.trim().toUpperCase() === statusFilter.trim().toUpperCase());

    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lead.leadCode?.toLowerCase().includes(q) ||
      lead.fullName?.toLowerCase().includes(q) ||
      lead.mobileNumber?.toLowerCase().includes(q) ||
      lead.location?.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Direct WhatsApp Helper
  const getWhatsAppLink = (lead: any) => {
    const cleanNumber = (lead.mobileNumber || '').replace(/\D/g, '');
    const phoneWithCountry = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
    const message = `Hello *${lead.fullName}*, this is *Naushad Chaudhary* from *N.S. INTERIOR* regarding your interior project inquiry (${lead.propertySize || lead.propertyType || 'Residential'} at ${lead.location || 'Mumbai/Mumbra/Thane'}). Would you like to schedule a physical site visit?`;
    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'WON':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'LOST':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'SITE_VISIT':
      case 'MEASUREMENT':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'QUOTATION_SENT':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
            Customer Lead Management
          </h1>
          <p className="text-xs text-slate-200 mt-1">
            Track inquiries, update pipeline status in real-time, and trigger direct WhatsApp/Call follow-ups.
          </p>
        </div>
        <div className="text-xs font-mono text-amber-300 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md self-start sm:self-auto">
          Showing: <span className="font-bold text-white">{filteredLeads.length}</span> of {leads.length} leads
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Search Input */}
        <div className="lg:col-span-4 relative">
          <input
            type="text"
            placeholder="Search by Lead ID, name, mobile, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/60 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400 backdrop-blur-md"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Status Filter Tabs */}
        <div className="lg:col-span-8 flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <div className="flex gap-1.5">
            {STATUS_LIST.map((st) => {
              const count = st === 'ALL' ? leads.length : leads.filter((l) => l.status === st).length;
              const isActive = statusFilter === st;

              return (
                <button
                  type="button"
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-md ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                      : 'bg-slate-950/60 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white backdrop-blur-md'
                  }`}
                >
                  <span>{st}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leads Glassmorphic Table */}
      <div className="bg-slate-950/45 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">
        {loading ? (
          <div className="py-12 text-center text-xs text-amber-300 font-mono flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading leads data...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-14 text-center space-y-2">
            <p className="text-slate-200 text-sm font-bold">No leads found under "{statusFilter}" status.</p>
            <p className="text-slate-400 text-xs">
              Change the filter tab above or search for another customer query.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-300 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Quick Connect</th>
                  <th className="p-3">Pipeline Status</th>
                  <th className="p-3">Photos</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-400">{lead.leadCode}</td>
                    <td className="p-3">
                      <div className="font-semibold text-white">{lead.fullName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lead.mobileNumber}</div>
                    </td>
                    <td className="p-3">{lead.location}</td>
                    <td className="p-3">{lead.propertySize || lead.propertyType || 'N/A'}</td>

                    {/* Quick Follow-up Buttons */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={getWhatsAppLink(lead)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open WhatsApp Chat"
                          className="flex items-center gap-1 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors shadow-sm"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`tel:${lead.mobileNumber}`}
                          title="Direct Call"
                          className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 p-1.5 rounded-lg border border-white/10 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-400" />
                        </a>
                      </div>
                    </td>

                    {/* Inline Interactive Status Dropdown */}
                    <td className="p-3">
                      <div className="relative inline-flex items-center">
                        <select
                          value={lead.status}
                          disabled={updatingId === lead.id}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`cursor-pointer rounded-lg border px-2.5 py-1 text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all ${getStatusBadge(
                            lead.status
                          )} bg-slate-950/90 shadow-sm`}
                        >
                          {EDITABLE_STATUSES.map((st) => (
                            <option key={st} value={st} className="bg-slate-900 text-slate-200">
                              {st}
                            </option>
                          ))}
                        </select>
                        {updatingId === lead.id && (
                          <Loader2 className="ml-1.5 w-3 h-3 text-amber-400 animate-spin flex-shrink-0" />
                        )}
                      </div>
                    </td>

                    <td className="p-3">
                      {lead.photos && lead.photos.length > 0 ? (
                        <span className="text-emerald-400 font-semibold">{lead.photos.length} uploaded</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors inline-flex items-center gap-1 border border-white/10 shadow-sm"
                      >
                        <span>Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
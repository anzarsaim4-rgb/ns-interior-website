'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  FileText,
  TrendingUp,
  Download,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = () => {
    setLoading(true);
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const countByStatus = (status: string) => {
    return leads.filter((l) => l.status === status).length;
  };

  const newCount = countByStatus('NEW');
  const contactedCount = countByStatus('CONTACTED');
  const siteVisitCount = countByStatus('SITE_VISIT');
  const measurementCount = countByStatus('MEASUREMENT');
  const quotationCount = countByStatus('QUOTATION_SENT');
  const wonCount = countByStatus('WON');
  const lostCount = countByStatus('LOST');

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['RefID,ClientName,Mobile,Location,Property,Status,Date'];
    const rows = leads.map(
      (l) =>
        `"${l.leadCode || ''}","${l.fullName || ''}","${l.mobileNumber || ''}","${l.location || ''}","${
          l.propertySize || l.propertyType || ''
        }","${l.status || ''}","${new Date(l.createdAt).toLocaleDateString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NS_Interior_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="space-y-8 pb-10">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30 mb-2 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>N.S. Interior Command & Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
            Lead Operations Dashboard
          </h1>
          <p className="text-xs text-slate-200 mt-1 drop-shadow-sm">
            Real-time pipeline, site visits, and project conversions for Mumbai, Mumbra & Thane.
          </p>
        </div>

        {/* Quick Top Tools */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            title="Download CSV of all inquiries"
            className="bg-slate-950/60 hover:bg-slate-900/80 text-slate-200 hover:text-white border border-white/15 font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg backdrop-blur-md"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export CSV</span>
          </button>

          <Link
            href="/admin/leads"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-xl shadow-amber-500/20 transition-all"
          >
            <span>Manage All Leads</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. Glassmorphic KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Leads */}
        <div className="bg-slate-950/45 border border-white/15 hover:border-amber-400/50 p-5 rounded-2xl space-y-3 transition-all hover:-translate-y-1 shadow-2xl backdrop-blur-xl group">
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold uppercase tracking-wider">
            <span>Total Enquiries</span>
            <div className="w-8 h-8 rounded-lg bg-slate-900/70 border border-white/10 text-amber-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-white drop-shadow-md">{leads.length}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
            <TrendingUp className="w-3 h-3" />
            <span>Active Inquiries Database</span>
          </div>
        </div>

        {/* Needs Action */}
        <div className="bg-slate-950/45 border border-amber-500/40 hover:border-amber-400 p-5 rounded-2xl space-y-3 transition-all hover:-translate-y-1 shadow-2xl backdrop-blur-xl group">
          <div className="flex items-center justify-between text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>New Follow-ups</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400 drop-shadow-md">{newCount}</div>
          <p className="text-[11px] text-amber-200/90 font-medium">Pending contractor WhatsApp/Call</p>
        </div>

        {/* Site Visits & Measurements */}
        <div className="bg-slate-950/45 border border-cyan-500/40 hover:border-cyan-400 p-5 rounded-2xl space-y-3 transition-all hover:-translate-y-1 shadow-2xl backdrop-blur-xl group">
          <div className="flex items-center justify-between text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <span>Active Site Visits</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-cyan-300 drop-shadow-md">{siteVisitCount + measurementCount}</div>
          <p className="text-[11px] text-cyan-200/90 font-medium">Measurements & site checks</p>
        </div>

        {/* Projects Won */}
        <div className="bg-slate-950/45 border border-emerald-500/40 hover:border-emerald-400 p-5 rounded-2xl space-y-3 transition-all hover:-translate-y-1 shadow-2xl backdrop-blur-xl group">
          <div className="flex items-center justify-between text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <span>Contracts Won</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400 drop-shadow-md">{wonCount}</div>
          <p className="text-[11px] text-emerald-200/90 font-medium">Converted turnkey contracts</p>
        </div>
      </div>

      {/* 3. Visual Pipeline Stages Bar */}
      <div className="bg-slate-950/45 border border-white/15 rounded-3xl p-6 space-y-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Live Pipeline Conversion Stages
            </h3>
          </div>
          <span className="text-[11px] text-slate-300 font-mono">
            {leads.length} Total Registered
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-1">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 text-center backdrop-blur-md">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">New</span>
            <span className="text-lg font-extrabold text-white">{newCount}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 text-center backdrop-blur-md">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Contacted</span>
            <span className="text-lg font-extrabold text-amber-300">{contactedCount}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 text-center backdrop-blur-md">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Site Visit</span>
            <span className="text-lg font-extrabold text-cyan-300">{siteVisitCount}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 text-center backdrop-blur-md">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Quoted</span>
            <span className="text-lg font-extrabold text-purple-300">{quotationCount}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 text-center backdrop-blur-md">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Won</span>
            <span className="text-lg font-extrabold text-emerald-400">{wonCount}</span>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-white/10 text-center backdrop-blur-md">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Lost</span>
            <span className="text-lg font-extrabold text-rose-400">{lostCount}</span>
          </div>
        </div>
      </div>

      {/* 4. Recent Submissions Feed */}
      <div className="bg-slate-950/45 border border-white/15 rounded-3xl p-6 space-y-4 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Recent Customer Inquiries Feed</span>
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-bold text-amber-300 hover:underline flex items-center gap-1"
          >
            <span>Open Table View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400 font-mono">
            Fetching latest customer leads...
          </div>
        ) : leads.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-slate-300 text-xs">No customer enquiries submitted yet.</p>
            <p className="text-slate-400 text-[11px]">
              Submissions from the website booking form will appear here live.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 text-slate-300 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Pipeline Status</th>
                  <th className="p-3">Registered Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                {leads.slice(0, 8).map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3 font-mono font-bold text-amber-400">{lead.leadCode}</td>
                    <td className="p-3 font-semibold text-white">{lead.fullName}</td>
                    <td className="p-3">{lead.location}</td>
                    <td className="p-3">{lead.propertySize || lead.propertyType || 'N/A'}</td>
                    <td className="p-3 font-mono">{lead.mobileNumber}</td>
                    <td className="p-3">
                      <span
                        className={`font-bold px-2.5 py-0.5 rounded text-[10px] border ${getStatusBadge(
                          lead.status
                        )}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-300">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold px-3 py-1 rounded-lg text-[11px] transition-colors inline-block border border-white/10"
                      >
                        Dossier →
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
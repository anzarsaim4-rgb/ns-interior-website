'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Phone, MapPin, Calendar, Clock, ArrowUpRight, ShieldCheck, FileText } from 'lucide-react';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
      })
      .finally(() => setLoading(false));
  }, []);

  const countByStatus = (status: string) => {
    return leads.filter((l) => l.status === status).length;
  };

  const newCount = countByStatus('NEW');
  const siteVisitCount = countByStatus('SITE_VISIT');
  const wonCount = countByStatus('WON');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Lead Control Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time customer enquiries and site visit pipeline management for N.S. INTERIOR.
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 self-start sm:self-auto shadow-md"
        >
          <span>View All Enquiries</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-semibold block uppercase">Total Enquiries</span>
          <div className="text-3xl font-black text-white">{leads.length}</div>
          <p className="text-[11px] text-slate-500">Registered on website</p>
        </div>

        <div className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl space-y-2">
          <span className="text-amber-400 text-xs font-bold block uppercase">New / Uncontacted</span>
          <div className="text-3xl font-black text-amber-400">{newCount}</div>
          <p className="text-[11px] text-amber-500/80">Requires contractor follow-up</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-slate-400 text-xs font-semibold block uppercase">Site Visits Scheduled</span>
          <div className="text-3xl font-black text-white">{siteVisitCount}</div>
          <p className="text-[11px] text-slate-500">Physical measurement pending</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <span className="text-emerald-400 text-xs font-bold block uppercase">Projects Won</span>
          <div className="text-3xl font-black text-emerald-400">{wonCount}</div>
          <p className="text-[11px] text-emerald-500/80">Converted into work contracts</p>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            Recent Customer Submissions
          </h2>
          <span className="text-xs text-slate-400">Showing latest leads</span>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-slate-400 text-xs">No customer enquiries submitted yet.</p>
            <p className="text-slate-500 text-[11px]">
              Test the enquiry form on the website to see live entries here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {leads.slice(0, 10).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-850">
                    <td className="p-3 font-mono font-bold text-amber-400">{lead.leadCode}</td>
                    <td className="p-3 font-semibold text-white">{lead.fullName}</td>
                    <td className="p-3">{lead.location}</td>
                    <td className="p-3">{lead.propertySize || lead.propertyType}</td>
                    <td className="p-3 font-mono">{lead.mobileNumber}</td>
                    <td className="p-3">
                      <span className="bg-amber-500/10 text-amber-400 font-bold px-2 py-0.5 rounded text-[10px] border border-amber-500/20">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="text-amber-400 hover:underline font-bold"
                      >
                        Details →
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

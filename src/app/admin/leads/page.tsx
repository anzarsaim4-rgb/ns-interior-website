'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

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

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      lead.leadCode.toLowerCase().includes(q) ||
      lead.fullName.toLowerCase().includes(q) ||
      lead.mobileNumber.toLowerCase().includes(q) ||
      lead.location.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Customer Lead Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track enquiry statuses, site visit bookings, and quotation conversions.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Search */}
        <div className="md:col-span-6 relative">
          <input
            type="text"
            placeholder="Search by Lead ID, name, mobile, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
        </div>

        {/* Status Filter */}
        <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div className="flex gap-1.5">
            {STATUS_LIST.map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  statusFilter === st
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading leads data...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            No leads match the selected filter query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">Ref ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Property</th>
                  <th className="p-3">Mobile</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Photos</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-850">
                    <td className="p-3 font-mono font-bold text-amber-400">{lead.leadCode}</td>
                    <td className="p-3 font-semibold text-white">{lead.fullName}</td>
                    <td className="p-3">{lead.location}</td>
                    <td className="p-3">{lead.propertySize || lead.propertyType}</td>
                    <td className="p-3 font-mono">{lead.mobileNumber}</td>
                    <td className="p-3">
                      <span className="bg-amber-500/10 text-amber-400 font-bold px-2.5 py-1 rounded text-[10px] border border-amber-500/20">
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {lead.photos && lead.photos.length > 0 ? (
                        <span className="text-emerald-400 font-semibold">{lead.photos.length} uploaded</span>
                      ) : (
                        <span className="text-slate-500">None</span>
                      )}
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors inline-block"
                      >
                        Open Dossier →
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

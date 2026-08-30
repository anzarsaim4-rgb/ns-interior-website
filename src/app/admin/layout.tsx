'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, LogOut, Shield, ChevronRight } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthenticated(true);
      return;
    }

    fetch('/api/admin/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAuthenticated(true);
          setUser(data.user);
        } else {
          setAuthenticated(false);
          router.push('/admin/login');
        }
      })
      .catch(() => {
        setAuthenticated(false);
        router.push('/admin/login');
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 text-xs">
        Verifying secure admin session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-6 flex-shrink-0">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center font-black text-slate-950 text-base">
            NS
          </div>
          <div>
            <div className="font-bold text-sm text-white">N.S. INTERIOR</div>
            <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
              Lead Control Hub
            </div>
          </div>
        </div>

        <nav className="space-y-1 text-xs font-semibold">
          <Link
            href="/admin"
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
              pathname === '/admin'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </Link>

          <Link
            href="/admin/leads"
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
              pathname.startsWith('/admin/leads')
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Leads Management</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          </Link>
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Logged In As</span>
            <div className="font-bold text-white text-xs">{user?.name || 'Naushad'}</div>
            <div className="text-[10px] text-amber-400">Master Contractor</div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 font-bold py-2 rounded-xl text-xs transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 sm:p-8 max-w-7xl overflow-x-auto">{children}</main>
    </div>
  );
}

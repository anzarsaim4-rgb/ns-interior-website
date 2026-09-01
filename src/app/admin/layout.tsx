'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Users, Images, LogOut, ChevronRight, ArrowUpRight } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-amber-400 font-mono text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <span>Verifying secure master session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col md:flex-row overflow-x-hidden">
      
      {/* 1. VISIBLE HIGH-DEF ARCHITECTURAL WALLPAPER */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Balanced Dark Vignette (Enough to read text without hiding wallpaper) */}
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/80" />
      </div>

      {/* 2. GLASSMORPHIC SIDEBAR */}
      <aside className="relative z-10 w-full md:w-64 bg-slate-950/60 border-r border-white/10 p-4 space-y-6 flex-shrink-0 flex flex-col justify-between backdrop-blur-xl shadow-2xl">
        
        <div className="space-y-6">
          {/* Brand Header with Golden Logo */}
          <Link href="/" target="_blank" title="Open Live Website" className="flex items-center gap-3 border-b border-white/10 pb-4 group">
            <div className="relative w-12 h-12 rounded-xl bg-slate-950/80 border border-amber-500/40 p-1 flex items-center justify-center shadow-lg group-hover:border-amber-400 transition-all flex-shrink-0 overflow-hidden">
              <img
                src="/logo.png"
                alt="N.S. INTERIOR Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="overflow-hidden">
              <div className="font-extrabold text-sm text-white tracking-wide group-hover:text-amber-300 transition-colors flex items-center gap-1 drop-shadow-md">
                <span>N.S. INTERIOR</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-amber-400" />
              </div>
              <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                Command Hub
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <Link
              href="/admin"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                pathname === '/admin'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${pathname === '/admin' ? 'text-slate-950' : 'opacity-40'}`} />
            </Link>

            <Link
              href="/admin/leads"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                pathname.startsWith('/admin/leads')
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Leads Management</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${pathname.startsWith('/admin/leads') ? 'text-slate-950' : 'opacity-40'}`} />
            </Link>

            <Link
              href="/admin/gallery"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                pathname.startsWith('/admin/gallery')
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-200 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Images className="w-4 h-4" />
                <span>Gallery Management</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 ${pathname.startsWith('/admin/gallery') ? 'text-slate-950' : 'opacity-40'}`} />
            </Link>
          </nav>
        </div>

        {/* User Session Info */}
        <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-2xl border border-white/10 space-y-2 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Operator</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
            <div>
              <div className="font-extrabold text-white text-xs">{user?.name || 'Naushad Chaudhary'}</div>
              <div className="text-[10px] text-amber-400 font-semibold">Master Interior Contractor</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-slate-950/50 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 font-bold py-2 rounded-xl text-xs transition-all shadow-sm backdrop-blur-md"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <main className="relative z-10 flex-grow p-4 sm:p-8 max-w-7xl overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
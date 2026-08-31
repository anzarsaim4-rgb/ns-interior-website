'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionFooter from '@/components/MobileActionFooter';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  // Agar user Admin route par hai toh Customer Sidebar aur Footer hide ho jayenge
  if (isAdminRoute) {
    return <div className="min-h-screen bg-slate-950">{children}</div>;
  }

  // Normal Customer Pages ke liye regular sidebar aur layout dikhega
  return (
    <>
      <div className="min-h-screen lg:flex lg:items-stretch">
        <div className="lg:w-[280px] lg:flex-shrink-0">
          <Header />
        </div>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
      <Footer />
      <MobileActionFooter />
    </>
  );
}
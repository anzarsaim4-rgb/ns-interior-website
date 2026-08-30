import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionFooter from '@/components/MobileActionFooter';
import { getLocalBusinessSchema } from '@/lib/seo';

const siteUrl = 'https://ns-interior-website.vercel.app';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#020817',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'N.S. INTERIOR | Interior Execution & Contracting in Mumbai, Mumbra & Thane',
    template: '%s | N.S. INTERIOR',
  },
  description:
    'N.S. INTERIOR delivers direct interior execution and contracting services for residential and commercial projects in Mumbai, Mumbra and Thane, including modular kitchens, carpentry, false ceilings, painting, and turnkey renovation work.',
  keywords: [
    'N.S. INTERIOR',
    'Interior Contractor Mumbai',
    'Interior Contractor Mumbra',
    'Interior Contractor Thane',
    'Interior Execution & Contracting Mumbai',
    'Modular Kitchen Mumbai',
    'False Ceiling Contractor',
    'Custom Carpentry Mumbai',
    'Turnkey Interior Renovation',
  ],
  authors: [{ name: 'N.S. INTERIOR' }],
  creator: 'N.S. INTERIOR',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    title: 'N.S. INTERIOR | Interior Execution & Contracting',
    description:
      'Interior execution and contracting services in Mumbai, Mumbra and Thane for residential and commercial projects, modular kitchens, custom carpentry, false ceilings and renovation work.',
    siteName: 'N.S. INTERIOR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N.S. INTERIOR',
    description:
      'Interior execution and contracting services in Mumbai, Mumbra and Thane.',
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLocalBusinessSchema();

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 font-sans">
        <div className="min-h-screen lg:flex lg:items-stretch">
          <div className="lg:w-[280px] lg:flex-shrink-0">
            <Header />
          </div>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
        <Footer />
        <MobileActionFooter />
      </body>
    </html>
  );
}

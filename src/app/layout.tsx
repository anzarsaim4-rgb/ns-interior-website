import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileActionFooter from '@/components/MobileActionFooter';
import { getLocalBusinessSchema } from '@/lib/seo';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nsinterior.in'),
  title: {
    default: 'N.S. INTERIOR | Interior Execution & Contracting Services Mumbai, Mumbra, Thane',
    template: '%s | N.S. INTERIOR',
  },
  description:
    'N.S. INTERIOR provides expert interior execution, modular kitchen, custom carpentry, false ceiling, painting, electrical & plumbing services across Mumbai, Mumbra, and Thane. 7+ years experience.',
  keywords: [
    'N.S. INTERIOR',
    'interior execution Mumbai',
    'interior contractor Mumbra',
    'interior contractor Thane',
    'modular kitchen execution',
    'carpenter work Thane',
    'false ceiling contractor Mumbra',
    'home renovation Mumbai',
    'office interior contractor',
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
    url: 'https://nsinterior.in',
    title: 'N.S. INTERIOR — Interior Execution & Contracting Services',
    description:
      '7+ years experience in direct interior execution across Mumbai, Mumbra & Thane. Modular kitchen, carpentry, false ceiling, painting & full home renovation.',
    siteName: 'N.S. INTERIOR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'N.S. INTERIOR',
    description:
      'Interior design execution and contracting services in Mumbai, Mumbra & Thane.',
  },
  alternates: {
    canonical: 'https://nsinterior.in',
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

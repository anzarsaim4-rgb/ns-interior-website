import { MetadataRoute } from 'next';
import { ALL_SERVICES, BUSINESS_INFO } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nsinterior.in';

  const staticPages = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/before-and-after',
    '/service-areas',
    '/estimate-calculator',
    '/enquiry',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/reviews',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const servicePages = ALL_SERVICES.map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const locationPages = BUSINESS_INFO.primaryLocations.map((loc) => ({
    url: `${baseUrl}/service-areas/${loc.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages, ...locationPages];
}

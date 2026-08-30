import { MetadataRoute } from 'next';

const siteUrl = 'https://ns-interior-website.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/gallery',
    '/before-and-after',
    '/service-areas',
    '/estimate-calculator',
    '/contact',
    '/enquiry',
    '/privacy-policy',
    '/terms-and-conditions',
    '/reviews',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}

import { BUSINESS_INFO, ALL_SERVICES } from './constants';

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": BUSINESS_INFO.name,
    "image": "https://nsinterior.in/images/hero.jpg",
    "@id": "https://nsinterior.in/#business",
    "url": "https://nsinterior.in",
    "telephone": BUSINESS_INFO.formattedPhone,
    "email": BUSINESS_INFO.email,
    "priceRange": "₹₹ - ₹₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbra",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.1764,
      "longitude": 73.0232
    },
    "areaServed": BUSINESS_INFO.primaryLocations.map((loc) => ({
      "@type": "City",
      "name": loc
    })),
    "description": "N.S. INTERIOR is a premier interior execution and contracting specialist with 7+ years of experience serving Mumbai, Mumbra, Thane, and nearby regions.",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "knowsAbout": ALL_SERVICES.map((s) => s.name)
  };
}

export function getServiceSchema(serviceSlug: string) {
  const service = ALL_SERVICES.find((s) => s.slug === serviceSlug);
  if (!service) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} Services - N.S. INTERIOR`,
    "provider": {
      "@type": "HomeAndConstructionBusiness",
      "name": BUSINESS_INFO.name,
      "telephone": BUSINESS_INFO.formattedPhone,
      "email": BUSINESS_INFO.email
    },
    "areaServed": BUSINESS_INFO.primaryLocations,
    "description": service.fullDesc,
    "serviceType": service.name
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

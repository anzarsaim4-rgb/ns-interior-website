import React from 'react';

export const metadata = {
  title: 'Privacy Policy | N.S. INTERIOR',
  description: 'Privacy policy for N.S. INTERIOR lead submission and customer data protection.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-slate-400">Effective Date: January 1, 2026</p>

      <p>
        N.S. INTERIOR (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting the privacy of customers who submit project enquiries or interact with our website.
      </p>

      <h2 className="text-xl font-bold text-white pt-4">1. Information We Collect</h2>
      <p>
        When you request a site visit, estimate, or consultation through our enquiry forms, we collect:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Your full name and phone/WhatsApp number</li>
        <li>Property location and property type (BHK / area)</li>
        <li>Selected interior services and budget preferences</li>
        <li>Uploaded site photos or floor plans provided voluntarily</li>
      </ul>

      <h2 className="text-xl font-bold text-white pt-4">2. How We Use Your Information</h2>
      <p>
        Your data is strictly used to evaluate your project requirements, prepare approximate cost estimates, schedule physical site measurement visits, and contact you via phone or WhatsApp regarding your enquiry.
      </p>

      <h2 className="text-xl font-bold text-white pt-4">3. Data Security & Third Parties</h2>
      <p>
        We do NOT sell, rent, or trade customer contact information to third-party telemarketers or advertisers. All submitted files and project details are stored securely.
      </p>

      <h2 className="text-xl font-bold text-white pt-4">4. Contact Us</h2>
      <p>
        If you have questions regarding this privacy policy, email us at <strong>itsnaushad014@gmail.com</strong> or call <strong>6391916867</strong>.
      </p>
    </div>
  );
}

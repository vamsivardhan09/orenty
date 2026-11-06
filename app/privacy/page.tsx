import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Orenty (orenty.in). Learn how we handle your data with respect and security.',
};

export default function PrivacyPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 py-16 w-full">
        <div className="mb-10">
          <span className="eyebrow-label block mb-2">LEGAL</span>
          <h1 className="h1-hero text-text mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-3 font-medium">
            Last Updated: November 2026 [CONFIRM]
          </p>
        </div>

        <div className="rounded-card border border-border bg-surface-2 p-8 md:p-12 space-y-8 text-[15px] text-text-2 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text mb-3">1. Overview</h2>
            <p>
              Orenty (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates orenty.in. We respect your privacy and are committed to protecting personal information you share with us through our project enquiry forms, product waitlists, and Startup Lab challenge submissions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Project Inquiries:</strong> When you submit a project enquiry, we collect your name, email address, optional phone/WhatsApp number, project requirements, and estimated budget.</li>
              <li><strong>Product Waitlists:</strong> When you join a waitlist for SyncedIn, Fanbase, Job Pilot, or Pujari.ai, we collect your email address.</li>
              <li><strong>Startup Lab Submissions:</strong> When you submit a challenge solution, we collect your name, email, GitHub/portfolio links, solution repository URL, and notes.</li>
              <li><strong>Technical Data:</strong> Standard server logs, IP addresses for rate limiting and fraud prevention, and anonymized aggregate analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">3. How We Use Your Information</h2>
            <p>
              We use your data solely to respond to project enquiries, communicate updates regarding product beta access, and evaluate Startup Lab challenge solutions. We do not sell, rent, or trade your personal data to any third party for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">4. Data Storage & Security</h2>
            <p>
              Your information is stored in secure, encrypted cloud infrastructure (including Supabase and protected hosting environments). We implement rate limiting, honeypot defenses, and strict access controls to prevent unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">5. Your Rights</h2>
            <p>
              You have the right to request a copy of the data we hold about you, request corrections, or ask us to delete your personal information at any time. To exercise these rights, please email us at <a href="mailto:contact@orenty.in" className="text-secondary hover:underline">contact@orenty.in [CONFIRM]</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">6. Contact Information</h2>
            <p>
              For privacy-related inquiries, contact us at:
              <br />
              <strong>Orenty</strong>
              <br />
              Bengaluru, Karnataka, India [CONFIRM address]
              <br />
              Email: <a href="mailto:contact@orenty.in" className="text-secondary hover:underline">contact@orenty.in [CONFIRM]</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

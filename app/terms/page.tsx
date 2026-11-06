import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Orenty (orenty.in). Website terms, client engagement, and Startup Lab conditions.',
};

export default function TermsPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 py-16 w-full">
        <div className="mb-10">
          <span className="eyebrow-label block mb-2">LEGAL</span>
          <h1 className="h1-hero text-text mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-text-3 font-medium">
            Last Updated: November 2026 [CONFIRM]
          </p>
        </div>

        <div className="rounded-card border border-border bg-surface-2 p-8 md:p-12 space-y-8 text-[15px] text-text-2 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website at orenty.in, or by submitting an enquiry or challenge solution, you agree to be bound by these Terms of Service. If you disagree with any part, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">2. Client Services & Scoping</h2>
            <p>
              All software development, web engineering, mobile apps, and AI automation services provided to clients are governed by explicit, written proposals and contracts agreed upon before work begins. Intellectual property created under paid client contracts transfers to the client upon full payment according to each individual agreement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">3. Startup Lab & Challenge Rules</h2>
            <p>
              The best contributors to Startup Lab challenges may earn ownership in the product they help build. Terms and equity allocations are set per challenge and formal agreement. Submitting a solution does not automatically grant equity, employment, or compensation. All terms are subject to formal legal documentation [CONFIRM — have a lawyer review before publishing].
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">4. Intellectual Property of Submissions</h2>
            <p>
              Applicants retain ownership of the original code and materials submitted to Startup Lab challenges unless and until a formal contributor agreement is signed by both the author and Orenty with agreed equity or compensation terms [CONFIRM]. We will not use unaccepted code in production.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">5. Disclaimer of Warranties</h2>
            <p>
              The website, content, and materials on orenty.in are provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka, India [CONFIRM jurisdiction].
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-text mb-3">7. Contact</h2>
            <p>
              Questions regarding these Terms should be directed to:
              <br />
              <strong>Orenty Legal Team</strong>
              <br />
              Email: <a href="mailto:contact@orenty.in" className="text-secondary hover:underline">contact@orenty.in [CONFIRM]</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

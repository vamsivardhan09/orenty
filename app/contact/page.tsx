import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';
import FaqSection from '@/components/FaqSection';

export const metadata: Metadata = {
  title: 'Contact | Start a Project',
  description:
    'Start a software project with Orenty. Websites, apps, and AI automation built for growing businesses.',
};

export default function ContactPage() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-12 lg:py-20 w-full">
      <div className="max-w-3xl mb-12">
        <span className="eyebrow-label block mb-3">GET IN TOUCH</span>
        <h1 className="h1-hero text-text mb-4">
          Start a project with Orenty.
        </h1>
        <p className="sub-paragraph text-text-2">
          Tell us what you need built. We will review your goals, recommend a clean technical architecture, and provide honest timeline and cost estimates.
        </p>
      </div>

      <ContactForm />

      <div className="mt-20">
        <FaqSection />
      </div>
    </div>
  );
}

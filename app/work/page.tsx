import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';
import { ArrowRight, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Work & Case Studies',
  description:
    'Case studies and software systems engineered by Orenty for businesses and clients.',
};

const caseStudies = [
  {
    id: 'cs-01',
    client: 'Enterprise Client [CONFIRM]',
    category: 'Web Platform & Cloud Architecture',
    result: 'Sub-second real-time dashboards reducing operational overhead by 40% [CONFIRM].',
    slug: 'cloud-platform',
  },
  {
    id: 'cs-02',
    client: 'FinTech Startup [CONFIRM]',
    category: 'Mobile Application & Security',
    result: 'Cross-platform iOS and Android launch reaching 50k downloads [CONFIRM].',
    slug: 'fintech-app',
  },
  {
    id: 'cs-03',
    client: 'Logistics Network [CONFIRM]',
    category: 'AI Workflow Automation',
    result: 'Automated document extraction pipeline processing 10k invoices daily [CONFIRM].',
    slug: 'ai-automation-pipeline',
  },
];

export default function WorkPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[150px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl mb-8">
          <span className="eyebrow-label block mb-3">WORK & CASE STUDIES</span>
          <h1 className="h1-hero text-text mb-6">
            Case studies & client work.
          </h1>
          <p className="sub-paragraph text-text-2">
            Explore how we help ambitious businesses build and scale software, web platforms, and automated AI systems.
          </p>
        </div>

        {/* Founder Confirmation Notice */}
        <div className="inline-flex items-center gap-3 rounded-card border border-border bg-surface-2 px-5 py-3 text-xs text-text-3 mb-10 max-w-2xl">
          <AlertTriangle size={16} className="text-warm shrink-0" />
          <span>
            [CONFIRM: Replace placeholder case studies with verified client deliverables and metrics before public announcement]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs) => (
            <GlassCard key={cs.id} className="p-7 flex flex-col justify-between h-full">
              <div>
                <div className="h-44 w-full rounded-md bg-surface-3 border border-border flex items-center justify-center text-text-3 text-xs font-medium mb-6">
                  {cs.client}
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-secondary block mb-2">
                  {cs.category}
                </span>

                <h2 className="h3-card text-text mb-3">
                  {cs.client}
                </h2>

                <p className="text-sm text-text-2 leading-relaxed mb-6 font-normal">
                  {cs.result}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <Link
                  href="/contact"
                  className="btn-tertiary text-sm"
                >
                  <span>Discuss similar project</span>
                  <ArrowRight size={14} className="btn-arrow" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center py-12 border-t border-border">
          <h2 className="h2-section text-text mb-4">
            Have a project in mind?
          </h2>
          <p className="sub-paragraph text-text-2 max-w-md mx-auto mb-8">
            Tell us about your requirements. We’ll show you how we would engineer it.
          </p>
          <Button href="/contact" variant="primary">
            <span>Start a project</span>
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
        </div>
      </section>
    </div>
  );
}

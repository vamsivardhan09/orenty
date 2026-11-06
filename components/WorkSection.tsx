'use client';

import React from 'react';
import Link from 'next/link';
import GlassCard from './GlassCard';
import { ArrowRight } from 'lucide-react';

interface CaseStudy {
  id: string;
  client: string;
  category: string;
  result: string;
  image: string;
  slug: string;
}

// Case studies template [CONFIRM with founder before making visible on production]
const caseStudies: CaseStudy[] = [
  {
    id: 'cs-01',
    client: 'Enterprise Client [CONFIRM]',
    category: 'Web Platform & Cloud Architecture',
    result: 'Sub-second real-time dashboards reducing operational overhead by 40% [CONFIRM].',
    image: '/products/syncedin-preview.webp',
    slug: 'cloud-platform',
  },
  {
    id: 'cs-02',
    client: 'FinTech Startup [CONFIRM]',
    category: 'Mobile Application & Security',
    result: 'Cross-platform iOS and Android launch reaching 50k downloads [CONFIRM].',
    image: '/products/job-pilot-preview.webp',
    slug: 'fintech-app',
  },
  {
    id: 'cs-03',
    client: 'Logistics Network [CONFIRM]',
    category: 'AI Workflow Automation',
    result: 'Automated document extraction pipeline processing 10k invoices daily [CONFIRM].',
    image: '/products/fanbase-preview.webp',
    slug: 'ai-automation-pipeline',
  },
];

interface WorkSectionProps {
  isVisible?: boolean; // Defaults to false as per prompt rule: "If no real case studies exist, build the template, ship the section hidden, and list it under [CONFIRM]"
}

export default function WorkSection({ isVisible = false }: WorkSectionProps) {
  if (!isVisible) return null;

  return (
    <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-28 w-full">
      <div className="mb-12">
        <span className="eyebrow-label block mb-3">CASE STUDIES</span>
        <h2 className="h2-section max-w-2xl text-text mb-4">
          Recent work delivered for clients.
        </h2>
        <p className="sub-paragraph max-w-2xl text-text-2">
          Measurable outcomes engineered with modern software and AI architectures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {caseStudies.map((cs) => (
          <GlassCard key={cs.id} className="flex flex-col justify-between h-full p-6">
            <div>
              <div className="relative h-48 w-full rounded-md overflow-hidden bg-surface-3 mb-6 border border-border">
                <div className="absolute inset-0 flex items-center justify-center text-text-3 text-xs font-medium">
                  {cs.client} Preview
                </div>
              </div>

              <span className="text-xs uppercase tracking-wider text-secondary font-semibold block mb-2">
                {cs.category}
              </span>

              <h3 className="h3-card text-text mb-3">
                {cs.client}
              </h3>

              <p className="text-sm text-text-2 leading-relaxed mb-6">
                {cs.result}
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <Link
                href={`/work/${cs.slug}`}
                className="btn-tertiary text-sm"
              >
                <span>Read case study</span>
                <ArrowRight size={14} className="btn-arrow" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { ArrowRight, ExternalLink, Code2, Cpu, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Work & Systems | Engineering Case Studies',
  description:
    'Software architectures, platforms, and AI automations engineered by Orenty for businesses and high-growth ventures.',
};

const caseStudies = [
  {
    id: 'cs-01',
    client: 'G1 Mart',
    category: 'Hyperlocal E-Commerce Platform',
    result: 'Engineered a high-performance Next.js storefront delivering sub-second catalogue browsing, live inventory sync across thousands of SKUs, and single-tap checkout.',
    slug: 'g1-mart',
    image: '/products/g1-mart-preview.webp',
    websiteUrl: 'https://g1mart.in/',
    isLive: true,
    tags: ['Next.js 15', 'TypeScript', 'Tailwind', 'Real-time Stock'],
  },
  {
    id: 'cs-02',
    client: 'Enterprise Financial Gateway',
    category: 'Mobile Platform & Security',
    result: 'Architected a hardened cross-platform mobile client with biometric authentication, AES-256 local encrypted cache, and sub-100ms API response pipelines.',
    slug: 'fintech-app',
    isLive: false,
    icon: Smartphone,
    tags: ['React Native', 'TypeScript', 'FastAPI', 'Biometrics'],
  },
  {
    id: 'cs-03',
    client: 'Autonomous Operations Pipeline',
    category: 'AI Workflow Automation',
    result: 'Constructed an end-to-end unstructured document ingestion and extraction pipeline utilizing deterministic OCR parsers and LLM validation routines.',
    slug: 'ai-automation-pipeline',
    isLive: false,
    icon: Cpu,
    tags: ['Python', 'Vector DB', 'LangChain', 'PostgreSQL'],
  },
];

export default function WorkPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[160px]" />

      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl mb-12">
          <span className="eyebrow-label block mb-3 text-neutral-400 font-mono">SELECTED DELIVERABLES</span>
          <h1 className="h1-hero text-text mb-4">
            Case studies & client systems.
          </h1>
          <p className="sub-paragraph text-text-2">
            A selection of software platforms, high-velocity web architectures, and autonomous AI systems engineered for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((cs) => {
            const Icon = cs.icon || Code2;
            return (
              <GlassCard key={cs.id} className="p-7 flex flex-col justify-between h-full">
                <div>
                  {/* Visual Preview Frame */}
                  {cs.image ? (
                    <div className="relative h-44 w-full rounded-lg overflow-hidden border border-white/[0.08] bg-black/40 mb-6 group">
                      <Image
                        src={cs.image}
                        alt={`${cs.client} interface`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="h-44 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] flex flex-col items-center justify-center text-center p-6 mb-6">
                      <div className="h-10 w-10 rounded-lg bg-white/[0.05] border border-white/[0.1] text-secondary flex items-center justify-center mb-3">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{cs.category}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-medium text-secondary uppercase tracking-wider">
                      {cs.category}
                    </span>
                    {cs.isLive && (
                      <Badge variant="live" className="text-[11px]">
                        Live Platform
                      </Badge>
                    )}
                  </div>

                  <h2 className="h3-card text-text mb-3">
                    {cs.client}
                  </h2>

                  <p className="text-sm text-text-2 leading-relaxed mb-6 font-normal">
                    {cs.result}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cs.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-400 bg-white/[0.03] border border-white/[0.06]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  {cs.websiteUrl ? (
                    <a
                      href={cs.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white hover:text-secondary font-medium transition-colors"
                    >
                      <span>Visit live store</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-xs text-neutral-500 font-mono">Client production</span>
                  )}

                  <Link
                    href="/contact"
                    className="btn-tertiary text-xs"
                  >
                    <span>Discuss project</span>
                    <ArrowRight size={12} className="btn-arrow" />
                  </Link>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center py-14 border-t border-border">
          <h2 className="h2-section text-text mb-3">
            Have a project in mind?
          </h2>
          <p className="sub-paragraph text-text-2 max-w-md mx-auto mb-8 font-normal">
            Tell us about your requirements. We’ll show you how we would engineer the architecture.
          </p>
          <Button href="/contact" variant="primary">
            <span>Start a project</span>
            <ArrowRight size={14} className="btn-arrow" />
          </Button>
        </div>
      </section>
    </div>
  );
}

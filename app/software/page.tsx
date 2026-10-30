import React from 'react';
import type { Metadata } from 'next';
import { siteContent } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import TextReveal from '@/components/TextReveal';
import SoftwareContactForm from '@/components/SoftwareContactForm';
import { Code2, Globe, Cpu, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Software Solutions',
  description:
    'Orenty Software Solutions engineers bespoke software development, high-performance web applications, AI automation agents, and technical growth strategy for businesses.',
};

export default function SoftwarePage() {
  const iconMap: Record<string, React.ElementType> = {
    Code2,
    Globe,
    Cpu,
    TrendingUp,
  };

  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-indigo-600/15 blur-[150px]" />

      {/* Header Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-20 pb-12 w-full text-center md:text-left scroll-mt-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-indigo-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>DIVISION // 01 // CLIENT ENGINEERING</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]">
            <TextReveal as="span">Software Solutions.</TextReveal>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 font-body leading-relaxed">
            We partner with innovative enterprises to engineer resilient software architectures, cinematic web flagships, and autonomous AI pipelines designed to compound business advantages.
          </p>
        </div>
      </section>

      {/* Capabilities / Services Grid: Single-frame GlassCards */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(60px,8vh,100px)] w-full scroll-mt-24">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-semibold block mb-2">
            CORE CAPABILITIES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Engineering services built for scale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.services.map((svc, idx) => {
            const Icon = iconMap[svc.iconName] || Code2;

            return (
              <GlassCard
                key={svc.id}
                accentColor="#6366f1"
                eyebrow={`CAPABILITY // 0${idx + 1}`}
                badge="ENTERPRISE READY"
                title={svc.title}
                description={svc.shortDescription}
                footerLabel="Initiate consultation"
                footerHref="#contact-scope"
              >
                <div className="space-y-3 pt-4 border-t border-white/[0.06] mb-6">
                  {svc.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300 font-body">
                      <CheckCircle2 size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Process: Discover > Design > Build > Grow */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(60px,8vh,100px)] w-full border-t border-white/[0.04] scroll-mt-24">
        <div className="max-w-2xl mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-semibold block mb-2">
            EXECUTION METHODOLOGY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            The engineering process.
          </h2>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed font-body">
            Predictable delivery cycles with continuous architectural reviews, rigorous type safety, and direct engineering access.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.process.map((p, idx) => (
            <div
              key={p.step}
              className="relative rounded-2xl border border-white/[0.07] bg-navy-950/60 p-6 backdrop-blur-md"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-2xl font-extrabold text-indigo-400">
                  {p.step}
                </span>
                {idx < 3 && (
                  <ArrowRight size={16} className="hidden lg:block text-slate-600" />
                )}
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 font-body leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Client Contact Form */}
      <section
        id="contact-scope"
        className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 py-[clamp(60px,8vh,100px)] w-full border-t border-white/[0.04] scroll-mt-24"
      >
        <div className="text-center mb-10">
          <span className="font-mono text-xs uppercase tracking-widest text-indigo-400 font-semibold block mb-2">
            ENGAGEMENT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
            Initiate a Project Scope
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-lg mx-auto font-body leading-relaxed">
            Tell us about your requirements, timeline, and goals. We prepare an architectural assessment and timeline estimate.
          </p>
        </div>

        <SoftwareContactForm />
      </section>
    </div>
  );
}

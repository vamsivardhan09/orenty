import React from 'react';
import type { Metadata } from 'next';
import { siteContent } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import ContactForm from '@/components/ContactForm';
import { Globe, Smartphone, Cpu, TrendingUp, Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services | Software, Web & AI Solutions',
  description:
    'Custom websites, web apps, mobile apps, and AI automation built for growing businesses.',
};

const iconMap = {
  Globe,
  Smartphone,
  Cpu,
  TrendingUp,
};

export default function ServicesPage() {
  const { services } = siteContent;

  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[150px]" />

      {/* Header Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl">
          <span className="eyebrow-label block mb-3">SERVICES</span>
          <h1 className="h1-hero text-text mb-6">
            Software development, apps, and AI automation.
          </h1>
          <p className="sub-paragraph text-text-2">
            We engineer websites, mobile apps, and autonomous AI systems built for real business outcomes. No template bloat, no fragile code.
          </p>
        </div>
      </section>

      {/* 4 Core Services Detailed Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.items.map((svc) => {
            const Icon = iconMap[svc.iconName] || Globe;

            return (
              <GlassCard key={svc.id} id={svc.id} className="p-8 flex flex-col justify-between h-full">
                <div>
                  <div className="h-12 w-12 rounded-xl border border-border bg-surface-3 flex items-center justify-center text-secondary mb-6">
                    <Icon size={24} />
                  </div>

                  <h2 className="h3-card text-text mb-3">
                    {svc.title}
                  </h2>
                  <p className="text-[15px] text-text-2 mb-6 font-normal leading-relaxed">
                    {svc.outcome}
                  </p>

                  <ul className="space-y-3 pt-4 border-t border-border mb-6">
                    {svc.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-text-3 leading-relaxed">
                        <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  className="btn-tertiary text-sm mt-4"
                >
                  <span>Start this project</span>
                  <ArrowRight size={14} className="btn-arrow" />
                </a>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Process: Discover > Design > Build > Launch & grow */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 w-full border-t border-border">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow-label block mb-2">OUR PROCESS</span>
          <h2 className="h2-section text-text">
            How we build together.
          </h2>
          <p className="sub-paragraph text-text-2 mt-2">
            A disciplined, four-phase delivery cycle that keeps projects on schedule and within budget.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.process.map((step) => (
            <div
              key={step.step}
              className="rounded-card border border-border bg-surface-2 p-6 flex flex-col justify-between"
            >
              <div>
                <span className="text-sm font-semibold text-secondary tracking-wider block mb-3">
                  {step.step}
                </span>
                <h3 className="text-lg font-semibold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-2 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 w-full border-t border-border">
        <div className="max-w-2xl mb-12">
          <span className="eyebrow-label block mb-2">PROJECT ENQUIRY</span>
          <h2 className="h2-section text-text">
            Tell us about your project.
          </h2>
          <p className="sub-paragraph text-text-2 mt-2">
            Share your goals and requirements. We review every scope and respond within 24 hours.
          </p>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}

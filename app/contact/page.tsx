import React from 'react';
import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Start a Project | Orenty Engineering & Ventures',
  description:
    'Start a software project with Orenty. High-velocity websites, mobile applications, and custom AI automations engineered for ambitious businesses.',
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#030305] text-white overflow-hidden">
      {/* 1. Ambient Overhead Studio Gallery Lighting (Eliminates dead flat void) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1400px] h-[900px] opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at 50% 20%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Architectural Coordinate Micro-Grid (Precision studio backdrop) */}
      <div
        className="pointer-events-none absolute inset-0 w-full h-full opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* 3. Subtle Central Titanium Specular Hairline */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[550px] opacity-35"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
          boxShadow: '0 0 15px rgba(255,255,255,0.2)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-12 pb-20 lg:pt-16 lg:pb-28 w-full">
        {/* Editorial Top-Brand Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow with Live Studio Beacon */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider bg-white/[0.04] border border-white/[0.1] text-neutral-300 mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="uppercase tracking-widest text-[11px] font-semibold">
              Project Initiation · Direct Founder Review
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-5 leading-[1.05]">
            Start a project <br className="hidden sm:inline" />
            with Orenty.
          </h1>

          <p className="text-neutral-400 text-base sm:text-lg lg:text-[19px] max-w-2xl font-normal leading-relaxed">
            Tell us what you need built. We analyze your requirements, propose a resilient technical architecture, and provide honest timeline and cost estimates within 24 hours.
          </p>
        </div>

        {/* Interactive Luxury Project Scoping Intake */}
        <ContactForm />
      </div>
    </div>
  );
}

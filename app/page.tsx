import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import Hero from '@/components/Hero';
import SceneBackground from '@/components/SceneBackground';
import GlassCard from '@/components/GlassCard';
import HudBox from '@/components/HudBox';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import DriftingLabTiles from '@/components/DriftingLabTiles';
import {
  ArrowRight,
  Code2,
  Box,
  FlaskConical,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';




export default function HomePage() {
  return (
    <div className="relative flex flex-col bg-background">
      {/* 3D Living Light-Beam & Universe Canvas (Fixed Background across sections) */}
      <SceneBackground />

      {/* 1. HERO Section */}
      <Hero />

      {/* 2. WHAT WE ARE // 3 DIVISIONS */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-28 w-full border-t border-white/[0.04]">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>DIVISIONS // 01 - 03</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            <TextReveal as="span">What we are.</TextReveal>
          </h2>
          <p className="mt-4 text-base text-slate-400 font-body leading-relaxed">
            Orenty operates across three synchronized engineering divisions — partnering with leading businesses, crafting sovereign consumer tech, and incubating community-built startups.
          </p>
        </div>

        {/* 3 Division Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {siteContent.divisions.map((div) => {
            const Icon =
              div.id === 'software'
                ? Code2
                : div.id === 'products'
                ? Box
                : FlaskConical;

            return (
              <GlassCard
                key={div.id}
                accentColor={div.accent}
                className="flex flex-col justify-between p-8 group"
              >
                <HudBox
                  label={`DIVISION // ${div.number}`}
                  tag={div.badge}
                  accentColor={div.accent}
                >
                  <div className="mt-4">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 mb-6"
                      style={{ color: div.accent }}
                    >
                      <Icon size={24} />
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {div.title}
                    </h3>
                    <p
                      className="font-mono text-xs uppercase tracking-wider mb-4 font-semibold"
                      style={{ color: div.accent }}
                    >
                      {div.tagline}
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed font-body">
                      {div.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                    <Link
                      href={div.href}
                      className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest font-semibold text-slate-200 hover:text-white transition-colors"
                      data-cursor-expand="true"
                    >
                      <span>Explore {div.id.toUpperCase()}</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </HudBox>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 3. PROPRIETARY PRODUCTS // 4 CARDS */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-28 w-full border-t border-white/[0.04]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>IN-HOUSE PRODUCTS // PIPELINE</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
              <TextReveal as="span">Proprietary builds.</TextReveal>
            </h2>
            <p className="mt-4 text-base text-slate-400 font-body leading-relaxed">
              We design and engineer our own portfolio platforms from zero to launch. Each product operates under honest development milestones.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-300 hover:text-white transition-colors"
          >
            <span>All Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.products.map((prod) => (
            <GlassCard
              key={prod.slug}
              accentColor={prod.accentColor}
              className="p-8 flex flex-col justify-between overflow-hidden relative group"
            >
              {/* Background Ambient Screenshot Watermark */}
              {prod.previewImage && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-15 transition-opacity duration-700 group-hover:opacity-25">
                  <Image
                    src={prod.previewImage}
                    alt={`${prod.name} Preview`}
                    fill
                    className="object-cover object-top filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#060814]/85 to-[#060814]/70" />
                </div>
              )}

              <HudBox
                label={prod.category.toUpperCase()}
                tag={`STATUS: ${prod.status.toUpperCase()}`}
                accentColor={prod.accentColor}
              >
                <div className="mt-3">
                  <h3 className="font-display text-3xl font-extrabold text-white">
                    {prod.name}
                  </h3>
                  <p
                    className="mt-1 font-mono text-xs uppercase tracking-wider font-semibold"
                    style={{ color: prod.accentColor }}
                  >
                    {prod.tagline}
                  </p>
                  <p className="mt-4 text-sm text-slate-400 font-body leading-relaxed">
                    {prod.description}
                  </p>

                  {/* Embedded Browser Preview Frame */}
                  {prod.previewImage && (
                    <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.08] bg-black/60 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:border-white/20">
                      {/* Browser Frame Top Bar */}
                      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.03] px-3.5 py-2">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-rose-500/60" />
                          <span className="h-2 w-2 rounded-full bg-amber-500/60" />
                          <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
                        </div>
                        <div className="flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-0.5 text-[10px] font-mono text-slate-400">
                          <span className="text-[8px] text-emerald-400">●</span>
                          <span className="truncate max-w-[130px] sm:max-w-[180px]">
                            {prod.websiteUrl ? prod.websiteUrl.replace('https://', '').replace(/\/$/, '') : `${prod.slug}.orenty.in`}
                          </span>
                        </div>
                        {prod.websiteUrl ? (
                          <a
                            href={prod.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-violet-300 hover:text-white uppercase tracking-wider transition-colors"
                          >
                            <span>LIVE</span>
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                            PREVIEW
                          </span>
                        )}
                      </div>

                      {/* Image Preview with subtle bottom gradient fade */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                        <Image
                          src={prod.previewImage}
                          alt={`${prod.name} Interface`}
                          fill
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060814]/90 via-transparent to-transparent" />
                      </div>
                    </div>
                  )}

                  {/* Feature Bullets */}
                  <ul className="mt-6 space-y-2.5">
                    {prod.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2
                          size={15}
                          className="shrink-0 mt-0.5"
                          style={{ color: prod.accentColor }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link & Action */}
                <div className="mt-8 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  >
                    View Details
                  </Link>

                  <MagneticButton href={prod.ctaUrl} variant="primary" className="!px-4 !py-2 !text-[10px]">
                    {prod.ctaLabel}
                  </MagneticButton>
                </div>
              </HudBox>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* 4. STARTUP LAB TEASER // DRIFTING TILES & MODEL */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-28 w-full border-t border-white/[0.04] overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-pink-600/10 blur-[150px]" />

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-pink-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            <span>ORENTY STARTUP LAB // INCUBATION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            <TextReveal as="span">Solve the challenge. Earn ownership.</TextReveal>
          </h2>
          <p className="mt-4 text-base text-slate-400 font-body leading-relaxed">
            {siteContent.lab.description}
          </p>

          {/* Honest Ownership Callout */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-lg border border-pink-500/30 bg-pink-950/20 px-4 py-2 text-xs text-pink-200">
            <ShieldAlert size={16} className="text-pink-400 shrink-0" />
            <span>{siteContent.lab.ownershipNote}</span>
          </div>
        </div>

        {/* 5-Step Process Horizontal Bar */}
        <div className="mb-16 grid grid-cols-2 md:grid-cols-5 gap-4">
          {siteContent.lab.steps.map((st) => (
            <div
              key={st.step}
              className="rounded-xl border border-white/[0.06] bg-navy-950/60 p-4 backdrop-blur-md"
            >
              <span className="font-mono text-xs font-bold text-pink-400 block mb-1">
                STEP // {st.step}
              </span>
              <h4 className="font-display text-sm font-bold text-white mb-1">{st.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{st.detail}</p>
            </div>
          ))}
        </div>

        {/* Drifting Challenge Feed */}
        <DriftingLabTiles />

        {/* View All Lab Challenges link */}
        <div className="mt-12 text-center">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span>Explore Complete Startup Lab Framework</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 5. FINAL HIGH-IMPACT APPLY CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-28 w-full border-t border-white/[0.04]">
        <GlassCard accentColor="#8b5cf6" className="relative p-12 md:p-20 text-center overflow-hidden">
          <HudBox label="ORENTY // SYSTEM CTA" tag="APPLICATIONS OPEN" accentColor="#8b5cf6">
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold mb-4">
                ENGINEER THE FUTURE WITH US
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white uppercase tracking-tight leading-none mb-6">
                Ready to build what&apos;s next?
              </h2>
              <p className="text-base text-slate-300 mb-10 leading-relaxed font-body">
                Whether you want to partner for bespoke software engineering, join early product access, or solve a Startup Lab challenge for co-ownership — the door is open.
              </p>

              {/* Single Call To Action: Apply */}
              <MagneticButton href="/apply" variant="primary" className="!px-8 !py-4 !text-sm">
                Apply Now
                <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </HudBox>
        </GlassCard>
      </section>
    </div>
  );
}

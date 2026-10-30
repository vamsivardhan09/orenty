import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import HudBox from '@/components/HudBox';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import { CheckCircle2, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Proprietary Products',
  description:
    'Explore Orenty proprietary products: SyncedIn (AI networking), Fanbase (creator economy), Job Pilot (AI career copilot), and Pujari.ai (spiritual tech).',
};

export default function ProductsPage() {
  return (
    <div className="relative flex flex-col bg-background min-h-screen">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute top-24 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-violet-600/15 blur-[150px]" />

      {/* Header */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-20 pb-16 w-full text-center md:text-left">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>DIVISION // 02 // PROPRIETARY BUILDS</span>
          </div>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight leading-none">
            <TextReveal as="span">Proprietary Products.</TextReveal>
          </h1>
          <p className="mt-6 text-lg text-slate-300 font-body leading-relaxed">
            Four focused software platforms designed, engineered, and incubated in-house. Transparently built in the open with active developer and early-adopter access.
          </p>
        </div>
      </section>

      {/* Products Showcase */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.products.map((prod) => (
            <GlassCard
              key={prod.slug}
              accentColor={prod.accentColor}
              className="p-8 md:p-10 flex flex-col justify-between overflow-hidden relative group"
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
                label={`PRODUCT // ${prod.category.toUpperCase()}`}
                tag={`STATUS: ${prod.status.toUpperCase()}`}
                accentColor={prod.accentColor}
              >
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                      {prod.name}
                    </h2>
                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${prod.accentColor}18`,
                        color: prod.accentColor,
                        border: `1px solid ${prod.accentColor}35`,
                      }}
                    >
                      {prod.status}
                    </span>
                  </div>

                  <p
                    className="font-mono text-xs uppercase tracking-wider font-semibold mb-4"
                    style={{ color: prod.accentColor }}
                  >
                    {prod.tagline}
                  </p>

                  <p className="text-sm text-slate-300 font-body leading-relaxed mb-6">
                    {prod.description}
                  </p>

                  {/* Embedded Browser Preview Frame */}
                  {prod.previewImage && (
                    <div className="mb-6 overflow-hidden rounded-xl border border-white/[0.08] bg-black/60 shadow-2xl backdrop-blur-md transition-all duration-300 group-hover:border-white/20">
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
                            <span>LIVE DEMO</span>
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

                  {/* Features List */}
                  <div className="space-y-3 pt-5 border-t border-white/[0.06]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-semibold block">
                      ARCHITECTURAL CAPABILITIES
                    </span>
                    {prod.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2
                          size={15}
                          className="shrink-0 mt-0.5"
                          style={{ color: prod.accentColor }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action footer */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest font-semibold text-slate-300 hover:text-white transition-colors group"
                  >
                    <span>View Product Scope</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>

                  <MagneticButton
                    href={prod.ctaUrl}
                    variant="primary"
                    className="!px-4 !py-2.5 !text-[11px]"
                  >
                    {prod.ctaLabel}
                  </MagneticButton>
                </div>
              </HudBox>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Incubation Notice Banner */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-white/[0.04]">
        <div className="rounded-2xl border border-violet-500/20 bg-navy-950/70 p-8 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-2">
              <Sparkles size={14} />
              <span>CO-BUILD WITH ORENTY</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Want to earn ownership in one of these products?
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-body">
              Through the Orenty Startup Lab, we release open architectural challenges for our product pipeline. Top contributors earn co-founding ownership.
            </p>
          </div>

          <MagneticButton href="/lab" variant="primary">
            Visit Startup Lab
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent, Product } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import HudBox from '@/components/HudBox';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import { CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Layers, Terminal, ExternalLink } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return siteContent.products.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = siteContent.products.find((p) => p.slug === slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | ${product.tagline}`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Orenty Products`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = siteContent.products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find linked lab challenge if applicable
  const linkedChallenge = siteContent.lab.challenges.find(
    (c) =>
      c.title.toLowerCase().includes(product.name.toLowerCase()) ||
      c.brief.toLowerCase().includes(product.name.toLowerCase())
  );

  return (
    <div className="relative flex flex-col bg-background min-h-screen overflow-hidden">
      {/* Dynamic Ambient Accent Glow matching this product's accentColor */}
      <div
        className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full blur-[160px] opacity-25"
        style={{ backgroundColor: product.accentColor }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 pt-20 pb-28 w-full">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          <span>Back to All Products</span>
        </Link>

        {/* Product Identity Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${product.accentColor}18`,
                color: product.accentColor,
                border: `1px solid ${product.accentColor}40`,
              }}
            >
              STATUS: {product.status.toUpperCase()}
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              CATEGORY // {product.category}
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight leading-none">
            <TextReveal as="span">{product.name}</TextReveal>
          </h1>

          <p
            className="mt-4 font-mono text-base sm:text-lg uppercase tracking-wide font-semibold"
            style={{ color: product.accentColor }}
          >
            {product.tagline}
          </p>

          <p className="mt-6 text-lg text-slate-300 font-body leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>

        {/* Product Live Showcase Frame */}
        {product.previewImage && (
          <div className="mb-16 overflow-hidden rounded-2xl border border-white/[0.1] bg-black/70 shadow-2xl backdrop-blur-xl">
            {/* Browser Window Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.03] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-black/70 border border-white/[0.06] px-4 py-1 text-xs font-mono text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {product.websiteUrl ? product.websiteUrl.replace('https://', '').replace(/\/$/, '') : `${product.slug}.orenty.in`}
                </span>
              </div>
              {product.websiteUrl ? (
                <a
                  href={product.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-300 hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>Open Live Application</span>
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  PREVIEW MOCKUP
                </span>
              )}
            </div>

            {/* Viewport Frame */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <Image
                src={product.previewImage}
                alt={`${product.name} High Resolution Preview`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>
          </div>
        )}

        {/* Product Architectural Deep Dive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Features */}
          <div className="lg:col-span-7">
            <GlassCard accentColor={product.accentColor} className="p-8 h-full">
              <HudBox
                label="TECHNICAL SPECIFICATIONS"
                tag="CORE ARCHITECTURE"
                accentColor={product.accentColor}
              >
                <div className="mt-4 space-y-6">
                  <h3 className="font-display text-xl font-bold text-white">
                    Key Features & Innovations
                  </h3>
                  <div className="space-y-4">
                    {product.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-lg bg-navy-900/60 p-4 border border-white/[0.04]">
                        <CheckCircle2
                          size={18}
                          className="shrink-0 mt-0.5"
                          style={{ color: product.accentColor }}
                        />
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block mb-1">
                            CAPABILITY 0{idx + 1}
                          </span>
                          <p className="text-sm text-slate-200 font-body leading-relaxed">
                            {feat}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </HudBox>
            </GlassCard>
          </div>

          {/* Sidebar CTA & Lab Connection */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Early Access Action Card */}
            <GlassCard accentColor={product.accentColor} className="p-8">
              <HudBox label="ACCESS PORTAL" tag="WAITLIST" accentColor={product.accentColor}>
                <div className="mt-4">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Request Early Access
                  </h3>
                  <p className="text-xs text-slate-400 font-body leading-relaxed mb-6">
                    {product.name} is currently in active development. Secure your position in the private beta testing cohort.
                  </p>

                  <MagneticButton
                    href={product.ctaUrl}
                    variant="primary"
                    className="w-full !py-3.5 !text-xs"
                  >
                    {product.ctaLabel}
                    <ArrowRight size={14} />
                  </MagneticButton>
                </div>
              </HudBox>
            </GlassCard>

            {/* Co-Ownership Lab Challenge Card if available */}
            {linkedChallenge && (
              <GlassCard accentColor="#ec4899" className="p-8">
                <HudBox label="STARTUP LAB CHALLENGE" tag="CO-OWNERSHIP" accentColor="#ec4899">
                  <div className="mt-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-pink-400 font-bold block mb-1">
                      CHALLENGE {linkedChallenge.code}
                    </span>
                    <h4 className="font-display text-base font-bold text-white mb-2">
                      {linkedChallenge.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-body leading-relaxed mb-4 line-clamp-3">
                      {linkedChallenge.brief}
                    </p>

                    <Link
                      href={`/apply?challenge=${linkedChallenge.code}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-pink-300 hover:text-white transition-colors"
                    >
                      <span>Apply to Solve This Challenge</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </HudBox>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Honest Milestone Status Footer */}
        <div className="rounded-xl border border-white/[0.06] bg-navy-950/70 p-6 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full animate-ping"
              style={{ backgroundColor: product.accentColor }}
            />
            <span className="font-mono uppercase tracking-wider">
              ROADMAP // CLOSED ALPHA TESTING // Q4 2026
            </span>
          </div>
          <Link
            href="/apply"
            className="font-mono text-violet-300 hover:underline uppercase tracking-wider"
          >
            Apply to Join Core Build Team →
          </Link>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import {
  SyncedInMediaWindow,
  FanbaseMediaWindow,
  JobPilotMediaWindow,
  PujariMediaWindow,
} from '@/components/MediaWindows';
import { CheckCircle2, ArrowLeft, ArrowRight, Award } from 'lucide-react';

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

  const mediaMap: Record<string, React.ReactNode> = {
    syncedin: <SyncedInMediaWindow />,
    fanbase: <FanbaseMediaWindow />,
    'job-pilot': <JobPilotMediaWindow />,
    'pujari-ai': <PujariMediaWindow />,
  };

  // Find linked lab challenge if applicable
  const linkedChallenge = siteContent.lab.challenges.find(
    (c) =>
      c.title.toLowerCase().includes(product.name.toLowerCase()) ||
      c.brief.toLowerCase().includes(product.name.toLowerCase())
  );

  return (
    <div className="relative flex flex-col bg-background min-h-screen overflow-hidden">
      {/* Dynamic Ambient Accent Glow driven strictly by product.accentColor */}
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

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-tight leading-[1.05]">
            <TextReveal as="span">{product.name}</TextReveal>
          </h1>

          <p
            className="mt-4 font-mono text-base sm:text-lg uppercase tracking-wide font-semibold"
            style={{ color: product.accentColor }}
          >
            {product.tagline}
          </p>

          <p className="mt-5 text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-3xl">
            {product.description}
          </p>
        </div>

        {/* Interactive Media Window for this Product */}
        <div className="mb-12 max-w-2xl">
          {mediaMap[product.slug]}
        </div>

        {/* Product Architectural Deep Dive: Single-frame GlassCards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Features */}
          <div className="lg:col-span-7">
            <GlassCard
              accentColor={product.accentColor}
              eyebrow="TECHNICAL SPECIFICATIONS"
              badge="CORE ARCHITECTURE"
              title="Key Features & Innovations"
              className="h-full"
            >
              <div className="space-y-4 pt-3">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-lg bg-navy-900/60 p-4 border border-white/[0.04]"
                  >
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
            </GlassCard>
          </div>

          {/* Sidebar CTA & Lab Connection */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Early Access Action Card: Single Frame */}
            <GlassCard
              accentColor={product.accentColor}
              eyebrow="ACCESS PORTAL"
              badge="WAITLIST"
              title="Request Early Access"
              description={`${product.name} is currently in active development. Secure your position in the private beta testing cohort.`}
            >
              <div className="mt-4">
                <MagneticButton
                  href={product.ctaUrl}
                  variant="primary"
                  className="w-full !py-3.5 !text-xs justify-center"
                >
                  {product.ctaLabel}
                  <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </GlassCard>

            {/* Co-Ownership Lab Challenge Card if available */}
            {linkedChallenge && (
              <GlassCard
                accentColor="#ec4899"
                eyebrow={`STARTUP LAB // ${linkedChallenge.code}`}
                badge="CO-OWNERSHIP"
                title={linkedChallenge.title}
                description={linkedChallenge.brief}
                footerLabel="Solve This Challenge"
                footerHref={`/apply?challenge=${linkedChallenge.code}`}
              >
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-navy-900/80 p-3 border border-white/[0.06] text-xs text-slate-300">
                  <Award size={16} className="text-pink-400 shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-400 block">
                      REWARD POOL
                    </span>
                    <span className="font-semibold text-white">{linkedChallenge.rewardPool}</span>
                  </div>
                </div>
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

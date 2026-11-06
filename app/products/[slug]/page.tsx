import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent, Product } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import ProductLogo from '@/components/ProductLogo';
import ProductWaitlistForm from '@/components/ProductWaitlistForm';
import { Check, ArrowLeft, ArrowRight, Users, Sparkles, Layers, ShieldCheck } from 'lucide-react';

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
    title: `${product.name} | ${product.outcome}`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Orenty Products`,
      description: product.description,
    },
  };
}

// "Who it's for" content definitions for each product
const audienceMap: Record<string, { forWho: string; problemSolved: string; keyBenefit: string }> = {
  syncedin: {
    forWho: 'Founders, senior engineers, and startup operators looking for high-signal collaborators.',
    problemSolved: 'Replaces noisy LinkedIn cold pitches and spam with goal-aligned matching.',
    keyBenefit: 'Find founders and co-builders with complementary technical skills and real working velocity.',
  },
  fanbase: {
    forWho: 'Independent digital creators, writers, educators, and community builders.',
    problemSolved: 'Eliminates algorithmic suppression and exorbitant platform take-rates.',
    keyBenefit: 'Direct communication channels, owned email lists, and frictionless digital membership tiers.',
  },
  'job-pilot': {
    forWho: 'Active job seekers, career transitioners, and engineering candidates.',
    problemSolved: 'Removes the guesswork of applicant tracking systems and generic interview prep.',
    keyBenefit: 'Role-specific resume alignment and realistic AI-powered practice interview simulators.',
  },
  'pujari-ai': {
    forWho: 'Individuals, families, and devotees seeking accurate Vedic ritual guidance and daily panchangam.',
    problemSolved: 'Replaces scattered, contradictory online schedules with verified astronomical calculations.',
    keyBenefit: 'Location-precise panchangam, clear itemized ritual checklists, and authentic phonetic mantra audio.',
  },
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = siteContent.products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const audience = audienceMap[product.slug] || {
    forWho: 'Businesses and forward-thinking individuals [CONFIRM].',
    problemSolved: 'Streamlines complex workflows into intuitive software.',
    keyBenefit: 'Purpose-built software that compounds productivity.',
  };

  const otherProducts = siteContent.products.filter((p) => p.slug !== product.slug);

  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Product-specific subtle ambient glow */}
      <div
        className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[550px] w-[850px] rounded-full blur-[170px] opacity-15"
        style={{ backgroundColor: product.accentColor }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-12 pt-16 pb-28 w-full">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          <span>Back to products</span>
        </Link>

        {/* 1. Hero: Name, one-line outcome, status badge, CTA by status */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="relative flex items-center justify-center p-2.5 rounded-xl bg-surface-3"
              style={{
                boxShadow: `0 0 20px ${product.accentColor}35`,
              }}
            >
              <ProductLogo slug={product.slug} size={32} />
            </div>
            <div>
              <span className="text-xs text-text-3 font-medium uppercase tracking-wider block">
                {product.category}
              </span>
              <h1 className="h1-hero text-text">
                {product.name}
              </h1>
            </div>
            <div className="ml-auto">
              <Badge variant="building" className="text-xs">
                {product.status}
              </Badge>
            </div>
          </div>

          <p className="text-xl sm:text-2xl text-text-2 font-medium mb-6 max-w-2xl">
            {product.outcome}
          </p>

          <p className="sub-paragraph text-text-3 mb-8 max-w-2xl">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            <Button href="#waitlist" variant="primary">
              <span>{product.ctaLabel}</span>
              <ArrowRight size={15} className="btn-arrow" />
            </Button>
          </div>
        </div>

        {/* 2. Device Mockup Preview Screenshot */}
        {product.previewImage && (
          <div className="mb-16 overflow-hidden rounded-card border border-border bg-surface-2 shadow-2xl">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-3">
              <Image
                src={product.previewImage}
                alt={`${product.name} Preview`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-2/40 via-transparent to-transparent" />
            </div>
          </div>
        )}

        {/* 3. Key Features */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="eyebrow-label block mb-2">FEATURES</span>
            <h2 className="h2-section text-text">
              What it does.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-card border border-border bg-surface-2 flex flex-col justify-between"
              >
                <div>
                  <div className="h-8 w-8 rounded-lg bg-surface-3 border border-border flex items-center justify-center text-secondary mb-4 text-xs font-semibold">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-semibold text-text mb-2">
                    Key Feature 0{idx + 1}
                  </h3>
                  <p className="text-sm text-text-2 leading-relaxed">
                    {feat}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. "Who it's for" Section */}
        <div className="mb-16 rounded-card border border-border bg-surface-2 p-8 md:p-10">
          <span className="eyebrow-label block mb-2">AUDIENCE & PURPOSE</span>
          <h2 className="h2-section text-text mb-6">
            Who it's for.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-text mb-2">Target Users</h3>
              <p className="text-sm text-text-2 leading-relaxed">{audience.forWho}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text mb-2">Problem Solved</h3>
              <p className="text-sm text-text-2 leading-relaxed">{audience.problemSolved}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text mb-2">Core Advantage</h3>
              <p className="text-sm text-text-2 leading-relaxed">{audience.keyBenefit}</p>
            </div>
          </div>
        </div>

        {/* 5. Honest Status & What's Next */}
        <div className="mb-16 rounded-card border border-border bg-surface-2 p-8 md:p-10">
          <span className="eyebrow-label block mb-2">CURRENT STATUS</span>
          <h2 className="h3-card text-text mb-3">
            What's next for {product.name}
          </h2>
          <p className="text-[15px] text-text-2 leading-relaxed max-w-2xl mb-6">
            {product.name} is actively being engineered in-house. We are finalizing core architecture milestones and preparing private beta slots [CONFIRM timeline].
          </p>
          <div className="inline-flex items-center gap-2 text-xs text-text-3 font-medium">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span>Active development sprint</span>
          </div>
        </div>

        {/* 6. Waitlist Email Capture */}
        <div id="waitlist" className="mb-20 rounded-card border border-border-top bg-surface-2 p-8 md:p-12 text-center flex flex-col items-center">
          <span className="eyebrow-label block mb-2">EARLY ACCESS</span>
          <h2 className="h2-section text-text mb-3">
            Join the waitlist for {product.name}
          </h2>
          <p className="sub-paragraph text-text-2 max-w-lg mb-8">
            Be the first to test when private beta slots open. Zero spam, honest updates only.
          </p>

          <ProductWaitlistForm productName={product.name} slug={product.slug} />
        </div>

        {/* 7. Other Products */}
        <div className="pt-12 border-t border-border">
          <h3 className="text-lg font-semibold text-text mb-6">
            Explore other Orenty products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="rounded-card border border-border bg-surface-2 p-5 hover:border-border-top transition-colors group block"
              >
                <div className="flex items-center gap-3 mb-2">
                  <ProductLogo slug={p.slug} size={20} />
                  <span className="text-sm font-semibold text-text group-hover:text-primary-glow transition-colors">
                    {p.name}
                  </span>
                </div>
                <p className="text-xs text-text-3 line-clamp-2">
                  {p.outcome}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

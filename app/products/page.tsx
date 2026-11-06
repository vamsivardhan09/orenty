import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import Badge from '@/components/Badge';
import ProductLogo from '@/components/ProductLogo';
import Button from '@/components/Button';
import { Check, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Products | Proprietary Platforms Built by Orenty',
  description:
    'Explore Orenty proprietary products: SyncedIn (AI networking), Fanbase (creator economy), Job Pilot (AI career copilot), Pujari.ai (spiritual tech), and G1 Mart (e-commerce platform).',
};

export default function ProductsPage() {
  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/10 blur-[150px]" />

      {/* Header */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-16 pb-12 w-full">
        <div className="max-w-3xl">
          <span className="eyebrow-label block mb-3">PRODUCTS</span>
          <h1 className="h1-hero text-text mb-6">
            Products & Client Platforms.
          </h1>
          <p className="sub-paragraph text-text-2">
            Explore proprietary software built and owned by Orenty, alongside proven client platforms engineered to scale.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.products.map((prod) => (
            <GlassCard
              key={prod.slug}
              className="p-8 md:p-10 flex flex-col justify-between h-full"
            >
              <div>
                {/* Product Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="relative flex items-center justify-center p-2 rounded-lg bg-surface-3"
                      style={{
                        boxShadow: `0 0 16px ${prod.accentColor}30`,
                      }}
                    >
                      <ProductLogo slug={prod.slug} size={26} />
                    </div>
                    <div>
                      <h2 className="h3-card text-text">
                        {prod.name}
                      </h2>
                      <span className="text-xs text-text-3 font-medium">
                        {prod.category}
                      </span>
                    </div>
                  </div>

                  <Badge variant={prod.status === 'live' ? 'live' : 'building'} className="text-xs">
                    {prod.status === 'live' ? 'Live · Client Work' : prod.status}
                  </Badge>
                </div>

                {/* Clean Device Mockup Frame */}
                {prod.previewImage && (
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden rounded-md border border-border bg-surface-3 mb-6 shadow-sm">
                    <Image
                      src={prod.previewImage}
                      alt={`${prod.name} Interface`}
                      fill
                      className="object-cover object-top transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-2/80 via-transparent to-transparent" />
                  </div>
                )}

                {/* Outcome line */}
                <p className="text-base text-text-2 leading-relaxed mb-6 font-normal">
                  {prod.outcome}
                </p>

                {/* Feature bullets */}
                <ul className="space-y-3 mb-8 pt-4 border-t border-border">
                  {prod.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-text-3 font-normal leading-relaxed">
                      <Check size={16} className="text-secondary shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons: Status-based CTA + View Details */}
              <div className="pt-5 border-t border-border flex flex-col sm:flex-row items-center gap-4">
                {prod.status === 'live' && prod.websiteUrl ? (
                  <a
                    href={prod.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto text-sm"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ArrowRight size={14} className="btn-arrow" />
                  </a>
                ) : (
                  <Button
                    href={`/products/${prod.slug}#waitlist`}
                    variant="primary"
                    className="w-full sm:w-auto"
                  >
                    <span>{prod.ctaLabel}</span>
                    <ArrowRight size={14} className="btn-arrow" />
                  </Button>
                )}
                <Link
                  href={`/products/${prod.slug}`}
                  className="btn-tertiary text-sm text-text-2 hover:text-text"
                >
                  <span>View product details</span>
                  <ArrowRight size={14} className="btn-arrow" />
                </Link>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Startup Lab link */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 w-full border-t border-border text-center">
        <h2 className="h2-section text-text mb-4">
          Want to build these products with us?
        </h2>
        <p className="sub-paragraph text-text-2 max-w-xl mx-auto mb-8">
          In our Startup Lab, top builders solve architecture challenges and may earn ownership in what we launch.
        </p>
        <Button href="/careers" variant="secondary">
          <span>Explore Startup Lab challenges</span>
          <ArrowRight size={15} className="btn-arrow" />
        </Button>
      </section>
    </div>
  );
}

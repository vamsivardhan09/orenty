'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import Badge from './Badge';
import ProductLogo from './ProductLogo';
import { Check, ArrowRight } from 'lucide-react';

export default function ProductsSection() {
  const { productsSection } = siteContent;

  return (
    <section id="products" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-28 w-full border-t border-border">
      <div className="mb-12">
        <span className="eyebrow-label block mb-3">{productsSection.eyebrow}</span>
        <h2 className="h2-section max-w-2xl text-text mb-4">
          {productsSection.headline}
        </h2>
        <p className="sub-paragraph max-w-2xl text-text-2">
          {productsSection.subheadline}
        </p>
      </div>

      {/* 4 Product Cards (Mobile: Overlapping Stack; Tablet: 2-col; Desktop: 4-col) */}
      <StackContainer totalCards={productsSection.items.length}>
        {productsSection.items.map((prod) => (
          <GlassCard
            key={prod.slug}
            className="flex flex-col justify-between h-full p-6 md:p-7"
          >
            <div>
              {/* Product Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="relative flex items-center justify-center p-1.5 rounded-lg bg-surface-3"
                    style={{
                      boxShadow: `0 0 16px ${prod.accentColor}30`,
                    }}
                  >
                    <ProductLogo slug={prod.slug} size={22} />
                  </div>
                  <h3 className="h3-card text-text">
                    {prod.name}
                  </h3>
                </div>

                <Badge variant="building" className="text-xs">
                  {prod.status}
                </Badge>
              </div>

              {/* Clean Device Mockup Frame without URL bar / vercel text */}
              {prod.previewImage && (
                <div className="relative h-44 sm:h-48 w-full overflow-hidden rounded-md border border-border bg-surface-3 mb-5 shadow-sm">
                  <Image
                    src={prod.previewImage}
                    alt={`${prod.name} Interface`}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-2/80 via-transparent to-transparent" />
                </div>
              )}

              {/* One outcome line */}
              <p className="text-[14.5px] text-text-2 leading-relaxed font-normal mb-5">
                {prod.outcome}
              </p>

              {/* Max 3 feature bullets */}
              <ul className="space-y-2 mb-6">
                {prod.features.slice(0, 3).map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-xs text-text-3 font-normal leading-relaxed">
                    <Check size={13} className="text-secondary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions: CTA by status + View details */}
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Link
                href={`/products/${prod.slug}#waitlist`}
                className="btn-secondary w-full text-center text-xs justify-center py-2.5 min-h-[40px]"
              >
                <span>{prod.ctaLabel}</span>
              </Link>
              <Link
                href={`/products/${prod.slug}`}
                className="btn-tertiary text-xs justify-center text-text-3 hover:text-text mt-1"
              >
                <span>View details</span>
                <ArrowRight size={13} className="btn-arrow" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </StackContainer>
    </section>
  );
}

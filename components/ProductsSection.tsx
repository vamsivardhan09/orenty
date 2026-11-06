'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import SectionHeader from './SectionHeader';
import GlassCard from './GlassCard';
import StackContainer from './StackContainer';
import Badge from './Badge';
import ProductLogo from './ProductLogo';
import { ArrowRight } from 'lucide-react';

export default function ProductsSection() {
  const { productsSection } = siteContent;

  return (
    <section id="products" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-20 lg:py-28 w-full border-t border-surface-border">
      <SectionHeader
        eyebrow={productsSection.eyebrow}
        headline={productsSection.headline}
        subheadline={productsSection.subheadline}
      />

      {/* 4 Visual-First Cards (Mobile: Stacking; Tablet: 2-col; Desktop: 4-col) */}
      <StackContainer totalCards={productsSection.items.length}>
        {productsSection.items.map((prod) => (
          <GlassCard
            key={prod.slug}
            className="flex flex-col justify-between h-full p-6 md:p-7"
          >
            <div>
              {/* Top: Product Name, Logo, & Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Product Logo with its own subtle accent glow */}
                  <div
                    className="relative flex items-center justify-center p-1.5 rounded-lg"
                    style={{
                      boxShadow: `0 0 16px ${prod.accentColor}30`,
                    }}
                  >
                    <ProductLogo slug={prod.slug} size={24} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-text tracking-tight">
                    {prod.name}
                  </h3>
                </div>

                <Badge variant="building" className="text-[11px] font-mono">
                  {prod.status}
                </Badge>
              </div>

              {/* Large Readable Screenshot Preview (180px height desktop, 150px mobile) */}
              {prod.previewImage && (
                <div className="relative h-40 sm:h-44 w-full overflow-hidden rounded-md border border-surface-border bg-bg-elevated mb-5">
                  <Image
                    src={prod.previewImage}
                    alt={`${prod.name} Preview`}
                    fill
                    className="object-cover object-top transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-elevated/70 via-transparent to-transparent" />
                </div>
              )}

              {/* One outcome line */}
              <p className="text-sm text-text-2 leading-relaxed font-normal mb-6">
                {prod.outcome}
              </p>
            </div>

            {/* Learn more link */}
            <div className="pt-4 border-t border-surface-border">
              <Link
                href={`/products/${prod.slug}`}
                className="btn-tertiary text-xs uppercase tracking-wider text-secondary hover:text-white"
              >
                <span>Learn more</span>
                <ArrowRight size={14} className="btn-arrow" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </StackContainer>
    </section>
  );
}

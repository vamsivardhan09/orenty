'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import GlassCard from './GlassCard';
import ProductLogo from './ProductLogo';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function ProductsSection() {
  const { productsSection } = siteContent;

  return (
    <section id="products" className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24 w-full border-t border-border">
      <div className="mb-10 lg:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="eyebrow-label block mb-2.5">{productsSection.eyebrow}</span>
          <h2 className="h2-section max-w-2xl text-text mb-3">
            {productsSection.headline}
          </h2>
          <p className="sub-paragraph max-w-2xl text-text-2">
            {productsSection.subheadline}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-2 hover:text-white transition-colors shrink-0"
        >
          <span>View all products</span>
          <ArrowRight size={15} />
        </Link>
      </div>

      {/* 2x2 Balanced Bento Grid (Cuts height by >40% compared to 4 cramped towers) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {productsSection.items.map((prod) => (
          <GlassCard
            key={prod.slug}
            className="group relative flex flex-col justify-between p-6 sm:p-7 transition-all duration-300"
          >
            {/* Subtle top HUD corner */}
            <div className="hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              {/* Card Header: Product Brand, Category & Status Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="relative flex items-center justify-center p-2 rounded-xl bg-surface-3 border border-border"
                    style={{
                      boxShadow: `0 0 16px ${prod.accentColor}25`,
                    }}
                  >
                    <ProductLogo slug={prod.slug} size={22} />
                  </div>
                  <div>
                    <h3 className="h3-card text-text group-hover:text-white transition-colors">
                      {prod.name}
                    </h3>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-text-3">
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Status Pill */}
                <span
                  className="px-2.5 py-1 text-[11px] font-mono font-semibold rounded-full border border-border"
                  style={{
                    color: prod.accentColor,
                    borderColor: `${prod.accentColor}40`,
                    backgroundColor: `${prod.accentColor}12`,
                  }}
                >
                  ● {prod.status.replace(' [CONFIRM]', '')}
                </span>
              </div>

              {/* 16:9 Widescreen Device Frame */}
              {prod.previewImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border bg-surface-3/60 mb-5 shadow-inner">
                  <Image
                    src={prod.previewImage}
                    alt={`${prod.name} Interface`}
                    fill
                    loading="eager"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-2/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Outcome line */}
              <p className="text-[14.5px] text-text-2 leading-relaxed font-normal mb-5">
                {prod.outcome}
              </p>
            </div>

            {/* Bottom Actions: Single Clean Row */}
            <div className="pt-4 border-t border-border/70 flex items-center justify-between gap-4">
              <Link
                href={`/products/${prod.slug}#waitlist`}
                className="btn-secondary text-xs py-2 px-4 min-h-[38px] flex items-center justify-center font-medium"
              >
                <span>{prod.ctaLabel}</span>
              </Link>

              <Link
                href={`/products/${prod.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-3 hover:text-text transition-colors"
              >
                <span>View details</span>
                <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

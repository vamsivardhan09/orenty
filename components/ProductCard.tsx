'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/content/site';
import GlassCard from './GlassCard';
import ProductLogo from './ProductLogo';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  return (
    <GlassCard
      className={`group relative flex flex-col justify-between p-6 sm:p-7 h-full transition-all duration-300 ${className}`}
      accentColor={product.accentColor}
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
                
              }}
            >
              <ProductLogo slug={product.slug} size={22} />
            </div>
            <div>
              <h3 className="h3-card text-text group-hover:text-white transition-colors">
                {product.name}
              </h3>
              <span className="text-xs font-mono uppercase tracking-wider text-text-3">
                {product.category}
              </span>
            </div>
          </div>

          {/* Status Pill */}
          <span
            className="px-2.5 py-1 text-xs font-mono font-semibold rounded-full border border-border shrink-0"
            style={{
              color: product.accentColor,
              borderColor: `${product.accentColor}40`,
              backgroundColor: `${product.accentColor}12`,
            }}
          >
            ● {product.status === 'live' ? 'Live · Client Work' : product.status.replace(' [CONFIRM]', '')}
          </span>
        </div>

        {/* 16:9 Widescreen Device Frame */}
        {product.previewImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border bg-surface-3/60 mb-5 shadow-inner">
            <Image
              src={product.previewImage}
              alt={`${product.name} Interface`}
              fill
              loading="eager"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-2/80 via-transparent to-transparent" />
          </div>
        )}

        {/* Outcome line */}
        <p className="text-[14.5px] text-text-2 leading-relaxed font-normal mb-5">
          {product.outcome}
        </p>
      </div>

      {/* Bottom Actions: Single Clean Row */}
      <div className="pt-4 border-t border-border/70 flex items-center justify-between gap-4">
        {product.status === 'live' && product.websiteUrl ? (
          <a
            href={product.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs py-2 px-4 min-h-[38px] flex items-center justify-center font-medium gap-1"
          >
            <span>{product.ctaLabel}</span>
            <ArrowUpRight size={13} />
          </a>
        ) : (
          <Link
            href={`/products/${product.slug}#waitlist`}
            className="btn-secondary text-xs py-2 px-4 min-h-[38px] flex items-center justify-center font-medium"
          >
            <span>{product.ctaLabel}</span>
          </Link>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-3 hover:text-text transition-colors"
        >
          <span>View details</span>
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </GlassCard>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import StackContainer from './StackContainer';
import ProductCard from './ProductCard';
import DesktopProductScroller from './DesktopProductScroller';
import { ArrowRight } from 'lucide-react';

export default function ProductsSection() {
  const { productsSection } = siteContent;

  return (
    <section
      id="products"
      className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-20 w-full border-t border-border"
    >
      {/* Mobile & Tablet (< 1024px): Overlapping Vertical Placard Stack */}
      <div className="block lg:hidden">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
                        <h2 className="h2-section max-w-xl text-text mb-3">
              {productsSection.headline}
            </h2>
            <p className="sub-paragraph max-w-xl text-text-2">
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

        <StackContainer totalCards={productsSection.items.length}>
          {productsSection.items.map((prod) => (
            <ProductCard key={prod.slug} product={prod} />
          ))}
        </StackContainer>
      </div>

      {/* Laptop & Desktop (>= 1024px): Single-Row Scroll-Pinned Horizontal Showcase */}
      <div className="hidden lg:block">
        <DesktopProductScroller
          items={productsSection.items}
          eyebrow={productsSection.eyebrow}
          headline={productsSection.headline}
          subheadline={productsSection.subheadline}
        />
      </div>
    </section>
  );
}

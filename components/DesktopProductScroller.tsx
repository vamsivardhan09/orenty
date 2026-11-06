'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '@/content/site';
import ProductCard from './ProductCard';

interface DesktopProductScrollerProps {
  items: Product[];
  eyebrow: string;
  headline: string;
  subheadline: string;
}

export default function DesktopProductScroller({
  items,
  eyebrow,
  headline,
  subheadline,
}: DesktopProductScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    if (typeof window !== 'undefined') {
      (window as any).ScrollTrigger = ScrollTrigger;
    }

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only enable pin & horizontal scroll on laptop/desktop (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        // Calculate shift dynamically based on track and gap
        const computeShift = () => {
          const firstCard = cardRefs.current[0];
          if (!firstCard) return 400;
          const cardWidth = firstCard.offsetWidth;
          const gap = 32; // 2rem (gap-8)
          return cardWidth + gap;
        };

        const shiftPerCard = computeShift();
        const totalShift = shiftPerCard * 2; // 5 cards total, 3 visible = 2 hidden to the right

        // GSAP Timeline pinned with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            id: 'products-pin',
            trigger: container,
            pin: true,
            scrub: 0.9,
            start: 'top top+=75',
            end: () => `+=${totalShift * 2.2}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress);
              if (self.progress < 0.35) {
                setActiveStep(0);
              } else if (self.progress < 0.75) {
                setActiveStep(1);
              } else {
                setActiveStep(2);
              }
            },
          },
        });

        // Step 1: Slide track by 1 card; Card 0 (SyncedIn) fades out to left as Card 3 (Pujari.ai) enters
        tl.to(
          track,
          {
            x: () => -computeShift(),
            ease: 'power1.inOut',
            duration: 1,
          },
          0
        );

        if (cardRefs.current[0]) {
          tl.to(
            cardRefs.current[0],
            {
              opacity: 0,
              scale: 0.95,
              ease: 'power1.out',
              duration: 0.8,
            },
            0
          );
        }

        // Step 2: Slide track by 2nd card; Card 1 (Fanbase) fades out to left as Card 4 (G1 Mart) enters
        tl.to(
          track,
          {
            x: () => -computeShift() * 2,
            ease: 'power1.inOut',
            duration: 1,
          },
          1
        );

        if (cardRefs.current[1]) {
          tl.to(
            cardRefs.current[1],
            {
              opacity: 0,
              scale: 0.95,
              ease: 'power1.out',
              duration: 0.8,
            },
            1
          );
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [items]);

  // Navigate to step on arrow button click
  const scrollToStep = (step: number) => {
    const st = ScrollTrigger.getById('products-pin');
    if (!st) return;
    const progressTarget = step === 0 ? 0.05 : step === 1 ? 0.5 : 0.95;
    const targetScroll = st.start + (st.end - st.start) * progressTarget;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const stepLabels = [
    'SyncedIn · Fanbase · Job Pilot',
    'Fanbase · Job Pilot · Pujari.ai',
    'Job Pilot · Pujari.ai · G1 Mart',
  ];

  return (
    <div ref={containerRef} className="relative w-full py-4">
      {/* Top Header Row with Active Layer Indicators and Navigation */}
      <div className="mb-8 flex items-end justify-between gap-6">
        <div>
          <span className="eyebrow-label block mb-2.5">{eyebrow}</span>
          <h2 className="h2-section max-w-2xl text-text mb-3">{headline}</h2>
          <p className="sub-paragraph max-w-2xl text-text-2">{subheadline}</p>
        </div>

        {/* HUD Controls & Actions */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-text-2 hover:text-white transition-colors"
            >
              <span>View all products</span>
              <ArrowRight size={15} />
            </Link>

            {/* Step Navigation Arrows */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface-2 border border-border">
              <button
                type="button"
                onClick={() => scrollToStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                aria-label="Previous products"
                className="p-1.5 rounded-full hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none transition-colors text-text-2 hover:text-white"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 font-mono text-[11px] font-semibold text-text-3">
                0{activeStep + 1} / 03
              </span>
              <button
                type="button"
                onClick={() => scrollToStep(Math.min(2, activeStep + 1))}
                disabled={activeStep === 2}
                aria-label="Next products"
                className="p-1.5 rounded-full hover:bg-surface-3 disabled:opacity-30 disabled:pointer-events-none transition-colors text-text-2 hover:text-white"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Active Layer Badge */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-text-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-text-2 font-medium">{stepLabels[activeStep]}</span>
          </div>
        </div>
      </div>

      {/* Single-row Horizontal Placard Track */}
      <div className="relative overflow-hidden w-full pb-4 pt-1">
        <div
          ref={trackRef}
          className="flex flex-nowrap gap-8 items-stretch will-change-transform"
          style={{ width: '100%' }}
        >
          {items.map((prod, idx) => (
            <div
              key={prod.slug}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="product-card-item shrink-0 h-full transition-transform duration-200"
              style={{
                width: 'calc((100% - 4rem) / 3)', // Exact original 3-column width
              }}
            >
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>

      {/* Laser Scrub Progress Line */}
      <div className="relative mt-4 w-full h-[2px] bg-border/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-secondary via-accent to-warm transition-all duration-150 ease-out"
          style={{
            width: `${Math.max(5, Math.min(100, scrollProgress * 100))}%`,
            boxShadow: '0 0 12px rgba(124, 92, 255, 0.7)',
          }}
        />
      </div>
    </div>
  );
}

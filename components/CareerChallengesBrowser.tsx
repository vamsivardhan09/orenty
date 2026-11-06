'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { challengesList, LabChallenge } from '@/content/site';
import GlassCard from './GlassCard';
import Badge from './Badge';
import Button from './Button';
import { ArrowRight, Calendar } from 'lucide-react';

const categories = ['All', 'Engineering', 'Design', 'Growth', 'AI'] as const;

export default function CareerChallengesBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const filtered = challengesList.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.track === selectedCategory;
  });

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, offsetWidth } = carouselRef.current;
    const index = Math.round(scrollLeft / offsetWidth);
    setActiveSlide(index);
  };

  return (
    <div id="challenges" className="w-full">
      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setActiveSlide(0);
                if (carouselRef.current) carouselRef.current.scrollLeft = 0;
              }}
              className={`px-4 py-2 rounded-pill text-xs font-semibold tracking-wide transition-all ${
                isSelected
                  ? 'bg-text text-bg shadow-sm'
                  : 'bg-surface-2 text-text-2 border border-border hover:border-border-top hover:text-text'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Desktop & Tablet: Grid Layout (hidden on mobile) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((chal) => (
          <GlassCard key={chal.id} className="p-7 flex flex-col justify-between h-full">
            <div>
              {/* Badges: Track, Difficulty, and Amber Equity Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider bg-surface-3 px-2.5 py-1 rounded-pill border border-border">
                  {chal.track}
                </span>
                <span className="text-[11px] font-medium text-text-3 uppercase tracking-wider bg-surface-3 px-2.5 py-1 rounded-pill border border-border">
                  {chal.difficulty}
                </span>
                <Badge variant="equity" className="text-[11px]">
                  {chal.reward}
                </Badge>
              </div>

              <h3 className="h3-card text-text mb-3">
                {chal.title}
              </h3>

              <p className="text-sm text-text-2 leading-relaxed mb-6 font-normal line-clamp-3">
                {chal.problem}
              </p>

              <div className="flex items-center gap-2 text-xs text-text-3 font-medium mb-6">
                <Calendar size={13} className="text-secondary" />
                <span>Deadline: {chal.deadline}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button href={`/careers/${chal.slug}`} variant="secondary" className="w-full justify-center text-xs py-2.5 min-h-[40px]">
                <span>View challenge</span>
                <ArrowRight size={13} className="btn-arrow" />
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Mobile: Horizontal Swipe Carousel with Snap + Dot Indicators (≤ 767px) */}
      <div className="block md:hidden">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-none"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filtered.map((chal) => (
            <div
              key={chal.id}
              className="snap-center shrink-0 w-[88vw] max-w-[340px]"
            >
              <div className="rounded-card border border-border bg-surface-2 p-6 flex flex-col justify-between h-full min-h-[340px]">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider bg-surface-3 px-2 py-0.5 rounded-pill border border-border">
                      {chal.track}
                    </span>
                    <Badge variant="equity" className="text-[11px]">
                      {chal.reward}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-text mb-3">
                    {chal.title}
                  </h3>

                  <p className="text-sm text-text-2 leading-relaxed mb-4">
                    {chal.problem}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-text-3 mb-6">
                    <Calendar size={13} className="text-secondary" />
                    <span>Deadline: {chal.deadline}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button href={`/careers/${chal.slug}`} variant="secondary" className="w-full justify-center text-xs py-2.5 min-h-[40px]">
                    <span>View challenge</span>
                    <ArrowRight size={13} className="btn-arrow" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe Pagination Dots */}
        {filtered.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {filtered.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx ? 'w-5 bg-warm' : 'w-1.5 bg-border'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

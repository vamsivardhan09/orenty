import React from 'react';
import SceneBackground from '@/components/SceneBackground';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import ServicesSection from '@/components/ServicesSection';
import WorkSection from '@/components/WorkSection';
import ProductsSection from '@/components/ProductsSection';
import StartupLabSection from '@/components/StartupLabSection';
import AboutStrip from '@/components/AboutStrip';
import FaqSection from '@/components/FaqSection';
import FinalCtaSection from '@/components/FinalCtaSection';

export default function HomePage() {
  return (
    <div className="relative flex flex-col bg-transparent text-text">
      {/* 3D Volumetric Light-Beam & Hero 3D Logo Canvas (Fades smoothly into page bg) */}
      <SceneBackground />

      {/* 5.1 Hero */}
      <Hero />

      {/* 5.2 Proof strip */}
      <TrustStrip />

      {/* 5.3 What we do: 3 division cards */}
      <WhatWeDoSection />

      {/* 5.4 Services preview: 4 cards + process + Start a project button */}
      <ServicesSection />

      {/* 5.5 Work: Case studies template (hidden if empty/unconfirmed) */}
      <WorkSection isVisible={false} />

      {/* 5.6 Products: 4 cards with clean device frames & status-matched CTAs */}
      <ProductsSection />

      {/* 5.7 Startup Lab teaser: short ~1 screen with 4 step icons */}
      <StartupLabSection />

      {/* 5.8 About strip: founder photo [CONFIRM] + 2-sentence story */}
      <AboutStrip />

      {/* 5.9 FAQ: 6 questions */}
      <FaqSection />

      {/* 5.10 Final CTA: Have an idea or a problem worth solving? */}
      <FinalCtaSection />
    </div>
  );
}

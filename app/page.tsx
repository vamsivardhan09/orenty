import React from 'react';
import SceneBackground from '@/components/SceneBackground';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import ServicesSection from '@/components/ServicesSection';
import ProductsSection from '@/components/ProductsSection';
import StartupLabSection from '@/components/StartupLabSection';
import FinalCtaSection from '@/components/FinalCtaSection';

export default function HomePage() {
  return (
    <div className="relative flex flex-col bg-bg text-text">
      {/* 3D Living Light-Beam & Universe Canvas (Fixed background with section hue-shift) */}
      <SceneBackground />

      {/* 1. HERO (promise) */}
      <Hero />

      {/* 2. TRUST STRIP (real numbers only, [CONFIRM] placeholders) */}
      <TrustStrip />

      {/* 3. SERVICES (what we build for you) + 4-step process timeline */}
      <ServicesSection />

      {/* 4. PRODUCTS (what we build ourselves) */}
      <ProductsSection />

      {/* 5. STARTUP LAB (solve the challenge, earn equity) */}
      <StartupLabSection />

      {/* 6. FINAL CTA (tell us what you're building) */}
      <FinalCtaSection />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/content/site';
import Hero from '@/components/Hero';
import GlassCard from '@/components/GlassCard';
import MagneticButton from '@/components/MagneticButton';
import TextReveal from '@/components/TextReveal';
import DriftingLabTiles from '@/components/DriftingLabTiles';
import {
  SoftwareMediaWindow,
  ProductsMediaWindow,
  LabMediaWindow,
  SyncedInMediaWindow,
  FanbaseMediaWindow,
  JobPilotMediaWindow,
  PujariMediaWindow,
} from '@/components/MediaWindows';
import { ArrowRight, ShieldAlert } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative flex flex-col bg-background">
      {/* 1. HERO WebGL 3D Light-Beam Section */}
      <Hero />

      {/* 2. WHAT WE ARE // 3 DIVISIONS */}
      <section
        id="software"
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(80px,11vh,130px)] w-full border-t border-white/[0.04] scroll-mt-24"
      >
        {/* Section Header: Left-aligned, standardized eyebrow, max 2 lines */}
        <div className="max-w-2xl mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span>DIVISIONS // 01 - 03</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.1]">
            <TextReveal as="span">What we are.</TextReveal>
          </h2>
          <p className="mt-4 text-base text-slate-400 font-body leading-relaxed">
            Orenty operates across three synchronized engineering divisions — partnering with leading businesses, crafting sovereign consumer tech, and incubating community-built startups.
          </p>
        </div>

        {/* 3 Division Cards Grid: Single Frame GlassCard, 16:10 Media Windows, Strict Grid Row Alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Division 1: Software Solutions */}
          <GlassCard
            eyebrow="DIVISION // 01"
            badge="CLIENT SOLUTIONS"
            accentColor="#6366f1"
            media={<SoftwareMediaWindow />}
            title="Software Solutions"
            tagline="Bespoke Engineering & AI Automation"
            description="End-to-end software development, intelligent workflow automation, and scalable cloud architectures built for forward-thinking businesses."
            footerLabel="Explore Software"
            footerHref="/software"
          />

          {/* Division 2: Proprietary Products */}
          <GlassCard
            eyebrow="DIVISION // 02"
            badge="4 ACTIVE BUILDS"
            accentColor="#8b5cf6"
            media={<ProductsMediaWindow />}
            title="Proprietary Products"
            tagline="Focused Solutions Built In-House"
            description="A portfolio of purpose-built platforms spanning professional networking, creator economies, career acceleration, and cultural AI."
            footerLabel="Explore Products"
            footerHref="/products"
          />

          {/* Division 3: Startup Lab */}
          <GlassCard
            eyebrow="DIVISION // 03"
            badge="CHALLENGES OPEN"
            accentColor="#ec4899"
            media={<LabMediaWindow />}
            title="Startup Lab"
            tagline="Idea to Challenge to Co-Ownership"
            description="Solve breakthrough startup challenges. Top contributors form dedicated founding teams and earn real product ownership."
            footerLabel="Explore Startup Lab"
            footerHref="/lab"
          />
        </div>
      </section>

      {/* 3. PROPRIETARY PRODUCTS // 4 CARDS */}
      <section
        id="products"
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(80px,11vh,130px)] w-full border-t border-white/[0.04] scroll-mt-24"
      >
        {/* Section Header: Standardized size across sections, left-aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-violet-400 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              <span>IN-HOUSE PRODUCTS // PIPELINE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.1]">
              <TextReveal as="span">Proprietary builds.</TextReveal>
            </h2>
            <p className="mt-4 text-base text-slate-400 font-body leading-relaxed">
              We design and engineer our own portfolio platforms from zero to launch. Each product operates under honest development milestones.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-300 hover:text-white transition-colors"
          >
            <span>All Products</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Products Grid: Single-frame GlassCards with Distinct Custom Motif Media Windows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product 1: SyncedIn */}
          <GlassCard
            eyebrow="AI NETWORKING"
            badge="Building"
            badgeStatus="building"
            accentColor="#8b5cf6"
            media={<SyncedInMediaWindow />}
            title="SyncedIn"
            tagline="An AI-powered network that connects people to the right people."
            description="Cutting through noise with high-signal semantic matching. SyncedIn analyzes goals, expertise, and collaboration velocity to connect you with high-leverage collaborators and peers."
            features={['Semantic matchmaking', 'Intelligent intros', 'Spam-free messaging']}
            footerLabel="Learn more"
            footerHref="/products/syncedin"
            ctaButton={{
              label: 'Apply',
              href: '/apply?track=syncedin',
            }}
          />

          {/* Product 2: Fanbase */}
          <GlassCard
            eyebrow="CREATOR ECONOMY"
            badge="Building"
            badgeStatus="building"
            accentColor="#ec4899"
            media={<FanbaseMediaWindow />}
            title="Fanbase"
            tagline="A home for creators and their communities."
            description="The sovereign platform for modern creators. Unify subscriber relationships, direct digital drops, and interactive live rooms without algorithm interference."
            features={['Direct creator channels', 'Member tiers & drops', 'Sovereign relationships']}
            footerLabel="Learn more"
            footerHref="/products/fanbase"
            ctaButton={{
              label: 'Apply',
              href: '/apply?track=fanbase',
            }}
          />

          {/* Product 3: Job Pilot */}
          <GlassCard
            eyebrow="CAREER INTELLIGENCE"
            badge="Building"
            badgeStatus="building"
            accentColor="#06b6d4"
            media={<JobPilotMediaWindow />}
            title="Job Pilot"
            tagline="AI that tailors your resume and prepares you for interviews."
            description="Personal career copilot that aligns your experience to any job requisition in seconds, generates role-specific interview simulators, and monitors application momentum."
            features={['ATS resume alignment', 'Interview simulator', 'Pipeline intelligence']}
            footerLabel="Learn more"
            footerHref="/products/job-pilot"
            ctaButton={{
              label: 'Apply',
              href: '/apply?track=job-pilot',
            }}
          />

          {/* Product 4: Pujari.ai */}
          <GlassCard
            eyebrow="SPIRITUAL TECH"
            badge="Building"
            badgeStatus="building"
            accentColor="#f59e0b"
            media={<PujariMediaWindow />}
            title="Pujari.ai"
            tagline="Your AI guide for puja, panchangam and mantras."
            description="Preserving ancient ritual wisdom through respectful modern intelligence. Real-time astrological panchangam calculations, step-by-step puja guidance, and phonetic mantra accompaniment."
            features={['Vedic panchangam', 'Procedural puja guides', 'Authentic mantra audio']}
            footerLabel="Learn more"
            footerHref="/products/pujari-ai"
            ctaButton={{
              label: 'Apply',
              href: '/apply?track=pujari-ai',
            }}
          />
        </div>
      </section>

      {/* 4. STARTUP LAB TEASER // DRIFTING TILES & MODEL */}
      <section
        id="lab"
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(80px,11vh,130px)] w-full border-t border-white/[0.04] scroll-mt-24 overflow-hidden"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-pink-600/10 blur-[150px]" />

        {/* Section Header: Standardized size across sections, left-aligned */}
        <div className="max-w-3xl mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-pink-400 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-400" />
            <span>ORENTY STARTUP LAB // INCUBATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.1]">
            <TextReveal as="span">Solve the challenge. Earn ownership.</TextReveal>
          </h2>
          <p className="mt-4 text-base text-slate-400 font-body leading-relaxed">
            {siteContent.lab.description}
          </p>

          {/* Honest Ownership Callout */}
          <div className="mt-5 inline-flex items-center gap-3 rounded-lg border border-pink-500/30 bg-pink-950/20 px-4 py-2 text-xs text-pink-200">
            <ShieldAlert size={16} className="text-pink-400 shrink-0" />
            <span>{siteContent.lab.ownershipNote}</span>
          </div>
        </div>

        {/* 5-Step Process Horizontal Bar */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          {siteContent.lab.steps.map((st) => (
            <div
              key={st.step}
              className="rounded-xl border border-white/[0.06] bg-navy-950/60 p-4 backdrop-blur-md"
            >
              <span className="font-mono text-xs font-bold text-pink-400 block mb-1">
                STEP // {st.step}
              </span>
              <h4 className="font-display text-sm font-bold text-white mb-1">{st.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed font-body">{st.detail}</p>
            </div>
          ))}
        </div>

        {/* Drifting Challenge Feed */}
        <DriftingLabTiles />

        {/* View All Lab Challenges link */}
        <div className="mt-10 text-center">
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 font-display text-xs uppercase tracking-widest font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span>Explore Complete Startup Lab Framework</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 5. FINAL HIGH-IMPACT APPLY CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-[clamp(80px,11vh,130px)] w-full border-t border-white/[0.04]">
        <GlassCard accentColor="#8b5cf6" className="relative p-10 md:p-16 text-center overflow-hidden">
          <div className="max-w-2xl mx-auto flex flex-col items-center">
            <span className="font-mono text-xs uppercase tracking-widest text-violet-400 font-semibold mb-3">
              ENGINEER THE FUTURE WITH US
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-[1.05] mb-5">
              Ready to build what&apos;s next?
            </h2>
            <p className="text-base text-slate-300 mb-8 leading-relaxed font-body">
              Whether you want to partner for bespoke software engineering, join early product access, or solve a Startup Lab challenge for co-ownership — the door is open.
            </p>

            {/* Single Call To Action across site: Apply */}
            <MagneticButton href="/apply" variant="primary" className="!px-8 !py-4 !text-sm">
              Apply Now
              <ArrowRight size={16} />
            </MagneticButton>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

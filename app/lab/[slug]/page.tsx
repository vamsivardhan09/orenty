import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { challengesList } from '@/content/site';
import GlassCard from '@/components/GlassCard';
import Badge from '@/components/Badge';
import ChallengeSubmissionForm from '@/components/ChallengeSubmissionForm';
import { ArrowLeft, Calendar, Award, CheckCircle, FileCode, Layers } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return challengesList.map((chal) => ({
    slug: chal.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const challenge = challengesList.find((c) => c.slug === slug);

  if (!challenge) {
    return { title: 'Challenge Not Found' };
  }

  return {
    title: `${challenge.code}: ${challenge.title} | Orenty Startup Lab`,
    description: challenge.problem,
  };
}

export default async function ChallengeDetailPage({ params }: Props) {
  const { slug } = await params;
  const challenge = challengesList.find((c) => c.slug === slug);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="relative flex flex-col bg-bg min-h-screen text-text">
      {/* Warm amber ambient glow */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-warm/[0.06] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 pt-16 pb-28 w-full">
        {/* Back Link */}
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to Startup Lab</span>
        </Link>

        {/* Challenge Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-warm uppercase tracking-wider bg-warm/10 px-3 py-1 rounded-pill border border-warm/30 font-mono">
              {challenge.code}
            </span>
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider bg-surface-3 px-3 py-1 rounded-pill border border-border">
              {challenge.track}
            </span>
            <span className="text-xs font-medium text-text-3 uppercase tracking-wider bg-surface-3 px-3 py-1 rounded-pill border border-border">
              {challenge.difficulty} Difficulty
            </span>
            <Badge variant="equity" className="text-xs">
              {challenge.reward}
            </Badge>
          </div>

          <h1 className="h1-hero text-text mb-6">
            {challenge.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-text-2">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-warm" />
              <span>Milestone: {challenge.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={15} className="text-warm" />
              <span>Incentive: {challenge.reward}</span>
            </div>
          </div>
        </div>

        {/* 1. Problem Statement */}
        <div className="mb-10 rounded-card border border-border bg-surface-2 p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-warm block mb-2 font-mono">
            PROBLEM STATEMENT
          </span>
          <h2 className="text-xl font-semibold text-text mb-3">
            The core challenge to solve
          </h2>
          <p className="text-base text-text-2 leading-relaxed">
            {challenge.problem}
          </p>
        </div>

        {/* 2. Deliverables & Evaluation Criteria */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-7">
            <div className="flex items-center gap-3 mb-4 text-warm">
              <FileCode size={20} />
              <h3 className="h3-card text-text">Expected Deliverables</h3>
            </div>
            <ul className="space-y-3 text-sm text-text-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Working prototype, GitHub repository, or runnable code sandbox.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Clean README outlining architecture, setup commands, and trade-offs.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Type safety, edge-case coverage, and resilient error boundaries.</span>
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="p-7">
            <div className="flex items-center gap-3 mb-4 text-secondary">
              <Layers size={20} />
              <h3 className="h3-card text-text">Evaluation Criteria</h3>
            </div>
            <ul className="space-y-3 text-sm text-text-2">
              <li className="flex items-start gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Pragmatic architecture without bloated dependencies or hype.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Real-world latency, execution speed, and UX polish.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Clarity of reasoning and willingness to collaborate on product launch.</span>
              </li>
            </ul>
          </GlassCard>
        </div>

        {/* 3. Submission Form */}
        <div id="submit" className="scroll-mt-20">
          <ChallengeSubmissionForm
            challengeCode={challenge.code}
            challengeTitle={challenge.title}
          />
        </div>
      </div>
    </div>
  );
}

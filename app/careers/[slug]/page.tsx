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
      {/* Warm amber ambient glow (strictly in Startup Lab) */}
      <div className="pointer-events-none absolute top-20 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-warm/[0.06] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 pt-16 pb-28 w-full">
        {/* Back Link */}
        <Link
          href="/careers#challenges"
          className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to all challenges</span>
        </Link>

        {/* Challenge Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-warm uppercase tracking-wider bg-warm/10 px-3 py-1 rounded-pill border border-warm/30">
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
              <span>Milestone Deadline: {challenge.deadline}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={15} className="text-warm" />
              <span>Reward: {challenge.reward}</span>
            </div>
          </div>
        </div>

        {/* 1. Problem Statement */}
        <div className="mb-10 rounded-card border border-border bg-surface-2 p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-warm block mb-2">
            PROBLEM STATEMENT
          </span>
          <h2 className="text-xl font-semibold text-text mb-3">
            The core challenge to solve
          </h2>
          <p className="text-base text-text-2 leading-relaxed">
            {challenge.problem}
          </p>
        </div>

        {/* 2. What to Submit */}
        <div className="mb-10 rounded-card border border-border bg-surface-2 p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-warm block mb-2">
            DELIVERABLES
          </span>
          <h2 className="text-xl font-semibold text-text mb-4">
            What you need to submit
          </h2>
          <ul className="space-y-3 text-sm text-text-2 leading-relaxed">
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-warm shrink-0 mt-0.5" />
              <span>A public or private Git repository link containing clean, typed source code.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-warm shrink-0 mt-0.5" />
              <span>A live running prototype, deployed preview, or command-line walkthrough demo.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle size={16} className="text-warm shrink-0 mt-0.5" />
              <span>A clear README with architecture trade-offs, setup commands, and performance benchmarks.</span>
            </li>
          </ul>
        </div>

        {/* 3. Evaluation Criteria */}
        <div className="mb-10 rounded-card border border-border bg-surface-2 p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-warm block mb-2">
            EVALUATION RUBRIC
          </span>
          <h2 className="text-xl font-semibold text-text mb-4">
            How we judge submissions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-text mb-1">Architecture & Code</h3>
              <p className="text-xs text-text-3 leading-relaxed">Modularity, TypeScript hygiene, edge case handling, and algorithmic efficiency.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text mb-1">User Experience</h3>
              <p className="text-xs text-text-3 leading-relaxed">Low latency, intuitive interaction polish, and predictable error recovery.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text mb-1">Scalability</h3>
              <p className="text-xs text-text-3 leading-relaxed">Resilience under load, concurrency handling, and sustainable cloud resource usage.</p>
            </div>
          </div>
        </div>

        {/* 4. Timeline & Reward */}
        <div className="mb-14 rounded-card border border-border bg-surface-2 p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-warm block mb-1">
              REWARD & CO-OWNERSHIP
            </span>
            <p className="text-sm text-text-2">
              Winners join the founding squad and may earn equity in the product.
            </p>
          </div>
          <Badge variant="equity" className="text-sm px-4 py-2">
            {challenge.reward}
          </Badge>
        </div>

        {/* 5. Application Form */}
        <div id="submit">
          <ChallengeSubmissionForm
            challengeCode={challenge.code}
            challengeTitle={challenge.title}
          />
        </div>
      </div>
    </div>
  );
}

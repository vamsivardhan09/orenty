'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import GlassCard from '@/components/GlassCard';
import Button from '@/components/Button';
import { challengesList } from '@/content/site';
import { Send, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const initialChallenge = searchParams.get('challenge') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolioUrl: '',
    challengeOrIdea: initialChallenge ? `CH-${initialChallenge}` : 'CH-01: Semantic Graph Matching Engine',
    solutionUrl: '',
    solutionDetails: '',
    whyYou: '',
    agreeToRules: false,
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToRules) {
      setErrorMessage('You must agree to the Startup Lab contributor and ownership terms.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          portfolioUrl: formData.portfolioUrl,
          challengeOrIdea: formData.challengeOrIdea,
          solutionDetails: `Deliverable Link: ${formData.solutionUrl}\n\nTechnical Overview:\n${formData.solutionDetails}`,
          whyYou: formData.whyYou,
          website: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        portfolioUrl: '',
        challengeOrIdea: 'CH-01: Semantic Graph Matching Engine',
        solutionUrl: '',
        solutionDetails: '',
        whyYou: '',
        agreeToRules: false,
        honeypot: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while submitting your application.'
      );
    }
  };

  if (status === 'success') {
    return (
      <GlassCard className="p-8 md:p-12 text-center flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h2 className="h3-card text-text mb-2">
          Application Submitted Successfully
        </h2>
        <p className="text-sm text-text-2 max-w-md font-body leading-relaxed mb-6 font-normal">
          Thank you for applying to the Orenty Startup Lab. Our technical review team evaluates all incoming code and proposals within 5 to 7 business days. We will follow up via email.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => setStatus('idle')} variant="secondary">
            <span>Submit another application</span>
          </Button>
          <Button href="/lab" variant="primary">
            <span>Back to Startup Lab</span>
          </Button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-7 md:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="apply-website">Website</label>
          <input
            id="apply-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        {/* Challenge Selection */}
        <div>
          <label htmlFor="challenge-select" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
            Select Challenge or Idea <span className="text-primary">*</span>
          </label>
          <select
            id="challenge-select"
            value={formData.challengeOrIdea}
            onChange={(e) => setFormData({ ...formData, challengeOrIdea: e.target.value })}
            className="w-full rounded-lg border border-white/[0.08] bg-[#0A0A0E] px-4 py-2.5 text-sm text-white transition-all duration-200 focus:border-white/30 focus:outline-none"
          >
            {challengesList.map((chal) => (
              <option key={chal.id} value={`${chal.code}: ${chal.title}`}>
                {chal.code}: {chal.title} ({chal.track})
              </option>
            ))}
            <option value="Custom Idea / Original Venture Proposal">
              Propose an Original Venture / Custom Startup Idea
            </option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label htmlFor="apply-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              id="apply-name"
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="apply-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
              Email Address <span className="text-primary">*</span>
            </label>
            <input
              id="apply-email"
              type="email"
              required
              placeholder="you@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Portfolio or GitHub */}
          <div>
            <label htmlFor="apply-portfolio" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
              GitHub or Portfolio URL <span className="text-primary">*</span>
            </label>
            <input
              id="apply-portfolio"
              type="url"
              required
              placeholder="https://github.com/username"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
            />
          </div>

          {/* Solution Link */}
          <div>
            <label htmlFor="apply-solution" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
              Deliverable Link <span className="text-neutral-500 font-normal lowercase">(repo, preview, demo)</span>
            </label>
            <input
              id="apply-solution"
              type="url"
              placeholder="https://github.com/username/challenge-repo"
              value={formData.solutionUrl}
              onChange={(e) => setFormData({ ...formData, solutionUrl: e.target.value })}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
            />
          </div>
        </div>

        {/* Technical Overview */}
        <div>
          <label htmlFor="apply-details" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
            Solution Overview or Architecture <span className="text-primary">*</span>
          </label>
          <textarea
            id="apply-details"
            required
            rows={4}
            placeholder="Explain your technical implementation, key libraries, trade-offs, and architecture decisions."
            value={formData.solutionDetails}
            onChange={(e) => setFormData({ ...formData, solutionDetails: e.target.value })}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
          />
        </div>

        {/* Why you */}
        <div>
          <label htmlFor="apply-why" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
            Why do you want to build this? <span className="text-neutral-500 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            id="apply-why"
            rows={2}
            placeholder="Tell us what excites you about this problem or why you'd be a great co-builder."
            value={formData.whyYou}
            onChange={(e) => setFormData({ ...formData, whyYou: e.target.value })}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
          />
        </div>

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 p-4 rounded-lg border border-white/[0.08] bg-white/[0.02]">
          <input
            id="apply-terms"
            type="checkbox"
            required
            checked={formData.agreeToRules}
            onChange={(e) => setFormData({ ...formData, agreeToRules: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/40 text-primary focus:ring-0 focus:outline-none cursor-pointer"
          />
          <label htmlFor="apply-terms" className="text-xs text-neutral-400 leading-relaxed cursor-pointer select-none">
            I understand that Startup Lab contributors can earn project ownership upon accepted milestones, and terms are agreed on a per-challenge basis.
          </label>
        </div>

        {/* Error alert */}
        {status === 'error' && (
          <div className="flex items-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
            <AlertCircle size={15} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          <span>Submit application</span>
          <Send size={14} className="btn-arrow" />
        </Button>
      </form>
    </GlassCard>
  );
}

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen bg-bg text-text">
      {/* Warm ambient glow */}
      <div className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-warm/[0.06] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-12 py-16 lg:py-20 w-full">
        {/* Back Link */}
        <Link
          href="/lab"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span>Back to Startup Lab</span>
        </Link>

        <div className="max-w-2xl mb-10">
          <span className="eyebrow-label block mb-3 text-warm font-mono">STARTUP LAB · APPLICATION</span>
          <h1 className="h1-hero text-text mb-4">
            Apply to build with Orenty.
          </h1>
          <p className="sub-paragraph text-text-2">
            Submit your solution to an active challenge or pitch your own venture idea. The best contributors form the launch squad and earn equity in what we build.
          </p>
        </div>

        <Suspense fallback={<div className="text-sm text-neutral-500 font-mono">Loading application form...</div>}>
          <ApplyFormContent />
        </Suspense>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GlassCard from './GlassCard';
import HudBox from './HudBox';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { siteContent } from '@/content/site';

export default function ApplyForm() {
  const searchParams = useSearchParams();
  const prefillChallenge = searchParams.get('challenge') || '';
  const prefillTrack = searchParams.get('track') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolioUrl: '',
    challengeOrIdea: '',
    solutionDetails: '',
    whyYou: '',
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle URL pre-fills
  useEffect(() => {
    if (prefillChallenge) {
      const match = siteContent.lab.challenges.find((c) => c.code === prefillChallenge);
      setFormData((prev) => ({
        ...prev,
        challengeOrIdea: match ? `${match.code} - ${match.title}` : `Challenge ${prefillChallenge}`,
      }));
    } else if (prefillTrack) {
      const productMatch = siteContent.products.find((p) => p.slug === prefillTrack);
      if (productMatch) {
        setFormData((prev) => ({
          ...prev,
          challengeOrIdea: `Product Build Team: ${productMatch.name}`,
        }));
      } else if (prefillTrack === 'new-idea') {
        setFormData((prev) => ({
          ...prev,
          challengeOrIdea: 'New Proprietary Startup Concept',
        }));
      }
    }
  }, [prefillChallenge, prefillTrack]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
        challengeOrIdea: '',
        solutionDetails: '',
        whyYou: '',
        honeypot: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred while submitting your application.'
      );
    }
  };

  return (
    <GlassCard accentColor="#8b5cf6" className="p-8 md:p-12">
      <HudBox label="ORENTY // BUILDER APPLICATION" tag="SUBMISSIONS OPEN" accentColor="#8b5cf6">
        {status === 'success' ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Application Transmitted
            </h3>
            <p className="text-sm text-slate-300 max-w-md font-body leading-relaxed mb-4">
              Your solution and credentials have been submitted to the Orenty review committee. All technical submissions are reviewed with code evaluation within 48 business hours.
            </p>
            <div className="mb-8 rounded-lg border border-violet-500/20 bg-violet-950/20 px-4 py-2 text-xs font-mono text-violet-300">
              STATUS: UNDER EVALUATION // CONFIRMATION SENT TO EMAIL
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="font-mono text-xs text-violet-400 hover:text-violet-300 underline uppercase tracking-wider"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            {/* Honeypot trap: hidden from humans, bots fill it */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="honeypot">Leave this blank</label>
              <input
                id="honeypot"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Full Name <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Patel"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Primary Email <span className="text-violet-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="maya@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Portfolio / GitHub Link */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Portfolio, GitHub, or LinkedIn URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/your-username"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 transition-colors"
                />
              </div>

              {/* Which Challenge or Idea */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Challenge Code or Venture Idea <span className="text-violet-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CH-2601 or New Idea"
                  value={formData.challengeOrIdea}
                  onChange={(e) => setFormData({ ...formData, challengeOrIdea: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 transition-colors"
                />
              </div>
            </div>

            {/* Solution Link or Description */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                Solution Link or Technical Description <span className="text-violet-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Include a link to your repository/PR/loom or describe your architectural approach, algorithmic strategy, or working demo..."
                value={formData.solutionDetails}
                onChange={(e) => setFormData({ ...formData, solutionDetails: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 transition-colors resize-none"
              />
            </div>

            {/* Why You */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                Why You & Prior Impact <span className="text-violet-400">*</span>
              </label>
              <textarea
                required
                rows={3}
                placeholder="What demonstrates your velocity and dedication? What are you most proud of building?"
                value={formData.whyYou}
                onChange={(e) => setFormData({ ...formData, whyYou: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 transition-colors resize-none"
              />
            </div>

            {/* Error banner */}
            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-300">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Ownership Reminder */}
            <div className="rounded-lg border border-white/[0.06] bg-navy-900/50 p-4 text-xs text-slate-400 leading-relaxed">
              <span className="font-mono text-violet-300 font-bold block mb-1">
                CO-OWNERSHIP TERMS:
              </span>
              {siteContent.lab.ownershipNote}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-500 px-8 py-4 font-display text-xs uppercase tracking-widest font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] border border-violet-400/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.8)] transition-all disabled:opacity-50"
              data-cursor-expand="true"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting Application...</span>
                </>
              ) : (
                <>
                  <span>Transmit Application</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </form>
        )}
      </HudBox>
    </GlassCard>
  );
}

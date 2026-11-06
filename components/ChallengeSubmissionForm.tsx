'use client';

import React, { useState } from 'react';
import GlassCard from './GlassCard';
import Button from './Button';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  challengeCode: string;
  challengeTitle: string;
}

export default function ChallengeSubmissionForm({ challengeCode, challengeTitle }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    portfolioUrl: '',
    solutionUrl: '',
    shortNote: '',
    agreeToRules: false,
    honeypot: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToRules) {
      setErrorMessage('You must agree to the Startup Lab Rules & Fairness terms.');
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
          challengeOrIdea: `${challengeCode} - ${challengeTitle}`,
          solutionDetails: `Solution: ${formData.solutionUrl}\n\nNote:\n${formData.shortNote}`,
          whyYou: 'Challenge solution submission',
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
        solutionUrl: '',
        shortNote: '',
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
        <h3 className="h3-card text-text mb-2">
          Solution submitted successfully
        </h3>
        <p className="text-sm text-text-2 max-w-md font-body leading-relaxed mb-6">
          Thank you for your submission to {challengeCode} ({challengeTitle}). Our technical review team evaluates all incoming code within 7 to 10 business days [CONFIRM]. We will reach out via email.
        </p>
        <Button onClick={() => setStatus('idle')} variant="secondary">
          <span>Submit another solution</span>
        </Button>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-8 md:p-10">
      <div className="mb-6">
        <span className="text-xs uppercase tracking-wider text-warm font-semibold block mb-1">
          SUBMISSION FORM
        </span>
        <h3 className="h3-card text-text">
          Submit your solution for {challengeCode}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Honeypot field */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="applicant-name" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              id="applicant-name"
              type="text"
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="applicant-email" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
              Email Address <span className="text-primary">*</span>
            </label>
            <input
              id="applicant-email"
              type="email"
              required
              placeholder="you@domain.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GitHub / Portfolio */}
          <div>
            <label htmlFor="applicant-portfolio" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
              GitHub or Portfolio URL <span className="text-primary">*</span>
            </label>
            <input
              id="applicant-portfolio"
              type="url"
              required
              placeholder="https://github.com/yourhandle"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
              className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
            />
          </div>

          {/* Solution Link */}
          <div>
            <label htmlFor="applicant-solution" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
              Solution Link or Repo <span className="text-primary">*</span>
            </label>
            <input
              id="applicant-solution"
              type="url"
              required
              placeholder="https://github.com/you/challenge-repo"
              value={formData.solutionUrl}
              onChange={(e) => setFormData({ ...formData, solutionUrl: e.target.value })}
              className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
            />
          </div>
        </div>

        {/* Short Note */}
        <div>
          <label htmlFor="applicant-note" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
            Brief architectural overview or notes
          </label>
          <textarea
            id="applicant-note"
            rows={4}
            placeholder="Summarize your approach, key technical trade-offs, and instructions to run your solution."
            value={formData.shortNote}
            onChange={(e) => setFormData({ ...formData, shortNote: e.target.value })}
            className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
          />
        </div>

        {/* Agree to rules */}
        <div className="flex items-start gap-3 pt-2">
          <input
            id="agree-rules"
            type="checkbox"
            required
            checked={formData.agreeToRules}
            onChange={(e) => setFormData({ ...formData, agreeToRules: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-border bg-surface-3 text-primary focus:ring-secondary"
          />
          <label htmlFor="agree-rules" className="text-xs text-text-2 leading-relaxed">
            I agree to the <a href="/careers#rules" className="text-warm underline hover:text-white">Startup Lab Rules & Fairness terms</a>. I confirm this submission is my own original work.
          </label>
        </div>

        {/* Error Alert */}
        {status === 'error' && (
          <div className="flex items-center gap-3 rounded-md border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          <span>Submit your solution</span>
          <Send size={14} />
        </Button>
      </form>
    </GlassCard>
  );
}

'use client';

import React, { useState } from 'react';
import GlassCard from './GlassCard';
import HudBox from './HudBox';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function SoftwareContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Software Development',
    details: '',
    budget: '$10k - $25k',
    website: '', // Honeypot trap: hidden from humans, bots fill it
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        service: 'Software Development',
        details: '',
        budget: '$10k - $25k',
        website: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    }
  };

  return (
    <GlassCard accentColor="#6366f1" className="p-8 md:p-12">
      <HudBox label="ORENTY SOFTWARE SOLUTIONS // INQUIRY" tag="READY TO ENGAGE" accentColor="#6366f1">
        {status === 'success' ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Inquiry Dispatched Successfully
            </h3>
            <p className="text-sm text-slate-400 max-w-md font-body leading-relaxed mb-8">
              Thank you for reaching out. Our engineering team reviews all incoming scopes within 24 hours. We will be in touch via email.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="font-mono text-xs text-indigo-400 hover:text-indigo-300 underline uppercase tracking-wider"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
            {/* Honeypot field for anti-bot defense */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Full Name <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Business Email <span className="text-indigo-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Company / Project Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Dynamics"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-colors"
                />
              </div>

              {/* Service Interested In */}
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                  Primary Capability Needed
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-colors"
                >
                  <option value="Software Development">Software Development (Full-Stack & Cloud)</option>
                  <option value="Web Development">Web Development (3D & Digital Flagships)</option>
                  <option value="AI Automation">AI Automation (LLMs & Agentic Pipelines)</option>
                  <option value="Growth Strategy">Growth Strategy (Technical Marketing & Funnels)</option>
                  <option value="Multi-Capability">Comprehensive Architecture / Multiple</option>
                </select>
              </div>
            </div>

            {/* Scope / Details */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                Project Overview & Objectives <span className="text-indigo-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe what you want to engineer, key technical requirements, timeline expectations, or desired business outcomes..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-colors resize-none"
              />
            </div>

            {/* Error banner */}
            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-300">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-8 py-4 font-display text-xs uppercase tracking-widest font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] border border-indigo-400/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.8)] transition-all disabled:opacity-50"
              data-cursor-expand="true"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Submitting Scope...</span>
                </>
              ) : (
                <>
                  <span>Dispatch Client Inquiry</span>
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

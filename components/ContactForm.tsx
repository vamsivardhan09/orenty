'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from './GlassCard';
import Button from './Button';
import { Send, CheckCircle2, AlertCircle, MessageSquare, Calendar, Mail, ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    need: 'Web app',
    budget: '$5,000 - $15,000',
    message: '',
    website: '', // Honeypot field
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#book-a-call' || hash === '#request-call' || hash === '#call') {
        setFormData((prev) => ({
          ...prev,
          need: '30-min Scoping Call',
          message: prev.message || "I'd like to schedule a 1-on-1 30-minute scoping call to discuss our project.",
        }));
        const formEl = document.getElementById('contact-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth' });
          const nameInput = document.getElementById('contact-name');
          if (nameInput) nameInput.focus();
        }
      }
    }
  }, []);

  const handleSelectScopingCall = () => {
    setFormData((prev) => ({
      ...prev,
      need: '30-min Scoping Call',
      message: prev.message || "I'd like to schedule a 1-on-1 30-minute scoping call to discuss our project.",
    }));
    const formEl = document.getElementById('contact-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('contact-name');
      if (nameInput) nameInput.focus();
    }
  };

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
        phone: '',
        need: 'Web app',
        budget: '$5,000 - $15,000',
        message: '',
        website: '',
      });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Direct contact methods */}
      <div className="lg:col-span-5 space-y-5">
        <GlassCard className="p-6 md:p-8">
          <span className="eyebrow-label block mb-2 text-neutral-400">DIRECT ACCESS</span>
          <h3 className="h3-card text-text mb-2">
            Prefer direct contact?
          </h3>
          <p className="text-sm text-text-2 leading-relaxed mb-6 font-normal">
            Choose whichever communication channel is fastest for you. All messages go straight to our engineering team.
          </p>

          <div className="space-y-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/?text=Hi%20Orenty%20team,%20I'd%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-emerald-500/40 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <MessageSquare size={16} />
                </div>
                <div>
                  <span className="block text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">Chat on WhatsApp</span>
                  <span className="block text-xs text-neutral-400">Direct instant messaging</span>
                </div>
              </div>
              <ArrowRight size={13} className="text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
            </a>

            {/* Request a 1-on-1 Scoping Call */}
            <button
              type="button"
              onClick={handleSelectScopingCall}
              className="w-full flex items-center justify-between p-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25 transition-all duration-200 group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/[0.05] text-neutral-300 flex items-center justify-center shrink-0 border border-white/10">
                  <Calendar size={16} />
                </div>
                <div>
                  <span className="block text-sm font-medium text-white group-hover:text-white transition-colors">Request a 30-min call</span>
                  <span className="block text-xs text-neutral-400">1-on-1 technical scoping session</span>
                </div>
              </div>
              <ArrowRight size={13} className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>

            {/* Direct Email */}
            <a
              href="mailto:contact@orenty.in"
              className="flex items-center justify-between p-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/25 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/20">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block text-sm font-medium text-white group-hover:text-sky-300 transition-colors">Email us directly</span>
                  <span className="block text-xs text-neutral-400">contact@orenty.in · 24h reply</span>
                </div>
              </div>
              <ArrowRight size={13} className="text-neutral-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
            </a>
          </div>
        </GlassCard>

        <div className="rounded-card border border-white/[0.07] bg-[#08080C] p-6 text-sm text-neutral-400 leading-relaxed">
          <p className="font-semibold text-white mb-1.5 text-xs uppercase tracking-wider font-mono">Our Commitment</p>
          We review project details within 24 hours. You receive an architectural breakdown, timeline estimate, and clear milestone proposals—no sales fluff.
        </div>
      </div>

      {/* Right: Enquiry Form */}
      <div id="contact-form" className="lg:col-span-7 scroll-mt-24">
        <div id="book-a-call" className="scroll-mt-24">
          <GlassCard className="p-7 md:p-9">
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="h3-card text-text mb-2">
                  Enquiry sent successfully
                </h3>
                <p className="text-sm text-text-2 max-w-md font-body leading-relaxed mb-6">
                  Thank you for reaching out. We review all incoming project scopes within 24 hours and will get back to you with next steps.
                </p>
                <Button onClick={() => setStatus('idle')} variant="secondary">
                  <span>Send another message</span>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field */}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
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
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                      Phone / WhatsApp <span className="text-neutral-500 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
                    />
                  </div>

                  {/* What do you need? */}
                  <div>
                    <label htmlFor="contact-need" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                      What do you need?
                    </label>
                    <select
                      id="contact-need"
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full rounded-lg border border-white/[0.08] bg-[#0A0A0E] px-4 py-2.5 text-sm text-white transition-all duration-200 focus:border-white/30 focus:outline-none"
                    >
                      <option value="30-min Scoping Call">1-on-1 Scoping Call (30 min)</option>
                      <option value="Web app">Web application</option>
                      <option value="Website">Marketing website / platform</option>
                      <option value="Mobile app">Mobile app (iOS & Android)</option>
                      <option value="AI automation">Custom AI automation</option>
                      <option value="Other">Other technical build</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="contact-budget" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                    Estimated budget range
                  </label>
                  <select
                    id="contact-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-lg border border-white/[0.08] bg-[#0A0A0E] px-4 py-2.5 text-sm text-white transition-all duration-200 focus:border-white/30 focus:outline-none"
                  >
                    <option value="Flexible / To be discussed">Flexible / To be discussed</option>
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                    <option value="$30,000+">$30,000+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                    Tell us about your project <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="What are you looking to build, what is your timeline, and what goals do you have?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-neutral-500 transition-all duration-200 focus:border-white/30 focus:bg-white/[0.04] focus:outline-none"
                  />
                </div>

                {/* Error Alert */}
                {status === 'error' && (
                  <div className="flex items-center gap-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Primary Action Button: Send enquiry */}
                <Button
                  type="submit"
                  variant="primary"
                  loading={status === 'submitting'}
                  className="w-full sm:w-auto"
                >
                  <span>Send enquiry</span>
                  <Send size={14} className="btn-arrow" />
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

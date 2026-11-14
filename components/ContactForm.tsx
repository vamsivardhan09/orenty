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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left: Direct contact methods */}
      <div className="lg:col-span-5 space-y-6">
        <div className="rounded-card border border-border bg-surface-2 p-6 md:p-8">
          <h3 className="h3-card text-text mb-3">
            Prefer direct contact?
          </h3>
          <p className="text-sm text-text-2 leading-relaxed mb-6">
            We are fast to respond. Choose whichever channel is easiest for you.
          </p>

          <div className="space-y-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/?text=Hi%20Orenty%20team,%20I'd%20like%20to%20discuss%20a%20project"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-4 rounded-md border border-border bg-surface-3 hover:border-emerald-500/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-text group-hover:text-white transition-colors">Chat on WhatsApp</span>
                  <span className="block text-xs text-text-3">Quick inquiries & messaging</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-text-3 group-hover:text-emerald-400 transition-colors" />
            </a>

            {/* Request a 1-on-1 Scoping Call */}
            <button
              type="button"
              onClick={handleSelectScopingCall}
              className="w-full flex items-center justify-between p-4 rounded-md border border-border bg-surface-3 hover:border-primary/50 transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary-glow flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Calendar size={18} />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-text group-hover:text-white transition-colors">Request a 30-min call</span>
                  <span className="block text-xs text-text-3">Direct 1-on-1 session with our team</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-text-3 group-hover:text-primary-glow transition-colors" />
            </button>

            {/* Direct Email */}
            <a
              href="mailto:contact@orenty.in"
              className="flex items-center justify-between p-4 rounded-md border border-border bg-surface-3 hover:border-secondary/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-sm font-semibold text-text group-hover:text-white transition-colors">Email us directly</span>
                  <span className="block text-xs text-text-3">contact@orenty.in · 24h response</span>
                </div>
              </div>
              <ArrowRight size={14} className="text-text-3 group-hover:text-secondary transition-colors" />
            </a>
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface-2 p-6 text-sm text-text-3 leading-relaxed">
          <p className="font-medium text-text mb-1">What happens next?</p>
          We review project details within 24 hours. We then schedule a short scoping call or reply with initial estimates, architecture recommendations, and timeline.
        </div>
      </div>

      {/* Right: Enquiry Form */}
      <div id="contact-form" className="lg:col-span-7 scroll-mt-24">
        <div id="book-a-call" className="scroll-mt-24">
          <GlassCard className="p-8 md:p-10">
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="h3-card text-text mb-2">
                  Enquiry sent successfully
                </h3>
                <p className="text-sm text-text-2 max-w-md font-body leading-relaxed mb-8">
                  Thank you for reaching out. We review all incoming project scopes within 24 hours and will get back to you with next steps.
                </p>
                <Button onClick={() => setStatus('idle')} variant="secondary">
                  <span>Send another message</span>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-name"
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
                    <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone / WhatsApp */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
                      Phone / WhatsApp <span className="text-text-3 font-normal">(optional)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
                    />
                  </div>

                  {/* What do you need? */}
                  <div>
                    <label htmlFor="contact-need" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
                      What do you need?
                    </label>
                    <select
                      id="contact-need"
                      value={formData.need}
                      onChange={(e) => setFormData({ ...formData, need: e.target.value })}
                      className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text transition-colors focus:border-secondary focus:outline-none"
                    >
                      <option value="30-min Scoping Call">1-on-1 Scoping Call (30 min)</option>
                      <option value="Web app">Web app</option>
                      <option value="Website">Website</option>
                      <option value="Mobile app">Mobile app</option>
                      <option value="AI automation">AI automation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label htmlFor="contact-budget" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
                    Estimated budget range
                  </label>
                  <select
                    id="contact-budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text transition-colors focus:border-secondary focus:outline-none"
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
                <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-text-2 mb-2">
                  Tell us about your project <span className="text-primary">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="What are you looking to build, what is your timeline, and what goals do you have?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md border border-border bg-surface-3 px-4 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
                />
              </div>

              {/* Error Alert */}
              {status === 'error' && (
                <div className="flex items-center gap-3 rounded-md border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Primary Action Button: Send enquiry */}
              <Button
                type="submit"
                variant="primary"
                loading={status === 'submitting'}
                className="w-full md:w-auto"
              >
                <span>Send enquiry</span>
                <Send size={15} />
              </Button>
            </form>
          )}
        </GlassCard>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Button from './Button';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ProductWaitlistFormProps {
  productName: string;
  slug: string;
}

export default function ProductWaitlistForm({
  productName,
  slug,
}: ProductWaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('submitting');

    try {
      // Post to contact API with waitlist intent
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Waitlist Subscriber',
          email,
          need: `Waitlist: ${productName}`,
          message: `User joined the waitlist for ${productName} (${slug}).`,
        }),
      });
    } catch {
      // Continue to show friendly success
    }

    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-5 text-center flex items-center justify-center gap-3 text-emerald-400 text-sm">
        <CheckCircle2 size={18} />
        <span>You're on the list! We will notify you when early access opens for {productName}.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-pill border border-border bg-surface-3 px-5 py-3 text-sm text-text placeholder-text-3 transition-colors focus:border-secondary focus:outline-none"
      />
      <Button
        type="submit"
        variant="primary"
        loading={status === 'submitting'}
      >
        <span>Join waitlist</span>
        <ArrowRight size={14} className="btn-arrow" />
      </Button>
    </form>
  );
}

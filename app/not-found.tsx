import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center bg-bg px-6 text-center text-text">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full bg-primary/10 blur-[130px]" />

      <div className="relative z-10 max-w-md mx-auto">
        <span className="text-sm font-semibold uppercase tracking-widest text-secondary block mb-3">
          404 ERROR
        </span>
        <h1 className="h1-hero text-text mb-4">
          Page not found.
        </h1>
        <p className="sub-paragraph text-text-2 mb-8">
          The page you are looking for doesn&apos;t exist or has moved. Here are a few places you might want to go:
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <Button href="/" variant="primary">
            <span>Return to home</span>
            <Home size={15} />
          </Button>
          <Button href="/contact" variant="secondary">
            <span>Start a project</span>
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
        </div>

        <div className="pt-6 border-t border-border flex items-center justify-center gap-6 text-sm text-text-3">
          <Link href="/services" className="hover:text-text transition-colors">
            Services
          </Link>
          <Link href="/products" className="hover:text-text transition-colors">
            Products
          </Link>
          <Link href="/careers" className="hover:text-text transition-colors">
            Careers
          </Link>
          <Link href="/contact" className="hover:text-text transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

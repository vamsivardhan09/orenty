'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface-1 text-text-2">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info & Story */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="Orenty Home">
              <div className="relative h-8 w-28 md:w-32">
                <Image
                  src="/brand/orenty-logo-black.svg"
                  alt="Orenty"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-4 font-body text-[15px] text-text-2 leading-relaxed max-w-sm">
              We build software for ambitious businesses and launch products of our own.
            </p>
            <p className="mt-4 text-sm text-text-3 font-body">
              Bengaluru, India · <a href={`mailto:${siteContent.footer.contactEmail}`} className="text-secondary hover:underline">{siteContent.footer.contactEmail}</a>
            </p>
            <div className="mt-6 flex items-center gap-5">
              {siteContent.footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-text-3 hover:text-text transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 1: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-text tracking-wide mb-4">
              Services
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/services#websites" className="transition-colors hover:text-text">
                  Websites & Web Apps
                </Link>
              </li>
              <li>
                <Link href="/services#mobile" className="transition-colors hover:text-text">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services#ai" className="transition-colors hover:text-text">
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link href="/services#growth" className="transition-colors hover:text-text">
                  Growth & Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Products */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-text tracking-wide mb-4">
              Products
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/products/syncedin" className="transition-colors hover:text-text">
                  SyncedIn
                </Link>
              </li>
              <li>
                <Link href="/products/fanbase" className="transition-colors hover:text-text">
                  Fanbase
                </Link>
              </li>
              <li>
                <Link href="/products/job-pilot" className="transition-colors hover:text-text">
                  Job Pilot
                </Link>
              </li>
              <li>
                <Link href="/products/g1-mart" className="transition-colors hover:text-text">
                  G1 Mart
                </Link>
              </li>
              <li>
                <Link href="/products/pujari-ai" className="transition-colors hover:text-text">
                  Pujari.ai
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Careers / Startup Lab */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-text tracking-wide mb-4">
              Careers
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/careers" className="transition-colors hover:text-text">
                  Startup Lab
                </Link>
              </li>
              <li>
                <Link href="/careers#challenges" className="transition-colors hover:text-text">
                  Open Challenges
                </Link>
              </li>
              <li>
                <Link href="/careers#how-it-works" className="transition-colors hover:text-text">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/careers#rules" className="transition-colors hover:text-text">
                  Rules & Fairness
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-text tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/about" className="transition-colors hover:text-text">
                  About Orenty
                </Link>
              </li>
              <li>
                <Link href="/work" className="transition-colors hover:text-text">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-text">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="transition-colors hover:text-text">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-border pt-8 text-sm text-text-3 gap-4">
          <p>© {new Date().getFullYear()} Orenty (orenty.in). All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-text transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-text transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

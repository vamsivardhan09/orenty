'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#08080A] text-slate-400">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info & Story */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block" aria-label="Orenty Home">
              <div className="relative h-8 w-28 md:w-32">
                <Image
                  src="/brand/orenty-logo-white.svg"
                  alt="Orenty"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-4 font-body text-[15px] text-slate-400 leading-relaxed max-w-sm">
              We build software for ambitious businesses and launch products of our own.
            </p>
            <p className="mt-4 text-sm text-slate-500 font-body">
              Bengaluru, India · <a href={`mailto:${siteContent.footer.contactEmail}`} className="text-white hover:underline">{siteContent.footer.contactEmail}</a>
            </p>
            <div className="mt-6 flex items-center gap-5">
              {siteContent.footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 1: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Services
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/services#websites" className="transition-colors hover:text-white">
                  Websites & Web Apps
                </Link>
              </li>
              <li>
                <Link href="/services#mobile" className="transition-colors hover:text-white">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services#ai" className="transition-colors hover:text-white">
                  AI Automation
                </Link>
              </li>
              <li>
                <Link href="/services#growth" className="transition-colors hover:text-white">
                  Growth & Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Products */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Products
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/products/syncedin" className="transition-colors hover:text-white">
                  SyncedIn
                </Link>
              </li>
              <li>
                <Link href="/products/fanbase" className="transition-colors hover:text-white">
                  Fanbase
                </Link>
              </li>
              <li>
                <Link href="/products/job-pilot" className="transition-colors hover:text-white">
                  Job Pilot
                </Link>
              </li>
              <li>
                <Link href="/products/pujari-ai" className="transition-colors hover:text-white">
                  Pujari.ai
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/about" className="transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/work" className="transition-colors hover:text-white">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/careers" className="transition-colors hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Startup Lab */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white tracking-wide mb-4">
              Startup Lab
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <Link href="/careers" className="transition-colors hover:text-white">
                  Open Challenges
                </Link>
              </li>
              <li>
                <Link href="/apply" className="transition-colors hover:text-white">
                  Apply to Build
                </Link>
              </li>
              <li>
                <Link href="/careers#ownership" className="transition-colors hover:text-white">
                  Ownership Model
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-8 md:flex-row text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Orenty. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

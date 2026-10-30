'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteContent } from '@/content/site';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-navy-950/90 text-slate-400 overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block" aria-label="Orenty Home">
              <div className="relative h-8 w-32">
                <Image
                  src="/brand/orenty-logo-white.svg"
                  alt="Orenty Logo"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="mt-4 font-display text-lg text-slate-200 font-medium">
              {siteContent.footer.tagline}
            </p>
            <p className="mt-3 max-w-md text-sm text-slate-400 leading-relaxed">
              Orenty builds intelligent software for forward-looking enterprises, develops proprietary platforms, and incubates ambitious builder teams through the Startup Lab.
            </p>

            {/* Honest Ownership Callout */}
            <div className="mt-6 rounded-lg border border-violet-500/20 bg-violet-950/20 p-4 text-xs text-violet-300/80 leading-relaxed">
              <span className="font-mono uppercase font-bold text-violet-300 block mb-1">
                [LAB OWNERSHIP NOTICE]
              </span>
              {siteContent.footer.ownershipNotice}
            </div>
          </div>

          {/* Col 2: Divisions */}
          <div className="lg:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-200 font-semibold mb-4">
              Divisions
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/software"
                  className="transition-colors hover:text-violet-300 flex items-center justify-between group"
                >
                  Software Solutions
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-violet-300 flex items-center justify-between group"
                >
                  Proprietary Products
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/lab"
                  className="transition-colors hover:text-violet-300 flex items-center justify-between group"
                >
                  Startup Lab
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/apply"
                  className="text-violet-400 font-medium transition-colors hover:text-violet-300 flex items-center justify-between group"
                >
                  Apply
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Products */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-200 font-semibold mb-4">
              Products
            </h4>
            <ul className="space-y-3 text-sm">
              {siteContent.products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="transition-colors hover:text-violet-300 flex items-center justify-between group"
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {p.status}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Coordinates */}
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-200 font-semibold mb-4">
              Contact
            </h4>
            <p className="text-sm text-slate-400 mb-2">Direct inquiries:</p>
            <a
              href={`mailto:${siteContent.footer.contactEmailPlaceholder}`}
              className="text-xs font-mono text-violet-300 hover:text-white transition-colors block break-all"
            >
              {siteContent.footer.contactEmailPlaceholder}
            </a>

            <div className="mt-6 flex items-center gap-4">
              {siteContent.footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-slate-400 hover:text-violet-300 transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between border-t border-white/[0.06] pt-8 text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Orenty (orenty.in). All rights reserved.</p>
          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>SYSTEM // STABLE</span>
            <span>SECURE // VERIFIED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

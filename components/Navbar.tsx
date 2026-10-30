'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteContent } from '@/content/site';
import MagneticButton from './MagneticButton';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = siteContent.navigation.filter((item) => item.label !== 'Apply');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-950/80 py-3 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="Orenty Home"
        >
          <div className="relative h-9 w-32 md:w-36">
            <Image
              src="/brand/orenty-logo-white.svg"
              alt="Orenty Logo"
              fill
              className="object-contain object-left transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-display text-xs uppercase tracking-widest font-medium transition-colors hover:text-white ${
                  isActive ? 'text-violet-300 font-semibold' : 'text-slate-400'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-indigo-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop CTA: Single CTA across site is "Apply" */}
        <div className="hidden items-center gap-4 md:flex">
          <MagneticButton href="/apply" variant="primary">
            Apply
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 md:hidden hover:text-white"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] border-b border-white/10 bg-navy-950/95 p-6 backdrop-blur-2xl md:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-5">
            {navLinks.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-display uppercase tracking-widest ${
                    isActive ? 'text-violet-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-violet-600 px-6 py-3 font-display text-xs uppercase tracking-widest font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
              >
                Apply
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

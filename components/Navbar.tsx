'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteContent } from '@/content/site';
import Button from './Button';
import { Menu, X, ArrowRight } from 'lucide-react';

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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = siteContent.navigation;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05050A]/85 py-3 backdrop-blur-xl border-b border-surface-border shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
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
          <div className="relative h-8 w-28 md:h-9 md:w-34">
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
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-body text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-primary-glow font-semibold' : 'text-text-2'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop CTA: Single Primary Button */}
        <div className="hidden items-center gap-4 md:flex">
          <Button href="/software#contact" variant="primary">
            <span>Start a project</span>
            <ArrowRight size={15} className="btn-arrow" />
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-glass text-text-2 md:hidden hover:text-white focus-visible:outline-none"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Full-screen Mobile Glass Menu with Large Links and Primary CTA */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] z-50 flex flex-col justify-between bg-[#05050A]/95 p-8 backdrop-blur-2xl md:hidden animate-in fade-in slide-in-from-top-4 duration-300 border-t border-surface-border">
          <nav className="flex flex-col gap-6 pt-6">
            {navLinks.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-display text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? 'text-primary-glow' : 'text-text hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 pb-12 border-t border-surface-border">
            <Button
              href="/software#contact"
              variant="primary"
              className="w-full !py-4 !text-base"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Start a project</span>
              <ArrowRight size={18} className="btn-arrow" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

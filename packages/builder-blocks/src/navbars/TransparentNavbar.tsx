'use client';

import React, { useState, useEffect } from 'react';
import { BlockButton } from '../primitives/Button';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface TransparentNavbarProps {
  agency: BlockAgency;
  items: BlockNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  /** Threshold (px) at which navbar transitions to opaque. */
  scrollThreshold?: number;
  className?: string;
}

export const TransparentNavbar: React.FC<TransparentNavbarProps> = ({
  agency,
  items,
  ctaLabel = 'Book Now',
  ctaHref = '/contact',
  scrollThreshold = 80,
  className,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollThreshold]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[var(--bb-ink,#0A0A0F)]/95 backdrop-blur-md border-b border-[var(--bb-border,#2A2A3A)]'
          : 'bg-transparent',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3">
            {agency.logo ? (
              <img src={agency.logo} alt={agency.name} className="h-10 object-contain" />
            ) : (
              <span className="font-display font-bold text-2xl text-white drop-shadow-lg">
                {agency.name}
              </span>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-2">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-colors',
                  scrolled
                    ? 'text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)]'
                    : 'text-white/90 hover:text-white drop-shadow-md',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            {ctaHref && <BlockButton href={ctaHref} size="sm">{ctaLabel}</BlockButton>}
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={cn('lg:hidden p-2', scrolled ? 'text-[var(--bb-text,#F1F0FF)]' : 'text-white drop-shadow-lg')}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-[var(--bb-ink,#0A0A0F)]/95 backdrop-blur-md border-t border-[var(--bb-border,#2A2A3A)] py-4">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="block px-4 py-3 text-[var(--bb-text,#F1F0FF)] font-medium"
              >
                {item.label}
              </a>
            ))}
            {ctaHref && (
              <div className="px-4 pt-2">
                <BlockButton href={ctaHref} fullWidth>{ctaLabel}</BlockButton>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

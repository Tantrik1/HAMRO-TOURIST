'use client';

import React, { useState } from 'react';
import { BlockButton } from '../primitives/Button';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface ClassicNavbarProps {
  agency: BlockAgency;
  items: BlockNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  sticky?: boolean;
  showSearch?: boolean;
  className?: string;
}

export const ClassicNavbar: React.FC<ClassicNavbarProps> = ({
  agency,
  items,
  ctaLabel = 'Book Now',
  ctaHref = '/contact',
  sticky = true,
  showSearch = false,
  className,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        'w-full bg-[var(--bb-ink,#0A0A0F)]/95 backdrop-blur-md border-b border-[var(--bb-border,#2A2A3A)]',
        sticky && 'sticky top-0 z-50',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-3">
            {agency.logo ? (
              <img src={agency.logo} alt={agency.name} className="h-8 lg:h-10 object-contain" />
            ) : (
              <span className="font-display font-bold text-xl lg:text-2xl text-[var(--bb-text,#F1F0FF)]">
                {agency.name}
              </span>
            )}
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="px-4 py-2 text-sm font-medium text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {showSearch && (
              <button className="p-2 text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors" aria-label="Search">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
            {ctaHref && <BlockButton href={ctaHref} size="sm">{ctaLabel}</BlockButton>}
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden p-2 text-[var(--bb-text,#F1F0FF)]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--bb-border,#2A2A3A)] py-4 space-y-1">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="block px-4 py-3 text-[var(--bb-text,#F1F0FF)] font-medium hover:bg-[var(--bb-surface,#111118)] rounded-lg transition-colors"
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

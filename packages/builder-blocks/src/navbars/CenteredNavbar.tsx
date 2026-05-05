'use client';

import React, { useState } from 'react';
import { BlockButton } from '../primitives/Button';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface CenteredNavbarProps {
  agency: BlockAgency;
  items: BlockNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  sticky?: boolean;
  className?: string;
}

/** Logo centered, nav split left/right. Editorial / luxury feel. */
export const CenteredNavbar: React.FC<CenteredNavbarProps> = ({
  agency,
  items,
  ctaLabel = 'Reserve',
  ctaHref = '/contact',
  sticky = true,
  className,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const half = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, half);
  const rightItems = items.slice(half);

  return (
    <header
      className={cn(
        'w-full bg-[var(--bb-ink,#0A0A0F)]/95 backdrop-blur-md border-b border-[var(--bb-border,#2A2A3A)]',
        sticky && 'sticky top-0 z-50',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          <nav className="hidden lg:flex items-center gap-6">
            {leftItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="text-sm font-medium uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="/" className="flex items-center justify-center lg:justify-self-center">
            {agency.logo ? (
              <img src={agency.logo} alt={agency.name} className="h-10 lg:h-12 object-contain" />
            ) : (
              <span className="font-display font-bold text-2xl text-[var(--bb-text,#F1F0FF)] tracking-wide">
                {agency.name}
              </span>
            )}
          </a>

          <nav className="hidden lg:flex items-center justify-end gap-6">
            {rightItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="text-sm font-medium uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
              >
                {item.label}
              </a>
            ))}
            {ctaHref && <BlockButton href={ctaHref} variant="outline" size="sm">{ctaLabel}</BlockButton>}
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden col-start-3 justify-self-end p-2 text-[var(--bb-text,#F1F0FF)]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-[var(--bb-border,#2A2A3A)] py-4 space-y-1">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="block px-4 py-3 text-[var(--bb-text,#F1F0FF)] font-medium uppercase tracking-widest text-sm"
              >
                {item.label}
              </a>
            ))}
            {ctaHref && (
              <div className="px-4 pt-2">
                <BlockButton href={ctaHref} variant="outline" fullWidth>{ctaLabel}</BlockButton>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

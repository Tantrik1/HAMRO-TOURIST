'use client';

import React, { useState } from 'react';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface MinimalNavbarProps {
  agency: BlockAgency;
  items: BlockNavItem[];
  sticky?: boolean;
  className?: string;
}

export const MinimalNavbar: React.FC<MinimalNavbarProps> = ({
  agency,
  items,
  sticky = true,
  className,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(
        'w-full bg-[var(--bb-ink,#0A0A0F)]',
        sticky && 'sticky top-0 z-50',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <a href="/" className="flex items-center gap-2">
            {agency.logo ? (
              <img src={agency.logo} alt={agency.name} className="h-7 object-contain" />
            ) : (
              <span className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)]">
                {agency.name}
              </span>
            )}
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="text-sm font-medium text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-1.5 text-[var(--bb-text,#F1F0FF)]"
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
          <div className="md:hidden border-t border-[var(--bb-border,#2A2A3A)] py-3 space-y-1">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="block px-3 py-2 text-[var(--bb-text,#F1F0FF)] hover:bg-[var(--bb-surface,#111118)] rounded-lg"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

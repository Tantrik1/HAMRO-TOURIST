'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BlockButton } from '../primitives/Button';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface MegaNavbarProps {
  agency: BlockAgency;
  items: BlockNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  sticky?: boolean;
  className?: string;
}

export const MegaNavbar: React.FC<MegaNavbarProps> = ({
  agency,
  items,
  ctaLabel = 'Book Now',
  ctaHref = '/contact',
  sticky = true,
  className,
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

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

          <nav className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {items.map((item) => (
              <div key={item.label} className="relative">
                {item.children && item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors',
                        activeDropdown === item.label
                          ? 'text-[var(--bb-primary,#7C3AED)]'
                          : 'text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)]',
                      )}
                    >
                      {item.label}
                      <svg
                        className={cn('w-4 h-4 transition-transform', activeDropdown === item.label && 'rotate-180')}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 w-[680px] bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-xl shadow-2xl p-6 mt-2">
                        <div className="grid grid-cols-3 gap-6">
                          {item.children.map((child) => (
                            <div key={child.label}>
                              <a
                                href={child.href}
                                target={child.target}
                                className="block font-display font-semibold text-[var(--bb-text,#F1F0FF)] mb-3 hover:text-[var(--bb-primary,#7C3AED)] transition-colors"
                              >
                                {child.label}
                              </a>
                              {child.description && (
                                <p className="text-xs text-[var(--bb-text-soft,#9B9BB8)] mb-2">
                                  {child.description}
                                </p>
                              )}
                              {child.children && (
                                <ul className="space-y-2">
                                  {child.children.slice(0, 5).map((sub) => (
                                    <li key={sub.label}>
                                      <a
                                        href={sub.href}
                                        target={sub.target}
                                        className="text-sm text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-secondary,#06B6D4)] transition-colors"
                                      >
                                        {sub.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    target={item.target}
                    className="px-4 py-2 text-sm font-medium text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:block">
            {ctaHref && <BlockButton href={ctaHref}>{ctaLabel}</BlockButton>}
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
          <div className="lg:hidden border-t border-[var(--bb-border,#2A2A3A)] py-4">
            <nav className="space-y-1">
              {items.map((item) => (
                <div key={item.label}>
                  {item.children && item.children.length > 0 ? (
                    <>
                      <button
                        onClick={() => setExpandedMobile(expandedMobile === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full px-4 py-3 text-[var(--bb-text,#F1F0FF)] font-medium"
                      >
                        {item.label}
                        <svg
                          className={cn('w-4 h-4 transition-transform', expandedMobile === item.label && 'rotate-180')}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {expandedMobile === item.label && (
                        <div className="pl-4 pb-2 space-y-1">
                          {item.children.map((child) => (
                            <a
                              key={child.label}
                              href={child.href}
                              target={child.target}
                              className="block px-4 py-2 text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)]"
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      target={item.target}
                      className="block px-4 py-3 text-[var(--bb-text,#F1F0FF)] font-medium hover:bg-[var(--bb-surface,#111118)] rounded-lg"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>
            {ctaHref && (
              <div className="px-4 pt-3">
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

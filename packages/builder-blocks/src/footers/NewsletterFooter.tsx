import React from 'react';
import { BlockButton } from '../primitives/Button';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface NewsletterFooterProps {
  agency: BlockAgency;
  heading?: string;
  subheading?: string;
  newsletterAction?: string;
  items?: BlockNavItem[];
  copyright?: string;
  className?: string;
}

export const NewsletterFooter: React.FC<NewsletterFooterProps> = ({
  agency,
  heading = 'Stay in the loop',
  subheading = 'Get curated stories, deals, and travel inspiration straight to your inbox.',
  newsletterAction = '#',
  items = [],
  copyright,
  className,
}) => {
  const year = new Date().getFullYear();
  const finalCopyright = copyright || `© ${year} ${agency.name}.`;

  return (
    <footer className={cn('bg-[var(--bb-ink,#0A0A0F)] border-t border-[var(--bb-border,#2A2A3A)]', className)}>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/15 via-transparent to-[var(--bb-secondary,#06B6D4)]/15 pointer-events-none" />
        <div className="relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--bb-text,#F1F0FF)] leading-tight">
                {heading}
              </h2>
              <p className="mt-4 text-base text-[var(--bb-text-soft,#9B9BB8)] max-w-md">{subheading}</p>
            </div>
            <form action={newsletterAction} method="post" className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="flex-1 min-h-[52px] rounded-full bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] px-5 text-[var(--bb-text,#F1F0FF)] focus:outline-none focus:border-[var(--bb-primary,#7C3AED)]"
                required
              />
              <BlockButton size="lg" type="submit" className="!min-h-[52px]">
                Subscribe
              </BlockButton>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6 border-t border-[var(--bb-border,#2A2A3A)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {agency.logo ? (
              <img src={agency.logo} alt={agency.name} className="h-7 object-contain" />
            ) : (
              <span className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)]">{agency.name}</span>
            )}
            <span className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{finalCopyright}</span>
          </div>
          {items.length > 0 && (
            <nav className="flex items-center gap-5">
              {items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.target}
                  className="text-xs text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface CenteredFooterProps {
  agency: BlockAgency;
  items?: BlockNavItem[];
  tagline?: string;
  copyright?: string;
  className?: string;
}

export const CenteredFooter: React.FC<CenteredFooterProps> = ({
  agency,
  items = [],
  tagline,
  copyright,
  className,
}) => {
  const year = new Date().getFullYear();
  const finalCopyright = copyright || `© ${year} ${agency.name}. All rights reserved.`;
  const finalTagline = tagline || agency.tagline;

  return (
    <footer className={cn('bg-[var(--bb-ink,#0A0A0F)] border-t border-[var(--bb-border,#2A2A3A)]', className)}>
      <div className="mx-auto w-full max-w-screen-md px-4 sm:px-6 lg:px-8 py-12 text-center">
        <a href="/" className="inline-flex items-center gap-3">
          {agency.logo ? (
            <img src={agency.logo} alt={agency.name} className="h-10 mx-auto object-contain" />
          ) : (
            <span className="font-display font-bold text-2xl text-[var(--bb-text,#F1F0FF)]">
              {agency.name}
            </span>
          )}
        </a>
        {finalTagline && (
          <p className="mt-4 text-sm text-[var(--bb-text-soft,#9B9BB8)] max-w-md mx-auto">
            {finalTagline}
          </p>
        )}
        {items.length > 0 && (
          <nav className="mt-6 flex flex-wrap items-center justify-center gap-6">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.target}
                className="text-sm text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-text,#F1F0FF)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
        {agency.social && Object.keys(agency.social).length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            {Object.entries(agency.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform}
                className="w-9 h-9 rounded-full bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] flex items-center justify-center text-[var(--bb-text-soft,#9B9BB8)] hover:text-[var(--bb-primary,#7C3AED)] transition-colors"
              >
                <span className="text-xs uppercase">{platform[0]}</span>
              </a>
            ))}
          </div>
        )}
        <div className="mt-8 pt-6 border-t border-[var(--bb-border,#2A2A3A)] text-xs text-[var(--bb-text-soft,#9B9BB8)]">
          {finalCopyright}
        </div>
      </div>
    </footer>
  );
};

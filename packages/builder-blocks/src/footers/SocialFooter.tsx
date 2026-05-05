import React from 'react';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface SocialFooterProps {
  agency: BlockAgency;
  items?: BlockNavItem[];
  copyright?: string;
  className?: string;
}

export const SocialFooter: React.FC<SocialFooterProps> = ({
  agency,
  items = [],
  copyright,
  className,
}) => {
  const year = new Date().getFullYear();
  const finalCopyright = copyright || `© ${year} ${agency.name}`;

  return (
    <footer className={cn('bg-[var(--bb-ink,#0A0A0F)] border-t border-[var(--bb-border,#2A2A3A)]', className)}>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <a href="/" className="flex items-center gap-3">
            {agency.logo ? (
              <img src={agency.logo} alt={agency.name} className="h-8 object-contain" />
            ) : (
              <span className="font-display font-bold text-xl text-[var(--bb-text,#F1F0FF)]">{agency.name}</span>
            )}
          </a>
          {items.length > 0 && (
            <nav className="flex items-center justify-center gap-5">
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
            <div className="flex items-center justify-end gap-3">
              {Object.entries(agency.social).slice(0, 5).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/15 to-[var(--bb-secondary,#06B6D4)]/15 border border-[var(--bb-primary,#7C3AED)]/30 flex items-center justify-center text-[var(--bb-text,#F1F0FF)] hover:scale-110 transition-transform"
                >
                  <span className="text-xs font-mono uppercase">{platform[0]}</span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="mt-8 pt-6 border-t border-[var(--bb-border,#2A2A3A)] text-center text-xs text-[var(--bb-text-soft,#9B9BB8)]">
          {finalCopyright}
        </div>
      </div>
    </footer>
  );
};

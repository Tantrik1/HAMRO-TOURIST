import React from 'react';
import { cn } from '../utils';
import type { BlockNavItem, BlockAgency } from '../types';

export interface MinimalFooterProps {
  agency: BlockAgency;
  items?: BlockNavItem[];
  copyright?: string;
  className?: string;
}

export const MinimalFooter: React.FC<MinimalFooterProps> = ({
  agency,
  items = [],
  copyright,
  className,
}) => {
  const year = new Date().getFullYear();
  const finalCopyright = copyright || `© ${year} ${agency.name}`;

  return (
    <footer className={cn('bg-[var(--bb-ink,#0A0A0F)] border-t border-[var(--bb-border,#2A2A3A)]', className)}>
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[var(--bb-text-soft,#9B9BB8)]">{finalCopyright}</div>
          {items.length > 0 && (
            <nav className="flex items-center gap-6">
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
        </div>
      </div>
    </footer>
  );
};

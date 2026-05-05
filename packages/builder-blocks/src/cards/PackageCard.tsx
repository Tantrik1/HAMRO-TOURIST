import React from 'react';
import { BlockBadge } from '../primitives/Badge';
import { cn, formatDuration, formatPrice, truncate } from '../utils';
import type { BlockPackage } from '../types';

export type PackageCardVariant = 'standard' | 'highlight' | 'deal' | 'premium';

export interface PackageCardProps {
  package: BlockPackage;
  variant?: PackageCardVariant;
  hrefPrefix?: string;
  className?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  package: pkg,
  variant = 'standard',
  hrefPrefix = '/packages',
  className,
}) => {
  const href = `${hrefPrefix}/${pkg.slug}`;

  if (variant === 'premium') {
    return (
      <a
        href={href}
        className={cn(
          'group relative block rounded-3xl overflow-hidden p-[2px] transition-all duration-300',
          'bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] via-[var(--bb-secondary,#06B6D4)] to-[var(--bb-accent,#F97316)]',
          className,
        )}
      >
        <div className="bg-[var(--bb-surface,#111118)] rounded-[calc(1.5rem-2px)] overflow-hidden">
          <div className="relative h-56 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
            {pkg.coverImageUrl ? (
              <img src={pkg.coverImageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/30 to-[var(--bb-secondary,#06B6D4)]/30" />
            )}
            <div className="absolute top-4 left-4">
              <BlockBadge tone="accent" dot>Premium</BlockBadge>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-display font-bold text-2xl text-[var(--bb-text,#F1F0FF)] line-clamp-2">
              {pkg.title}
            </h3>
            {pkg.highlights && pkg.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {pkg.highlights.slice(0, 3).map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[var(--bb-text-soft,#9B9BB8)]">
                    <svg className="w-4 h-4 mt-0.5 text-[var(--bb-secondary,#06B6D4)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-5 pt-4 border-t border-[var(--bb-border,#2A2A3A)] flex items-center justify-between">
              <span className="text-sm text-[var(--bb-text-soft,#9B9BB8)]">{formatDuration(pkg.durationDays)}</span>
              {pkg.minPrice != null && (
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)]">From</div>
                  <div className="font-mono font-bold text-xl bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] bg-clip-text text-transparent">
                    {formatPrice(pkg.minPrice, pkg.currency)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'deal') {
    return (
      <a
        href={href}
        className={cn(
          'group relative block bg-[var(--bb-surface,#111118)] border border-[var(--bb-accent,#F97316)]/40 rounded-2xl overflow-hidden transition-all',
          'hover:border-[var(--bb-accent,#F97316)] hover:shadow-[0_0_40px_rgba(249,115,22,0.25)]',
          className,
        )}
      >
        <div className="absolute top-3 right-3 z-10">
          <BlockBadge tone="accent" dot>Deal</BlockBadge>
        </div>
        <div className="relative h-48 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
          {pkg.coverImageUrl ? (
            <img src={pkg.coverImageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--bb-accent,#F97316)]/20 to-[var(--bb-primary,#7C3AED)]/20" />
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)] line-clamp-2">
            {pkg.title}
          </h3>
          {pkg.description && (
            <p className="mt-1 text-xs text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
              {truncate(pkg.description, 100)}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{formatDuration(pkg.durationDays)}</span>
            {pkg.minPrice != null && (
              <div className="flex items-baseline gap-1.5">
                {pkg.maxPrice && pkg.maxPrice > pkg.minPrice && (
                  <span className="text-xs line-through text-[var(--bb-text-faint,#5C5C78)]">
                    {formatPrice(pkg.maxPrice, pkg.currency)}
                  </span>
                )}
                <span className="font-mono font-bold text-[var(--bb-accent,#F97316)]">
                  {formatPrice(pkg.minPrice, pkg.currency)}
                </span>
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'highlight') {
    return (
      <a
        href={href}
        className={cn(
          'group flex flex-col sm:flex-row gap-6 bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-3xl overflow-hidden transition-all',
          'hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
          {pkg.coverImageUrl ? (
            <img src={pkg.coverImageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
          )}
        </div>
        <div className="p-6 sm:pl-0 sm:py-8 sm:pr-8 flex-1 flex flex-col justify-center">
          {pkg.badges && pkg.badges[0] && (
            <BlockBadge tone="primary" dot className="mb-3 self-start">
              {pkg.badges[0]}
            </BlockBadge>
          )}
          <h3 className="font-display font-bold text-2xl text-[var(--bb-text,#F1F0FF)] leading-tight">
            {pkg.title}
          </h3>
          {pkg.description && (
            <p className="mt-3 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-3">
              {pkg.description}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-[var(--bb-text-soft,#9B9BB8)]">{formatDuration(pkg.durationDays)}</span>
            {pkg.minPrice != null && (
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)]">From</div>
                <div className="font-mono font-bold text-lg text-[var(--bb-primary,#7C3AED)]">
                  {formatPrice(pkg.minPrice, pkg.currency)}
                </div>
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }

  // standard
  return (
    <a
      href={href}
      className={cn(
        'group block bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl overflow-hidden transition-all',
        'hover:border-[var(--bb-primary,#7C3AED)]/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]',
        className,
      )}
    >
      <div className="relative h-48 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
        {pkg.coverImageUrl ? (
          <img src={pkg.coverImageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)] line-clamp-2">
          {pkg.title}
        </h3>
        {pkg.description && (
          <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
            {truncate(pkg.description, 120)}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[var(--bb-text-soft,#9B9BB8)]">{formatDuration(pkg.durationDays)}</span>
          {pkg.minPrice != null && (
            <span className="font-mono font-bold text-[var(--bb-primary,#7C3AED)]">
              {formatPrice(pkg.minPrice, pkg.currency)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

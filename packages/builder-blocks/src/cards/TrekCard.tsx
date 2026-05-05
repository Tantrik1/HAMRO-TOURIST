import React from 'react';
import { BlockBadge } from '../primitives/Badge';
import { cn, formatDuration, formatPrice, truncate } from '../utils';
import type { BlockTrek } from '../types';

export interface TrekCardProps {
  trek: BlockTrek;
  variant?: 'standard' | 'altitude' | 'overlay';
  hrefPrefix?: string;
  showPrice?: boolean;
  className?: string;
}

export const TrekCard: React.FC<TrekCardProps> = ({
  trek,
  variant = 'standard',
  hrefPrefix = '/treks',
  showPrice = true,
  className,
}) => {
  const href = `${hrefPrefix}/${trek.slug}`;

  if (variant === 'altitude') {
    return (
      <a
        href={href}
        className={cn(
          'group block bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl overflow-hidden transition-all',
          'hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        <div className="relative h-56 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
          {trek.coverImageUrl ? (
            <img src={trek.coverImageUrl} alt={trek.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
          )}
          {trek.maxAltitude && (
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-xl px-3 py-2 text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/70">Max Altitude</div>
              <div className="font-mono font-bold text-lg text-white">{trek.maxAltitude.toLocaleString()}m</div>
            </div>
          )}
          {trek.difficulty && (
            <div className="absolute top-3 left-3">
              <BlockBadge tone="difficulty" difficulty={trek.difficulty as any} dot size="sm">
                {trek.difficulty}
              </BlockBadge>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display font-bold text-xl text-[var(--bb-text,#F1F0FF)] line-clamp-2 group-hover:text-[var(--bb-primary,#7C3AED)] transition-colors">
            {trek.title}
          </h3>
          {trek.description && (
            <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
              {truncate(trek.description, 110)}
            </p>
          )}
          <div className="mt-4 pt-4 border-t border-[var(--bb-border,#2A2A3A)] flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-[var(--bb-text-soft,#9B9BB8)]">
              <span className="inline-flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatDuration(trek.durationDays)}
              </span>
            </div>
            {showPrice && trek.minPrice != null && (
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)]">From</div>
                <div className="font-mono font-bold text-[var(--bb-primary,#7C3AED)]">
                  {formatPrice(trek.minPrice, trek.currency)}
                </div>
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'overlay') {
    return (
      <a href={href} className={cn('group relative block aspect-[3/4] rounded-3xl overflow-hidden', className)}>
        {trek.coverImageUrl ? (
          <img
            src={trek.coverImageUrl}
            alt={trek.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {trek.maxAltitude && (
            <div className="text-[10px] uppercase tracking-widest text-white/80 mb-2">
              Max altitude · {trek.maxAltitude.toLocaleString()}m
            </div>
          )}
          <h3 className="font-display font-bold text-2xl leading-tight">{trek.title}</h3>
          <div className="mt-3 flex items-center gap-3">
            {trek.difficulty && (
              <BlockBadge tone="difficulty" difficulty={trek.difficulty as any} dot size="sm">
                {trek.difficulty}
              </BlockBadge>
            )}
            {trek.durationDays && (
              <span className="text-xs text-white/80">{formatDuration(trek.durationDays)}</span>
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
        'hover:border-[var(--bb-primary,#7C3AED)]/40',
        className,
      )}
    >
      <div className="relative h-48 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
        {trek.coverImageUrl ? (
          <img src={trek.coverImageUrl} alt={trek.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          {trek.difficulty && (
            <BlockBadge tone="difficulty" difficulty={trek.difficulty as any} dot size="sm">
              {trek.difficulty}
            </BlockBadge>
          )}
          {trek.maxAltitude && (
            <BlockBadge tone="neutral" size="sm">
              ▲ {trek.maxAltitude.toLocaleString()}m
            </BlockBadge>
          )}
        </div>
        <h3 className="font-display font-bold text-xl text-[var(--bb-text,#F1F0FF)] line-clamp-2">
          {trek.title}
        </h3>
        {trek.description && (
          <p className="mt-1 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
            {truncate(trek.description, 120)}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[var(--bb-text-soft,#9B9BB8)]">{formatDuration(trek.durationDays)}</span>
          {showPrice && trek.minPrice != null && (
            <span className="font-mono font-bold text-[var(--bb-primary,#7C3AED)]">
              {formatPrice(trek.minPrice, trek.currency)}
            </span>
          )}
        </div>
      </div>
    </a>
  );
};

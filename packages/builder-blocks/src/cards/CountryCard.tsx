import React from 'react';
import { cn } from '../utils';
import type { BlockCountry } from '../types';

export interface CountryCardProps {
  country: BlockCountry;
  variant?: 'standard' | 'flag' | 'overlay';
  hrefPrefix?: string;
  className?: string;
}

export const CountryCard: React.FC<CountryCardProps> = ({
  country,
  variant = 'standard',
  hrefPrefix = '/countries',
  className,
}) => {
  const href = `${hrefPrefix}/${country.slug}`;

  if (variant === 'flag') {
    return (
      <a
        href={href}
        className={cn(
          'group flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] transition-all',
          'hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        {country.flagEmoji && <span className="text-3xl">{country.flagEmoji}</span>}
        <div>
          <h3 className="font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)]">
            {country.name}
          </h3>
          {country.packageCount != null && (
            <p className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{country.packageCount} packages</p>
          )}
        </div>
      </a>
    );
  }

  if (variant === 'overlay') {
    return (
      <a
        href={href}
        className={cn('group relative block aspect-video rounded-3xl overflow-hidden', className)}
      >
        {country.coverImageUrl ? (
          <img src={country.coverImageUrl} alt={country.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {country.flagEmoji && <span className="text-4xl">{country.flagEmoji}</span>}
          <h3 className="mt-2 font-display font-bold text-3xl">{country.name}</h3>
          {country.packageCount != null && (
            <p className="mt-1 text-sm text-white/80">{country.packageCount} experiences</p>
          )}
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
      <div className="relative h-40 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
        {country.coverImageUrl ? (
          <img src={country.coverImageUrl} alt={country.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
        )}
        {country.flagEmoji && (
          <div className="absolute top-3 right-3 text-2xl drop-shadow-lg">{country.flagEmoji}</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)]">{country.name}</h3>
        {country.packageCount != null && (
          <p className="mt-1 text-xs text-[var(--bb-text-soft,#9B9BB8)]">{country.packageCount} packages</p>
        )}
      </div>
    </a>
  );
};

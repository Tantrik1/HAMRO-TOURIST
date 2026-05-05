import React from 'react';
import { cn, truncate } from '../utils';
import type { BlockRegion } from '../types';

export interface RegionCardProps {
  region: BlockRegion;
  variant?: 'standard' | 'overlay' | 'minimal' | 'poster';
  hrefPrefix?: string;
  className?: string;
}

export const RegionCard: React.FC<RegionCardProps> = ({
  region,
  variant = 'standard',
  hrefPrefix = '/regions',
  className,
}) => {
  const href = `${hrefPrefix}/${region.slug}`;

  if (variant === 'overlay') {
    return (
      <a
        href={href}
        className={cn(
          'group relative block aspect-[4/5] rounded-3xl overflow-hidden',
          className,
        )}
      >
        {region.coverImageUrl ? (
          <img
            src={region.coverImageUrl}
            alt={region.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {region.countryName && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-mono">
              {region.countryName}
            </span>
          )}
          <h3 className="font-display font-bold text-3xl leading-tight mt-1">
            {region.name}
          </h3>
          {region.packageCount != null && (
            <div className="mt-3 flex items-center gap-2 text-xs text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              {region.packageCount} packages
            </div>
          )}
        </div>
      </a>
    );
  }

  if (variant === 'poster') {
    return (
      <a href={href} className={cn('group block', className)}>
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-[var(--bb-surface-2,#1A1A24)]">
          {region.coverImageUrl ? (
            <img
              src={region.coverImageUrl}
              alt={region.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white text-center">
            <h3 className="font-display font-bold text-xl leading-tight">{region.name}</h3>
            {region.packageCount != null && (
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/70">
                {region.packageCount} packages
              </div>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'minimal') {
    return (
      <a
        href={href}
        className={cn(
          'group flex items-center gap-4 p-4 bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl transition-all',
          'hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--bb-surface-2,#1A1A24)] shrink-0">
          {region.coverImageUrl ? (
            <img src={region.coverImageUrl} alt={region.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/30 to-[var(--bb-secondary,#06B6D4)]/30" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)] truncate group-hover:text-[var(--bb-primary,#7C3AED)] transition-colors">
            {region.name}
          </h3>
          {region.countryName && (
            <p className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{region.countryName}</p>
          )}
        </div>
        {region.packageCount != null && (
          <span className="text-xs font-mono text-[var(--bb-text-soft,#9B9BB8)]">
            {region.packageCount}
          </span>
        )}
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
      <div className="relative h-44 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
        {region.coverImageUrl ? (
          <img src={region.coverImageUrl} alt={region.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
        )}
      </div>
      <div className="p-4">
        {region.countryName && (
          <span className="text-[10px] uppercase tracking-widest text-[var(--bb-primary,#7C3AED)] font-mono">
            {region.countryName}
          </span>
        )}
        <h3 className="mt-1 font-display font-bold text-xl text-[var(--bb-text,#F1F0FF)]">
          {region.name}
        </h3>
        {region.description && (
          <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
            {truncate(region.description, 100)}
          </p>
        )}
        {region.packageCount != null && (
          <div className="mt-3 text-xs text-[var(--bb-text-soft,#9B9BB8)]">
            {region.packageCount} packages available
          </div>
        )}
      </div>
    </a>
  );
};

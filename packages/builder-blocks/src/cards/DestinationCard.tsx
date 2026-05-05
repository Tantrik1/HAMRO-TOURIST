import React from 'react';
import { cn } from '../utils';
import type { BlockDestination } from '../types';

export interface DestinationCardProps {
  destination: BlockDestination;
  variant?: 'standard' | 'tile' | 'overlay';
  hrefPrefix?: string;
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  variant = 'standard',
  hrefPrefix = '/destinations',
  className,
}) => {
  const href = `${hrefPrefix}/${destination.slug}`;

  if (variant === 'tile') {
    return (
      <a
        href={href}
        className={cn(
          'group relative block aspect-square rounded-2xl overflow-hidden bg-[var(--bb-surface-2,#1A1A24)]',
          className,
        )}
      >
        {destination.coverImageUrl ? (
          <img src={destination.coverImageUrl} alt={destination.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/30 to-[var(--bb-secondary,#06B6D4)]/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display font-bold text-white text-lg leading-tight">{destination.name}</h3>
          {destination.country && (
            <p className="text-xs text-white/70 mt-0.5">{destination.country}</p>
          )}
        </div>
      </a>
    );
  }

  if (variant === 'overlay') {
    return (
      <a
        href={href}
        className={cn('group relative block aspect-[4/3] rounded-3xl overflow-hidden', className)}
      >
        {destination.coverImageUrl ? (
          <img src={destination.coverImageUrl} alt={destination.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {destination.region && (
            <span className="text-[10px] uppercase tracking-widest text-white/80">{destination.region}</span>
          )}
          <h3 className="font-display font-bold text-3xl leading-tight mt-1">{destination.name}</h3>
          {destination.description && (
            <p className="mt-2 text-sm text-white/80 line-clamp-2">{destination.description}</p>
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
      <div className="relative h-44 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
        {destination.coverImageUrl ? (
          <img src={destination.coverImageUrl} alt={destination.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)]">{destination.name}</h3>
        {destination.country && (
          <p className="text-xs text-[var(--bb-text-soft,#9B9BB8)] mt-0.5">{destination.country}</p>
        )}
      </div>
    </a>
  );
};

import React from 'react';
import { BlockBadge } from '../primitives/Badge';
import { BlockRating } from '../primitives/Rating';
import { cn, formatDuration, formatPrice, truncate } from '../utils';
import type { BlockTour } from '../types';

export type TourCardVariant = 'standard' | 'compact' | 'editorial' | 'horizontal' | 'overlay';

export interface TourCardProps {
  tour: BlockTour;
  variant?: TourCardVariant;
  hrefPrefix?: string;
  showPrice?: boolean;
  showRating?: boolean;
  showBadges?: boolean;
  className?: string;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  variant = 'standard',
  hrefPrefix = '/tours',
  showPrice = true,
  showRating = true,
  showBadges = true,
  className,
}) => {
  const href = `${hrefPrefix}/${tour.slug}`;

  if (variant === 'horizontal') {
    return (
      <a
        href={href}
        className={cn(
          'group grid grid-cols-[140px_1fr] sm:grid-cols-[200px_1fr] gap-4 bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl overflow-hidden transition-all duration-300',
          'hover:border-[var(--bb-primary,#7C3AED)]/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]',
          className,
        )}
      >
        <div className="relative bg-[var(--bb-surface-2,#1A1A24)] h-full min-h-[140px]">
          {tour.coverImageUrl ? (
            <img
              src={tour.coverImageUrl}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        <div className="p-4 flex flex-col justify-between">
          <div>
            {showBadges && tour.difficulty && (
              <BlockBadge tone="difficulty" difficulty={tour.difficulty as any} dot>
                {tour.difficulty}
              </BlockBadge>
            )}
            <h3 className="mt-2 font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)] line-clamp-2 group-hover:text-[var(--bb-primary,#7C3AED)] transition-colors">
              {tour.title}
            </h3>
            {tour.description && (
              <p className="text-sm text-[var(--bb-text-soft,#9B9BB8)] mt-1 line-clamp-2">
                {truncate(tour.description, 120)}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between mt-3">
            <TourMeta tour={tour} />
            {showPrice && tour.minPrice != null && (
              <PriceTag amount={tour.minPrice} currency={tour.currency} />
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'overlay') {
    return (
      <a
        href={href}
        className={cn(
          'group relative block aspect-[4/5] rounded-3xl overflow-hidden',
          className,
        )}
      >
        {tour.coverImageUrl ? (
          <img
            src={tour.coverImageUrl}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <PlaceholderImage />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          {showBadges && tour.difficulty && (
            <BlockBadge tone="difficulty" difficulty={tour.difficulty as any} dot size="sm">
              {tour.difficulty}
            </BlockBadge>
          )}
          <h3 className="font-display font-bold text-2xl mt-3 leading-tight">{tour.title}</h3>
          <div className="mt-3 flex items-center justify-between">
            <TourMeta tour={tour} light />
            {showPrice && tour.minPrice != null && (
              <PriceTag amount={tour.minPrice} currency={tour.currency} light />
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={href}
        className={cn(
          'group block bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl overflow-hidden transition-all duration-300',
          'hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        <div className="relative h-40 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
          {tour.coverImageUrl ? (
            <img src={tour.coverImageUrl} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        <div className="p-3">
          <h3 className="font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)] line-clamp-2">
            {tour.title}
          </h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{formatDuration(tour.durationDays)}</span>
            {showPrice && tour.minPrice != null && (
              <span className="text-sm font-mono font-bold text-[var(--bb-primary,#7C3AED)]">
                {formatPrice(tour.minPrice, tour.currency)}
              </span>
            )}
          </div>
        </div>
      </a>
    );
  }

  if (variant === 'editorial') {
    return (
      <a
        href={href}
        className={cn('group block', className)}
      >
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 bg-[var(--bb-surface-2,#1A1A24)]">
          {tour.coverImageUrl ? (
            <img src={tour.coverImageUrl} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <PlaceholderImage />
          )}
          {showBadges && tour.badges?.includes('featured') && (
            <div className="absolute top-4 left-4">
              <BlockBadge tone="accent" dot>Featured</BlockBadge>
            </div>
          )}
        </div>
        {tour.regionName && (
          <span className="text-xs font-medium uppercase tracking-widest text-[var(--bb-primary,#7C3AED)]">
            {tour.regionName}
          </span>
        )}
        <h3 className="font-display font-bold text-2xl mt-1 text-[var(--bb-text,#F1F0FF)] leading-tight line-clamp-2 group-hover:text-[var(--bb-primary,#7C3AED)] transition-colors">
          {tour.title}
        </h3>
        {tour.description && (
          <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
            {truncate(tour.description, 140)}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <TourMeta tour={tour} />
          {showPrice && tour.minPrice != null && (
            <PriceTag amount={tour.minPrice} currency={tour.currency} />
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
        'group block bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl overflow-hidden transition-all duration-300',
        'hover:border-[var(--bb-primary,#7C3AED)]/40 hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]',
        className,
      )}
    >
      <div className="relative h-52 bg-[var(--bb-surface-2,#1A1A24)] overflow-hidden">
        {tour.coverImageUrl ? (
          <img src={tour.coverImageUrl} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <PlaceholderImage />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        {showBadges && tour.difficulty && (
          <div className="absolute top-3 left-3">
            <BlockBadge tone="difficulty" difficulty={tour.difficulty as any} dot size="sm">
              {tour.difficulty}
            </BlockBadge>
          </div>
        )}
        {showRating && tour.rating != null && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
            <BlockRating value={tour.rating} size="sm" showNumber />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-xl text-[var(--bb-text,#F1F0FF)] line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[var(--bb-primary,#7C3AED)] group-hover:to-[var(--bb-secondary,#06B6D4)] transition-all">
          {tour.title}
        </h3>
        {tour.description && (
          <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
            {truncate(tour.description, 120)}
          </p>
        )}
        <div className="mt-4 pt-4 border-t border-[var(--bb-border,#2A2A3A)] flex items-center justify-between">
          <TourMeta tour={tour} />
          {showPrice && tour.minPrice != null && (
            <PriceTag amount={tour.minPrice} currency={tour.currency} />
          )}
        </div>
      </div>
    </a>
  );
};

// Sub-components -----------------------------------------

const TourMeta: React.FC<{ tour: BlockTour; light?: boolean }> = ({ tour, light }) => (
  <div className={cn('flex items-center gap-3 text-xs', light ? 'text-white/80' : 'text-[var(--bb-text-soft,#9B9BB8)]')}>
    {tour.durationDays != null && (
      <span className="inline-flex items-center gap-1">
        <ClockIcon />
        {formatDuration(tour.durationDays)}
      </span>
    )}
    {tour.regionName && (
      <span className="inline-flex items-center gap-1">
        <PinIcon />
        {tour.regionName}
      </span>
    )}
  </div>
);

const PriceTag: React.FC<{ amount: number; currency?: string; light?: boolean }> = ({
  amount,
  currency,
  light,
}) => (
  <div className={cn('text-right', light && 'text-white')}>
    <div className={cn('text-[10px] uppercase tracking-widest', light ? 'text-white/70' : 'text-[var(--bb-text-soft,#9B9BB8)]')}>
      From
    </div>
    <div className={cn('font-mono font-bold text-lg', light ? 'text-white' : 'text-[var(--bb-primary,#7C3AED)]')}>
      {formatPrice(amount, currency)}
    </div>
  </div>
);

const PlaceholderImage: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/10 to-[var(--bb-secondary,#06B6D4)]/10">
    <svg className="w-10 h-10 text-[var(--bb-muted,#3D3D52)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  </div>
);

const ClockIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const PinIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

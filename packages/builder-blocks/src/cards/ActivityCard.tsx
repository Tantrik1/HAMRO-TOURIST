import React from 'react';
import { cn, formatPrice } from '../utils';
import type { BlockActivity } from '../types';

export interface ActivityCardProps {
  activity: BlockActivity;
  variant?: 'standard' | 'icon' | 'compact';
  hrefPrefix?: string;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  variant = 'standard',
  hrefPrefix = '/activities',
  className,
}) => {
  const href = `${hrefPrefix}/${activity.slug}`;

  if (variant === 'icon') {
    return (
      <a
        href={href}
        className={cn(
          'group flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] transition-all',
          'hover:border-[var(--bb-primary,#7C3AED)]/40 hover:-translate-y-1',
          className,
        )}
      >
        {activity.icon ? (
          <div
            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20 flex items-center justify-center text-[var(--bb-primary,#7C3AED)]"
            dangerouslySetInnerHTML={{ __html: activity.icon }}
          />
        ) : (
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20" />
        )}
        <h3 className="font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)]">
          {activity.title}
        </h3>
        {activity.basePrice != null && (
          <span className="text-sm font-mono font-bold text-[var(--bb-primary,#7C3AED)]">
            from {formatPrice(activity.basePrice, activity.currency)}
          </span>
        )}
      </a>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={href}
        className={cn(
          'group flex items-center gap-3 p-3 rounded-xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] transition-all',
          'hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        <div className="w-10 h-10 rounded-lg bg-[var(--bb-primary,#7C3AED)]/10 flex items-center justify-center shrink-0 text-[var(--bb-primary,#7C3AED)]">
          {activity.icon ? (
            <div dangerouslySetInnerHTML={{ __html: activity.icon }} />
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-sm text-[var(--bb-text,#F1F0FF)] truncate">
            {activity.title}
          </h3>
          {activity.basePrice != null && (
            <p className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">
              from {formatPrice(activity.basePrice, activity.currency)}
            </p>
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
        {activity.coverImageUrl ? (
          <img src={activity.coverImageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20">
            {activity.icon && (
              <div className="w-12 h-12 text-[var(--bb-primary,#7C3AED)]" dangerouslySetInnerHTML={{ __html: activity.icon }} />
            )}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)]">
          {activity.title}
        </h3>
        {activity.description && (
          <p className="mt-1 text-xs text-[var(--bb-text-soft,#9B9BB8)] line-clamp-2">
            {activity.description}
          </p>
        )}
        {activity.basePrice != null && (
          <div className="mt-3 flex items-center justify-between">
            {activity.durationHours && (
              <span className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{activity.durationHours}h</span>
            )}
            <span className="text-sm font-mono font-bold text-[var(--bb-primary,#7C3AED)]">
              {formatPrice(activity.basePrice, activity.currency)}
            </span>
          </div>
        )}
      </div>
    </a>
  );
};

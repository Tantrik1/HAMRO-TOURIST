import React from 'react';
import { BlockBadge } from '../primitives/Badge';
import { BlockButton } from '../primitives/Button';
import { cn, formatPrice } from '../utils';

export interface PricingTier {
  name: string;
  description?: string;
  price: number;
  currency?: string;
  period?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  highlight?: boolean;
  badge?: string;
}

export interface PricingCardProps {
  tier: PricingTier;
  variant?: 'standard' | 'featured' | 'minimal';
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  tier,
  variant = 'standard',
  className,
}) => {
  const isFeatured = tier.highlight || variant === 'featured';

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'p-6 rounded-2xl border',
          isFeatured
            ? 'border-[var(--bb-primary,#7C3AED)] bg-[var(--bb-primary,#7C3AED)]/5'
            : 'border-[var(--bb-border,#2A2A3A)] bg-[var(--bb-surface,#111118)]',
          className,
        )}
      >
        <h3 className="font-display font-bold text-xl text-[var(--bb-text,#F1F0FF)]">{tier.name}</h3>
        <div className="mt-3 flex items-baseline gap-1">
          <span className="font-mono font-bold text-3xl text-[var(--bb-text,#F1F0FF)]">
            {formatPrice(tier.price, tier.currency)}
          </span>
          {tier.period && (
            <span className="text-sm text-[var(--bb-text-soft,#9B9BB8)]">/{tier.period}</span>
          )}
        </div>
        <ul className="mt-4 space-y-2 text-sm text-[var(--bb-text-soft,#9B9BB8)]">
          {tier.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[var(--bb-lime,#84CC16)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // standard / featured
  return (
    <div
      className={cn(
        'relative p-8 rounded-3xl transition-all',
        isFeatured
          ? 'bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/15 to-[var(--bb-secondary,#06B6D4)]/15 border-2 border-[var(--bb-primary,#7C3AED)] shadow-[0_0_60px_rgba(124,58,237,0.2)]'
          : 'bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)]',
        className,
      )}
    >
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <BlockBadge tone="primary" dot>
            {tier.badge}
          </BlockBadge>
        </div>
      )}
      <h3 className="font-display font-bold text-2xl text-[var(--bb-text,#F1F0FF)]">{tier.name}</h3>
      {tier.description && (
        <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)]">{tier.description}</p>
      )}
      <div className="mt-6 flex items-baseline gap-1">
        <span className="font-mono font-bold text-5xl text-[var(--bb-text,#F1F0FF)]">
          {formatPrice(tier.price, tier.currency)}
        </span>
        {tier.period && (
          <span className="text-base text-[var(--bb-text-soft,#9B9BB8)]">/{tier.period}</span>
        )}
      </div>
      {tier.ctaHref && (
        <BlockButton
          href={tier.ctaHref}
          variant={isFeatured ? 'primary' : 'outline'}
          fullWidth
          className="mt-6"
        >
          {tier.ctaLabel || 'Get Started'}
        </BlockButton>
      )}
      <ul className="mt-6 space-y-3 text-sm text-[var(--bb-text,#F1F0FF)]">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg
              className={cn('w-5 h-5 mt-0.5 shrink-0', isFeatured ? 'text-[var(--bb-secondary,#06B6D4)]' : 'text-[var(--bb-lime,#84CC16)]')}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

import React from 'react';
import { cn } from '../utils';
import type { BlockFeature } from '../types';

export interface FeatureCardProps {
  feature: BlockFeature;
  variant?: 'standard' | 'centered' | 'minimal' | 'iconbg';
  accentColor?: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  feature,
  variant = 'standard',
  accentColor,
  className,
}) => {
  if (variant === 'centered') {
    return (
      <div className={cn('text-center', className)}>
        {feature.icon && (
          <div
            className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-[var(--bb-primary,#7C3AED)]"
            style={accentColor ? { color: accentColor } : undefined}
            dangerouslySetInnerHTML={{ __html: feature.icon }}
          />
        )}
        <h3 className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)]">
          {feature.title}
        </h3>
        {feature.description && (
          <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed">
            {feature.description}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-start gap-3', className)}>
        {feature.icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[var(--bb-primary,#7C3AED)]"
            dangerouslySetInnerHTML={{ __html: feature.icon }}
          />
        )}
        <div>
          <h3 className="font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)]">
            {feature.title}
          </h3>
          {feature.description && (
            <p className="mt-1 text-sm text-[var(--bb-text-soft,#9B9BB8)]">
              {feature.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'iconbg') {
    return (
      <div
        className={cn(
          'p-6 rounded-2xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] transition-all hover:border-[var(--bb-primary,#7C3AED)]/40',
          className,
        )}
      >
        {feature.icon && (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20 text-[var(--bb-primary,#7C3AED)]"
            dangerouslySetInnerHTML={{ __html: feature.icon }}
          />
        )}
        <h3 className="font-display font-bold text-lg text-[var(--bb-text,#F1F0FF)]">
          {feature.title}
        </h3>
        {feature.description && (
          <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed">
            {feature.description}
          </p>
        )}
      </div>
    );
  }

  // standard
  return (
    <div
      className={cn(
        'p-6 rounded-2xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] transition-all hover:border-[var(--bb-primary,#7C3AED)]/40',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {feature.icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[var(--bb-primary,#7C3AED)]/10 text-[var(--bb-primary,#7C3AED)]"
            dangerouslySetInnerHTML={{ __html: feature.icon }}
          />
        )}
        <div>
          <h3 className="font-display font-semibold text-base text-[var(--bb-text,#F1F0FF)]">
            {feature.title}
          </h3>
          {feature.description && (
            <p className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed">
              {feature.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

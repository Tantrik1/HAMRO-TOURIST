import React from 'react';
import { BlockAvatar } from '../primitives/Avatar';
import { BlockRating } from '../primitives/Rating';
import { cn } from '../utils';
import type { BlockTestimonial } from '../types';

export interface TestimonialCardProps {
  testimonial: BlockTestimonial;
  variant?: 'standard' | 'quote' | 'minimal' | 'featured';
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial: t,
  variant = 'standard',
  className,
}) => {
  if (variant === 'quote') {
    return (
      <figure
        className={cn(
          'relative bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-3xl p-8',
          className,
        )}
      >
        <svg
          className="absolute top-6 left-6 w-8 h-8 text-[var(--bb-primary,#7C3AED)]/40"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10 7L6 17h3l2-10h-1zM18 7l-4 10h3l2-10h-1z" />
        </svg>
        <blockquote className="pt-6 text-lg text-[var(--bb-text,#F1F0FF)] leading-relaxed font-display">
          "{t.content}"
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <BlockAvatar src={t.authorImage} name={t.authorName} size="md" />
          <div>
            <div className="font-semibold text-[var(--bb-text,#F1F0FF)]">{t.authorName}</div>
            {t.authorLocation && (
              <div className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{t.authorLocation}</div>
            )}
          </div>
          {t.rating != null && (
            <div className="ml-auto">
              <BlockRating value={t.rating} size="sm" />
            </div>
          )}
        </figcaption>
      </figure>
    );
  }

  if (variant === 'featured') {
    return (
      <figure
        className={cn(
          'relative bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/10 via-transparent to-[var(--bb-secondary,#06B6D4)]/10 border border-[var(--bb-primary,#7C3AED)]/30 rounded-3xl p-10 text-center',
          className,
        )}
      >
        <BlockAvatar src={t.authorImage} name={t.authorName} size="xl" ring className="mx-auto" />
        {t.rating != null && (
          <div className="mt-4 flex justify-center">
            <BlockRating value={t.rating} size="lg" showNumber />
          </div>
        )}
        <blockquote className="mt-4 text-xl text-[var(--bb-text,#F1F0FF)] leading-relaxed font-display italic">
          "{t.content}"
        </blockquote>
        <figcaption className="mt-6">
          <div className="font-semibold text-[var(--bb-text,#F1F0FF)]">{t.authorName}</div>
          {t.authorLocation && (
            <div className="text-sm text-[var(--bb-text-soft,#9B9BB8)]">{t.authorLocation}</div>
          )}
          {t.tourName && (
            <div className="mt-2 text-xs text-[var(--bb-primary,#7C3AED)] font-mono uppercase tracking-widest">
              {t.tourName}
            </div>
          )}
        </figcaption>
      </figure>
    );
  }

  if (variant === 'minimal') {
    return (
      <figure className={cn('py-4', className)}>
        <div className="flex items-center gap-3 mb-3">
          <BlockAvatar src={t.authorImage} name={t.authorName} size="sm" />
          <div>
            <div className="text-sm font-semibold text-[var(--bb-text,#F1F0FF)]">{t.authorName}</div>
            {t.rating != null && <BlockRating value={t.rating} size="sm" />}
          </div>
        </div>
        <blockquote className="text-sm text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed">
          {t.content}
        </blockquote>
      </figure>
    );
  }

  // standard
  return (
    <figure
      className={cn(
        'bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl p-6 transition-all hover:border-[var(--bb-primary,#7C3AED)]/40',
        className,
      )}
    >
      {t.rating != null && <BlockRating value={t.rating} size="sm" />}
      <blockquote className="mt-4 text-base text-[var(--bb-text,#F1F0FF)] leading-relaxed">
        "{t.content}"
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <BlockAvatar src={t.authorImage} name={t.authorName} size="sm" />
        <div>
          <div className="font-semibold text-[var(--bb-text,#F1F0FF)] text-sm">{t.authorName}</div>
          {t.authorLocation && (
            <div className="text-xs text-[var(--bb-text-soft,#9B9BB8)]">{t.authorLocation}</div>
          )}
        </div>
      </figcaption>
    </figure>
  );
};

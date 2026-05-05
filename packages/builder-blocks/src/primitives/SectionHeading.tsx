import React from 'react';
import { cn } from '../utils';

export interface BlockSectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center' | 'right';
  accent?: boolean;
  className?: string;
}

export const BlockSectionHeading: React.FC<BlockSectionHeadingProps> = ({
  eyebrow,
  heading,
  subheading,
  align = 'center',
  accent = true,
  className,
}) => {
  const alignClass =
    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left';
  const mxClass =
    align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '';
  return (
    <header className={cn(alignClass, 'mb-12', className)}>
      {eyebrow && (
        <span className="inline-block text-xs font-medium uppercase tracking-widest text-[var(--bb-primary,#7C3AED)] mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[var(--bb-text,#F1F0FF)] leading-tight">
        {heading}
      </h2>
      {accent && align === 'center' && (
        <div className="flex justify-center mt-4">
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]" />
        </div>
      )}
      {subheading && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg text-[var(--bb-text-soft,#9B9BB8)] leading-relaxed max-w-2xl',
            mxClass,
          )}
        >
          {subheading}
        </p>
      )}
    </header>
  );
};

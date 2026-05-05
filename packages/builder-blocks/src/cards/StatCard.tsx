import React from 'react';
import { cn } from '../utils';
import type { BlockStat } from '../types';

export interface StatCardProps {
  stat: BlockStat;
  variant?: 'standard' | 'bordered' | 'centered' | 'gradient';
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  stat,
  variant = 'standard',
  className,
}) => {
  if (variant === 'gradient') {
    return (
      <div
        className={cn(
          'relative p-6 rounded-2xl bg-gradient-to-br from-[var(--bb-primary,#7C3AED)]/20 to-[var(--bb-secondary,#06B6D4)]/20 border border-[var(--bb-primary,#7C3AED)]/30',
          className,
        )}
      >
        <div className="font-mono font-bold text-4xl sm:text-5xl bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] bg-clip-text text-transparent">
          {stat.value}
          {stat.suffix && <span className="text-2xl">{stat.suffix}</span>}
        </div>
        <div className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] uppercase tracking-wider">
          {stat.label}
        </div>
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <div className={cn('text-center p-6', className)}>
        <div className="font-mono font-bold text-5xl text-[var(--bb-primary,#7C3AED)]">
          {stat.value}
          {stat.suffix && <span className="text-3xl">{stat.suffix}</span>}
        </div>
        <div className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)] uppercase tracking-wider">
          {stat.label}
        </div>
      </div>
    );
  }

  if (variant === 'bordered') {
    return (
      <div
        className={cn(
          'p-6 rounded-2xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)]',
          className,
        )}
      >
        <div className="font-mono font-bold text-4xl text-[var(--bb-text,#F1F0FF)]">
          {stat.value}
          {stat.suffix && <span className="text-2xl text-[var(--bb-primary,#7C3AED)]">{stat.suffix}</span>}
        </div>
        <div className="mt-2 text-sm text-[var(--bb-text-soft,#9B9BB8)]">{stat.label}</div>
      </div>
    );
  }

  // standard
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="font-mono font-bold text-4xl text-[var(--bb-text,#F1F0FF)]">
        {stat.value}
        {stat.suffix && <span className="text-xl text-[var(--bb-primary,#7C3AED)]">{stat.suffix}</span>}
      </div>
      <div className="text-sm text-[var(--bb-text-soft,#9B9BB8)]">{stat.label}</div>
    </div>
  );
};

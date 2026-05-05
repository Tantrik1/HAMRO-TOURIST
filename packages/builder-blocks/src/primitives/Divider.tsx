import React from 'react';
import { cn } from '../utils';

export interface BlockDividerProps {
  variant?: 'solid' | 'gradient' | 'dashed';
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export const BlockDivider: React.FC<BlockDividerProps> = ({
  variant = 'solid',
  orientation = 'horizontal',
  label,
  className,
}) => {
  if (label && orientation === 'horizontal') {
    return (
      <div className={cn('flex items-center gap-4 my-6', className)}>
        <div className="flex-1 h-px bg-[var(--bb-border,#2A2A3A)]" />
        <span className="text-xs uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] font-mono">{label}</span>
        <div className="flex-1 h-px bg-[var(--bb-border,#2A2A3A)]" />
      </div>
    );
  }
  if (orientation === 'vertical') {
    return <div className={cn('w-px h-full bg-[var(--bb-border,#2A2A3A)]', className)} />;
  }
  if (variant === 'gradient') {
    return (
      <div
        className={cn('h-px w-full', className)}
        style={{
          background: 'linear-gradient(90deg, transparent, var(--bb-primary, #7C3AED) 50%, transparent)',
        }}
      />
    );
  }
  return (
    <hr
      className={cn(
        'w-full border-t',
        variant === 'dashed' ? 'border-dashed' : '',
        'border-[var(--bb-border,#2A2A3A)]',
        className,
      )}
    />
  );
};

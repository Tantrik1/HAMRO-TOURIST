import React from 'react';
import { cn, difficultyTheme } from '../utils';

export type BadgeTone =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'difficulty';

export interface BlockBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
  /** For tone='difficulty', pass the difficulty string. */
  difficulty?: 'easy' | 'moderate' | 'hard' | 'extreme';
  icon?: React.ReactNode;
  dot?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const toneClass: Record<BadgeTone, string> = {
  primary: 'bg-[var(--bb-primary,#7C3AED)]/12 text-[var(--bb-primary,#7C3AED)] border-[var(--bb-primary,#7C3AED)]/30',
  secondary: 'bg-[var(--bb-secondary,#06B6D4)]/12 text-[var(--bb-secondary,#06B6D4)] border-[var(--bb-secondary,#06B6D4)]/30',
  accent: 'bg-[var(--bb-accent,#F97316)]/12 text-[var(--bb-accent,#F97316)] border-[var(--bb-accent,#F97316)]/30',
  success: 'bg-[#84CC16]/12 text-[#84CC16] border-[#84CC16]/30',
  warning: 'bg-[#F59E0B]/12 text-[#F59E0B] border-[#F59E0B]/30',
  danger: 'bg-[#F43F5E]/12 text-[#F43F5E] border-[#F43F5E]/30',
  neutral: 'bg-[var(--bb-muted,#3D3D52)]/20 text-[var(--bb-text-soft,#9B9BB8)] border-[var(--bb-border,#2A2A3A)]',
  difficulty: '',
};

export const BlockBadge: React.FC<BlockBadgeProps> = ({
  children,
  tone = 'neutral',
  difficulty,
  icon,
  dot,
  size = 'sm',
  className,
}) => {
  const sizeClass = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  let style: React.CSSProperties | undefined;
  let cls = toneClass[tone];

  if (tone === 'difficulty' && difficulty) {
    const cfg = difficultyTheme[difficulty];
    style = {
      color: cfg.color,
      backgroundColor: cfg.bg,
      borderColor: cfg.border,
    };
    cls = 'border';
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium font-mono',
        sizeClass,
        cls,
        className,
      )}
      style={style}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {icon}
      {children}
    </span>
  );
};

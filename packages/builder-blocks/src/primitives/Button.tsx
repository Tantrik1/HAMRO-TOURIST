import React from 'react';
import { cn } from '../utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'link' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export interface BlockButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] text-white hover:shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:scale-[1.02]',
  secondary:
    'bg-[var(--bb-accent,#F97316)] text-white hover:bg-[var(--bb-accent,#F97316)]/90 hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]',
  ghost:
    'text-[var(--bb-text,#F1F0FF)] hover:bg-[var(--bb-surface,#1A1A24)]/60',
  outline:
    'border border-[var(--bb-border,#2A2A3A)] text-[var(--bb-text,#F1F0FF)] hover:border-[var(--bb-primary,#7C3AED)]',
  link:
    'text-[var(--bb-primary,#7C3AED)] hover:text-[var(--bb-secondary,#06B6D4)] underline-offset-4 hover:underline',
  danger:
    'bg-[#F43F5E] text-white hover:bg-[#F43F5E]/90',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs min-h-[32px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
  xl: 'px-8 py-4 text-base min-h-[52px]',
};

export const BlockButton: React.FC<BlockButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth,
  iconLeft,
  iconRight,
  loading,
  href,
  className,
  children,
  ...rest
}) => {
  const Tag: any = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200',
        variantClass[variant],
        sizeClass[size],
        fullWidth && 'w-full',
        loading && 'pointer-events-none opacity-70',
        className,
      )}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" />
        </svg>
      ) : (
        iconLeft
      )}
      <span>{children}</span>
      {iconRight}
    </Tag>
  );
};

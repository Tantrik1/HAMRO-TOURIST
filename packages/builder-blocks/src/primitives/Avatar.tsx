import React from 'react';
import { cn } from '../utils';

export interface BlockAvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  ring?: boolean;
  className?: string;
}

const sizeMap = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
};

function initials(name?: string): string {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
}

export const BlockAvatar: React.FC<BlockAvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  ring,
  className,
}) => {
  const base = cn(
    'inline-flex items-center justify-center shrink-0 font-semibold overflow-hidden',
    shape === 'circle' ? 'rounded-full' : 'rounded-lg',
    sizeMap[size],
    ring && 'ring-2 ring-[var(--bb-primary,#7C3AED)] ring-offset-2 ring-offset-[var(--bb-ink,#0A0A0F)]',
    className,
  );
  if (src) {
    return <img src={src} alt={alt || name || ''} className={cn(base, 'object-cover')} />;
  }
  return (
    <div
      className={cn(base, 'bg-gradient-to-br from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] text-white')}
    >
      {initials(name)}
    </div>
  );
};

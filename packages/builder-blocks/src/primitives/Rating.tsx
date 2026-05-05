import React from 'react';
import { cn } from '../utils';

export interface BlockRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewsCount?: number;
  className?: string;
}

const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

export const BlockRating: React.FC<BlockRatingProps> = ({
  value,
  max = 5,
  size = 'md',
  showNumber = false,
  reviewsCount,
  className,
}) => {
  const stars = [];
  for (let i = 0; i < max; i++) {
    const filled = i < Math.floor(value);
    const half = !filled && i < value;
    stars.push(
      <svg
        key={i}
        className={cn(sizeMap[size], filled || half ? 'text-[#F59E0B]' : 'text-[var(--bb-muted,#3D3D52)]')}
        viewBox="0 0 24 24"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={1.5}
      >
        {half && (
          <defs>
            <linearGradient id={`half-${i}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
        <path
          fill={half ? `url(#half-${i})` : undefined}
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"
        />
      </svg>,
    );
  }
  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex gap-0.5">{stars}</div>
      {showNumber && (
        <span className="text-sm font-medium text-[var(--bb-text,#F1F0FF)]">{value.toFixed(1)}</span>
      )}
      {reviewsCount != null && (
        <span className="text-xs text-[var(--bb-text-soft,#9B9BB8)] ml-1">({reviewsCount})</span>
      )}
    </div>
  );
};

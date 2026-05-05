import React from 'react';
import { cn } from '../utils';

export interface BlockGridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const colMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

const gapMap: Record<string, string> = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-10',
};

export const BlockGrid: React.FC<BlockGridProps> = ({
  cols = 3,
  gap = 'md',
  responsive = true,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'grid',
        responsive ? colMap[cols] : `grid-cols-${cols}`,
        gapMap[gap],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

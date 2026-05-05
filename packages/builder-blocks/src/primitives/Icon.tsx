import React from 'react';
import { cn } from '../utils';

/** Tiny icon wrapper. Accepts an inline SVG path OR a lucide component. */
export interface BlockIconProps extends React.SVGAttributes<SVGSVGElement> {
  path?: string;
  size?: number;
}

export const BlockIcon: React.FC<BlockIconProps> = ({
  path,
  size = 20,
  className,
  children,
  ...rest
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('inline-block shrink-0', className)}
      {...rest}
    >
      {path ? <path d={path} /> : children}
    </svg>
  );
};

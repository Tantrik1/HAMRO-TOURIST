import React from 'react';
import { cn, containerWidthClass } from '../utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: 'narrow' | 'default' | 'wide' | 'full';
  as?: keyof JSX.IntrinsicElements;
}

export const Container: React.FC<ContainerProps> = ({
  width = 'default',
  as = 'div',
  className,
  children,
  ...rest
}) => {
  const Tag = as as any;
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        containerWidthClass(width),
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

import React from 'react';
import { cn, paddingClass } from '../utils';

export interface BlockSectionProps extends React.HTMLAttributes<HTMLElement> {
  paddingTop?: string;
  paddingBottom?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  fullBleed?: boolean;
}

export const BlockSection: React.FC<BlockSectionProps> = ({
  paddingTop = 'md',
  paddingBottom = 'md',
  backgroundColor,
  backgroundImage,
  fullBleed = false,
  className,
  children,
  style,
  ...rest
}) => {
  const bgStyle: React.CSSProperties = { ...style };
  if (backgroundColor) bgStyle.backgroundColor = backgroundColor;
  if (backgroundImage) {
    bgStyle.backgroundImage = `url(${backgroundImage})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  return (
    <section
      className={cn(
        'relative',
        paddingClass(paddingTop, 'top'),
        paddingClass(paddingBottom, 'bottom'),
        className,
      )}
      style={bgStyle}
      {...rest}
    >
      {children}
    </section>
  );
};

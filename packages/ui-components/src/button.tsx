import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-body font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-grad-primary text-white hover:shadow-glow-violet hover:scale-[1.02] rounded-full',
        outline:
          'border border-ht-border text-ht-soft hover:border-ht-violet hover:text-ht-text rounded-full',
        ghost:
          'text-ht-soft hover:text-ht-text hover:bg-ht-surface2 rounded-full',
        destructive:
          'bg-ht-rose text-white hover:bg-ht-rose/80 rounded-full',
      },
      size: {
        default: 'px-6 py-2.5 text-sm',
        sm: 'px-4 py-2 text-xs',
        lg: 'px-8 py-3 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

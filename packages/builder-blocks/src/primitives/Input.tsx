import React from 'react';
import { cn } from '../utils';

export interface BlockInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const BlockInput: React.FC<BlockInputProps> = ({
  label,
  error,
  hint,
  iconLeft,
  iconRight,
  className,
  id,
  ...rest
}) => {
  const reactId = React.useId();
  const inputId = id || reactId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-[var(--bb-text,#F1F0FF)] mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--bb-text-soft,#9B9BB8)]">
            {iconLeft}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full min-h-[44px] rounded-xl bg-[var(--bb-ink,#0A0A0F)] border text-[var(--bb-text,#F1F0FF)] placeholder:text-[var(--bb-text-faint,#5C5C78)]',
            'px-4 py-2.5 focus:outline-none focus:ring-2 transition-all',
            iconLeft ? 'pl-10' : '',
            iconRight ? 'pr-10' : '',
            error
              ? 'border-[#F43F5E] focus:ring-[#F43F5E]/30'
              : 'border-[var(--bb-border,#2A2A3A)] focus:border-[var(--bb-primary,#7C3AED)] focus:ring-[var(--bb-primary,#7C3AED)]/20',
            className,
          )}
          {...rest}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--bb-text-soft,#9B9BB8)]">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-[#F43F5E]">{error}</p>}
      {!error && hint && <p className="mt-1.5 text-xs text-[var(--bb-text-soft,#9B9BB8)]">{hint}</p>}
    </div>
  );
};

export interface BlockTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const BlockTextarea: React.FC<BlockTextareaProps> = ({
  label,
  error,
  hint,
  className,
  id,
  rows = 4,
  ...rest
}) => {
  const reactId = React.useId();
  const textareaId = id || reactId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-[var(--bb-text,#F1F0FF)] mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full rounded-xl bg-[var(--bb-ink,#0A0A0F)] border text-[var(--bb-text,#F1F0FF)] placeholder:text-[var(--bb-text-faint,#5C5C78)]',
          'px-4 py-3 focus:outline-none focus:ring-2 transition-all resize-y',
          error
            ? 'border-[#F43F5E] focus:ring-[#F43F5E]/30'
            : 'border-[var(--bb-border,#2A2A3A)] focus:border-[var(--bb-primary,#7C3AED)] focus:ring-[var(--bb-primary,#7C3AED)]/20',
          className,
        )}
        {...rest}
      />
      {error && <p className="mt-1.5 text-xs text-[#F43F5E]">{error}</p>}
      {!error && hint && <p className="mt-1.5 text-xs text-[var(--bb-text-soft,#9B9BB8)]">{hint}</p>}
    </div>
  );
};

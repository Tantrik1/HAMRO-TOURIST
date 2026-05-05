'use client';

import React from 'react';
import { cn } from '../utils';

export interface CategoryFilterOption {
  label: string;
  value: string;
  count?: number;
  icon?: string;
}

export interface CategoryFilterProps {
  label?: string;
  options: CategoryFilterOption[];
  value?: string | string[];
  multiple?: boolean;
  variant?: 'pills' | 'list' | 'chips';
  onChange?: (value: string | string[]) => void;
  className?: string;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  label,
  options,
  value,
  multiple,
  variant = 'pills',
  onChange,
  className,
}) => {
  const isSelected = (v: string) => {
    if (multiple) return Array.isArray(value) && value.includes(v);
    return value === v;
  };

  const toggle = (v: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
      onChange?.(next);
    } else {
      onChange?.(value === v ? '' : v);
    }
  };

  if (variant === 'list') {
    return (
      <div className={cn('w-full', className)}>
        {label && (
          <h4 className="text-xs uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] font-mono mb-3">
            {label}
          </h4>
        )}
        <ul className="space-y-2">
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                onClick={() => toggle(opt.value)}
                className={cn(
                  'flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all',
                  isSelected(opt.value)
                    ? 'bg-[var(--bb-primary,#7C3AED)]/15 text-[var(--bb-primary,#7C3AED)] border border-[var(--bb-primary,#7C3AED)]/30'
                    : 'text-[var(--bb-text-soft,#9B9BB8)] border border-transparent hover:bg-[var(--bb-surface,#111118)] hover:text-[var(--bb-text,#F1F0FF)]',
                )}
              >
                <span className="flex items-center gap-2">
                  {opt.icon && <span dangerouslySetInnerHTML={{ __html: opt.icon }} />}
                  {opt.label}
                </span>
                {opt.count != null && (
                  <span className="text-xs font-mono opacity-60">{opt.count}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === 'chips') {
    return (
      <div className={cn('w-full', className)}>
        {label && (
          <h4 className="text-xs uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] font-mono mb-3">
            {label}
          </h4>
        )}
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                isSelected(opt.value)
                  ? 'bg-[var(--bb-primary,#7C3AED)] text-white border border-[var(--bb-primary,#7C3AED)]'
                  : 'text-[var(--bb-text-soft,#9B9BB8)] border border-[var(--bb-border,#2A2A3A)] hover:border-[var(--bb-primary,#7C3AED)]/50 hover:text-[var(--bb-text,#F1F0FF)]',
              )}
            >
              {opt.icon && <span dangerouslySetInnerHTML={{ __html: opt.icon }} />}
              {opt.label}
              {opt.count != null && <span className="opacity-60 ml-1">({opt.count})</span>}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // pills (default)
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <h4 className="text-xs uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] font-mono mb-3">
          {label}
        </h4>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all',
              isSelected(opt.value)
                ? 'bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] text-white'
                : 'bg-[var(--bb-surface,#111118)] text-[var(--bb-text-soft,#9B9BB8)] border border-[var(--bb-border,#2A2A3A)] hover:border-[var(--bb-primary,#7C3AED)]/40',
            )}
          >
            {opt.icon && <span dangerouslySetInnerHTML={{ __html: opt.icon }} />}
            {opt.label}
            {opt.count != null && <span className="opacity-60 text-xs">({opt.count})</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

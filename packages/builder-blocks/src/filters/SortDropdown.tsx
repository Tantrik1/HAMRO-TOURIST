'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../utils';

export interface SortOption {
  label: string;
  value: string;
}

export interface SortDropdownProps {
  label?: string;
  options: SortOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({
  label = 'Sort',
  options,
  value,
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-xl bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] text-sm text-[var(--bb-text,#F1F0FF)] hover:border-[var(--bb-primary,#7C3AED)]/50 transition-colors"
      >
        <span className="text-[var(--bb-text-soft,#9B9BB8)]">{label}:</span>
        <span className="font-medium">{current?.label || 'Select'}</span>
        <svg
          className={cn('w-4 h-4 text-[var(--bb-text-soft,#9B9BB8)] transition-transform', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-2 min-w-[200px] bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-xl shadow-2xl py-2 z-20">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className={cn(
                'block w-full text-left px-4 py-2 text-sm transition-colors',
                opt.value === value
                  ? 'text-[var(--bb-primary,#7C3AED)] bg-[var(--bb-primary,#7C3AED)]/10'
                  : 'text-[var(--bb-text-soft,#9B9BB8)] hover:bg-[var(--bb-surface-2,#1A1A24)] hover:text-[var(--bb-text,#F1F0FF)]',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

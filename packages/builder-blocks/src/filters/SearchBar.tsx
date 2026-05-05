'use client';

import React, { useState } from 'react';
import { cn } from '../utils';

export interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pill' | 'rounded' | 'square';
  onSearch?: (value: string) => void;
  action?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search destinations, tours, treks...',
  defaultValue = '',
  size = 'md',
  variant = 'pill',
  onSearch,
  action,
  className,
}) => {
  const [value, setValue] = useState(defaultValue);

  const sizeClass =
    size === 'sm' ? 'h-10 text-sm' : size === 'lg' ? 'h-14 text-base' : 'h-12 text-sm';

  const radiusClass = variant === 'pill' ? 'rounded-full' : variant === 'rounded' ? 'rounded-2xl' : 'rounded-lg';

  const handleSubmit = (e: React.FormEvent) => {
    if (onSearch) {
      e.preventDefault();
      onSearch(value);
    }
  };

  return (
    <form
      action={action}
      method="get"
      onSubmit={handleSubmit}
      className={cn(
        'relative flex items-center bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] focus-within:border-[var(--bb-primary,#7C3AED)] transition-colors',
        sizeClass,
        radiusClass,
        className,
      )}
    >
      <svg
        className="w-5 h-5 ml-4 text-[var(--bb-text-soft,#9B9BB8)] shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="search"
        name="q"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-[var(--bb-text,#F1F0FF)] placeholder:text-[var(--bb-text-faint,#5C5C78)] px-3 focus:outline-none"
      />
      <button
        type="submit"
        className={cn(
          'mr-1.5 px-5 bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)] text-white font-semibold transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]',
          radiusClass,
          size === 'sm' ? 'h-8 text-xs' : size === 'lg' ? 'h-12' : 'h-10',
        )}
      >
        Search
      </button>
    </form>
  );
};

'use client';

import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { CategoryFilter, type CategoryFilterOption } from './CategoryFilter';
import { DifficultyFilter, type DifficultyValue } from './DifficultyFilter';
import { PriceRange } from './PriceRange';
import { SortDropdown, type SortOption } from './SortDropdown';
import { cn } from '../utils';

export interface FilterBarProps {
  showSearch?: boolean;
  searchPlaceholder?: string;
  showCategories?: boolean;
  categories?: CategoryFilterOption[];
  showDifficulty?: boolean;
  showPriceRange?: boolean;
  priceMin?: number;
  priceMax?: number;
  showSort?: boolean;
  sortOptions?: SortOption[];
  onChange?: (filters: FilterBarValue) => void;
  variant?: 'horizontal' | 'sidebar';
  className?: string;
}

export interface FilterBarValue {
  search: string;
  categories: string[];
  difficulty: DifficultyValue[];
  priceRange: [number, number];
  sort: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  showSearch = true,
  searchPlaceholder = 'Search…',
  showCategories,
  categories = [],
  showDifficulty,
  showPriceRange,
  priceMin = 0,
  priceMax = 5000,
  showSort,
  sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Price: Low to high', value: 'price-asc' },
    { label: 'Price: High to low', value: 'price-desc' },
    { label: 'Duration: Short to long', value: 'duration-asc' },
  ],
  onChange,
  variant = 'horizontal',
  className,
}) => {
  const [filters, setFilters] = useState<FilterBarValue>({
    search: '',
    categories: [],
    difficulty: [],
    priceRange: [priceMin, priceMax],
    sort: sortOptions[0]?.value || 'recommended',
  });

  const update = <K extends keyof FilterBarValue>(key: K, value: FilterBarValue[K]) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onChange?.(next);
  };

  if (variant === 'sidebar') {
    return (
      <aside className={cn('w-full p-6 bg-[var(--bb-surface,#111118)] border border-[var(--bb-border,#2A2A3A)] rounded-2xl space-y-6', className)}>
        {showSearch && (
          <SearchBar
            placeholder={searchPlaceholder}
            defaultValue={filters.search}
            onSearch={(v) => update('search', v)}
            size="sm"
          />
        )}
        {showCategories && categories.length > 0 && (
          <CategoryFilter
            label="Category"
            options={categories}
            value={filters.categories}
            multiple
            variant="list"
            onChange={(v) => update('categories', Array.isArray(v) ? v : [v])}
          />
        )}
        {showDifficulty && (
          <DifficultyFilter
            value={filters.difficulty}
            onChange={(v) => update('difficulty', v)}
          />
        )}
        {showPriceRange && (
          <PriceRange
            min={priceMin}
            max={priceMax}
            defaultValue={filters.priceRange}
            onChange={(v) => update('priceRange', v)}
          />
        )}
      </aside>
    );
  }

  // horizontal
  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {showSearch && (
          <SearchBar
            placeholder={searchPlaceholder}
            defaultValue={filters.search}
            onSearch={(v) => update('search', v)}
            size="md"
            className="flex-1"
          />
        )}
        {showSort && (
          <SortDropdown
            label="Sort"
            options={sortOptions}
            value={filters.sort}
            onChange={(v) => update('sort', v)}
          />
        )}
      </div>
      {(showCategories || showDifficulty || showPriceRange) && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {showCategories && categories.length > 0 && (
            <CategoryFilter
              options={categories}
              value={filters.categories}
              multiple
              variant="chips"
              onChange={(v) => update('categories', Array.isArray(v) ? v : [v])}
            />
          )}
          {showDifficulty && (
            <DifficultyFilter
              value={filters.difficulty}
              onChange={(v) => update('difficulty', v)}
            />
          )}
          {showPriceRange && (
            <PriceRange
              min={priceMin}
              max={priceMax}
              defaultValue={filters.priceRange}
              onChange={(v) => update('priceRange', v)}
            />
          )}
        </div>
      )}
    </div>
  );
};

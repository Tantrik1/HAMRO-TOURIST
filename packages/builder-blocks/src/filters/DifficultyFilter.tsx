'use client';

import React from 'react';
import { cn, difficultyTheme } from '../utils';

export type DifficultyValue = 'easy' | 'moderate' | 'hard' | 'extreme';

export interface DifficultyFilterProps {
  label?: string;
  value?: DifficultyValue[];
  onChange?: (value: DifficultyValue[]) => void;
  className?: string;
}

const ORDER: DifficultyValue[] = ['easy', 'moderate', 'hard', 'extreme'];

export const DifficultyFilter: React.FC<DifficultyFilterProps> = ({
  label = 'Difficulty',
  value = [],
  onChange,
  className,
}) => {
  const toggle = (v: DifficultyValue) => {
    const next = value.includes(v) ? value.filter((x) => x !== v) : [...value, v];
    onChange?.(next);
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <h4 className="text-xs uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] font-mono mb-3">
          {label}
        </h4>
      )}
      <div className="flex flex-wrap gap-2">
        {ORDER.map((d) => {
          const cfg = difficultyTheme[d];
          const selected = value.includes(d);
          return (
            <button
              key={d}
              onClick={() => toggle(d)}
              className={cn(
                'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize',
              )}
              style={{
                color: selected ? '#0A0A0F' : cfg.color,
                backgroundColor: selected ? cfg.color : cfg.bg,
                borderColor: cfg.border,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: selected ? '#0A0A0F' : cfg.color }}
              />
              {cfg.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

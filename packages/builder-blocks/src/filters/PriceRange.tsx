'use client';

import React, { useState } from 'react';
import { cn, formatPrice } from '../utils';

export interface PriceRangeProps {
  min: number;
  max: number;
  step?: number;
  defaultValue?: [number, number];
  currency?: string;
  onChange?: (range: [number, number]) => void;
  className?: string;
}

export const PriceRange: React.FC<PriceRangeProps> = ({
  min,
  max,
  step = 100,
  defaultValue,
  currency = 'USD',
  onChange,
  className,
}) => {
  const [low, setLow] = useState(defaultValue?.[0] ?? min);
  const [high, setHigh] = useState(defaultValue?.[1] ?? max);

  const handleLowChange = (v: number) => {
    const next = Math.min(v, high - step);
    setLow(next);
    onChange?.([next, high]);
  };

  const handleHighChange = (v: number) => {
    const next = Math.max(v, low + step);
    setHigh(next);
    onChange?.([low, next]);
  };

  const lowPercent = ((low - min) / (max - min)) * 100;
  const highPercent = ((high - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-widest text-[var(--bb-text-soft,#9B9BB8)] font-mono">
          Price
        </span>
        <span className="text-sm font-mono font-bold text-[var(--bb-text,#F1F0FF)]">
          {formatPrice(low, currency)} – {formatPrice(high, currency)}
        </span>
      </div>
      <div className="relative h-2 mb-4">
        <div className="absolute inset-x-0 inset-y-1 rounded-full bg-[var(--bb-surface-2,#1A1A24)]" />
        <div
          className="absolute inset-y-1 rounded-full bg-gradient-to-r from-[var(--bb-primary,#7C3AED)] to-[var(--bb-secondary,#06B6D4)]"
          style={{ left: `${lowPercent}%`, right: `${100 - highPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={low}
          onChange={(e) => handleLowChange(Number(e.target.value))}
          className="price-range-thumb absolute inset-0 w-full pointer-events-none appearance-none bg-transparent"
          style={{ zIndex: 2 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={high}
          onChange={(e) => handleHighChange(Number(e.target.value))}
          className="price-range-thumb absolute inset-0 w-full pointer-events-none appearance-none bg-transparent"
          style={{ zIndex: 3 }}
        />
      </div>
      <style>{`
        .price-range-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: var(--bb-text, #F1F0FF);
          border: 2px solid var(--bb-primary, #7C3AED);
          pointer-events: auto;
          cursor: grab;
        }
        .price-range-thumb::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: var(--bb-text, #F1F0FF);
          border: 2px solid var(--bb-primary, #7C3AED);
          pointer-events: auto;
          cursor: grab;
        }
      `}</style>
    </div>
  );
};

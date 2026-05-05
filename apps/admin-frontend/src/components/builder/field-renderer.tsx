'use client';

import React from 'react';
import type { FieldSchema } from '@hamrotourist/shared-types';
import { cn } from '@/lib/utils';

interface FieldRendererProps {
  schema: FieldSchema & { key: string };
  value: any;
  onChange: (value: any) => void;
  showIf?: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ schema, value, onChange, showIf = true }) => {
  if (!showIf) return null;

  const label = schema.label || schema.key;
  const commonInput =
    'w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text text-sm focus:border-ht-violet focus:outline-none transition-colors';

  switch (schema.type) {
    case 'text':
    case 'url':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <input
            type={schema.type === 'url' ? 'url' : 'text'}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={schema.placeholder ?? ''}
            maxLength={schema.maxLength}
            className={commonInput}
          />
        </div>
      );

    case 'textarea':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <textarea
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={schema.placeholder ?? ''}
            maxLength={schema.maxLength}
            rows={schema.rows ?? 3}
            className={cn(commonInput, 'resize-y min-h-[80px]')}
          />
        </div>
      );

    case 'richtext':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <textarea
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={schema.placeholder ?? ''}
            rows={schema.rows ?? 6}
            className={cn(commonInput, 'resize-y min-h-[120px] font-mono text-xs')}
          />
        </div>
      );

    case 'number':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <input
            type="number"
            value={value ?? schema.defaultValue ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
            min={schema.min}
            max={schema.max}
            className={commonInput}
          />
        </div>
      );

    case 'select':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <select
            value={value ?? schema.defaultValue ?? ''}
            onChange={(e) => onChange(e.target.value)}
            className={cn(commonInput, 'appearance-none cursor-pointer')}
          >
            {(schema.options ?? []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case 'toggle':
      return (
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-ht-text">{label}</span>
          <button
            onClick={() => onChange(!value)}
            className={cn(
              'w-11 h-6 rounded-full transition-colors relative',
              value ? 'bg-ht-violet' : 'bg-ht-border',
            )}
          >
            <span
              className={cn(
                'absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform',
                value && 'translate-x-5',
              )}
            />
          </button>
        </div>
      );

    case 'media':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://... or /uploads/..."
              className={cn(commonInput, 'flex-1')}
            />
          </div>
          {value && (
            <div className="mt-2 aspect-video rounded-lg overflow-hidden border border-ht-border bg-ht-ink">
              <img src={value} alt="" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      );

    case 'color':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={value ?? '#7C3AED'}
              onChange={(e) => onChange(e.target.value)}
              className="w-10 h-10 rounded-lg border border-ht-border bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={value ?? ''}
              onChange={(e) => onChange(e.target.value)}
              className={cn(commonInput, 'flex-1')}
            />
          </div>
        </div>
      );

    case 'custom-html':
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">{label}</label>
          <textarea
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            rows={schema.rows ?? 6}
            className={cn(commonInput, 'resize-y min-h-[120px] font-mono text-xs')}
          />
        </div>
      );

    default:
      return (
        <div className="text-xs text-ht-rose">
          Unknown field type: {(schema as any).type}
        </div>
      );
  }
};

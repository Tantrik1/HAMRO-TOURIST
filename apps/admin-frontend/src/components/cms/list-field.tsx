'use client';

interface ListFieldProps {
  label: string;
  description?: string;
  value: string; // multiline textarea value
  onChange: (next: string) => void;
  placeholder?: string;
  rows?: number;
}

export default function ListField({ label, description, value, onChange, placeholder, rows = 4 }: ListFieldProps) {
  return (
    <div>
      <label className="block font-body text-sm text-ht-soft mb-1.5">{label}</label>
      {description && <p className="text-xs text-ht-muted font-body mb-2">{description}</p>}
      <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none" />
      <p className="mt-1 text-[10px] font-mono text-ht-muted">One item per line</p>
    </div>
  );
}

export function linesToArray(s: string): string[] {
  return s.split('\n').map((l) => l.trim()).filter(Boolean);
}

export function arrayToLines(arr?: string[] | null): string {
  return Array.isArray(arr) ? arr.join('\n') : '';
}

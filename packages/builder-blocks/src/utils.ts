// ============================================
// Shared utilities for builder blocks
// ============================================

/** Merge class names, filtering falsy values. Tiny clsx. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Format a price into a currency string. */
export function formatPrice(amount: number, currency = 'USD'): string {
  if (amount == null || isNaN(amount)) return '';
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

/** Format duration in days / nights. */
export function formatDuration(days: number | null | undefined, style: 'days' | 'nights' = 'days'): string {
  if (!days) return '';
  if (style === 'nights') {
    return `${days - 1}N / ${days}D`;
  }
  return `${days} ${days === 1 ? 'day' : 'days'}`;
}

/** Truncate text with ellipsis. */
export function truncate(text: string | null | undefined, max: number): string {
  if (!text) return '';
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

/** Difficulty visual config — travel-specific. */
export const difficultyTheme: Record<string, { label: string; color: string; bg: string; border: string }> = {
  easy: {
    label: 'Easy',
    color: '#84CC16',
    bg: 'rgba(132, 204, 22, 0.12)',
    border: 'rgba(132, 204, 22, 0.35)',
  },
  moderate: {
    label: 'Moderate',
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.12)',
    border: 'rgba(6, 182, 212, 0.35)',
  },
  hard: {
    label: 'Challenging',
    color: '#F97316',
    bg: 'rgba(249, 115, 22, 0.12)',
    border: 'rgba(249, 115, 22, 0.35)',
  },
  extreme: {
    label: 'Extreme',
    color: '#F43F5E',
    bg: 'rgba(244, 63, 94, 0.12)',
    border: 'rgba(244, 63, 94, 0.35)',
  },
};

/** Safe string fallback. */
export function safeStr(value: unknown, fallback = ''): string {
  if (typeof value === 'string' && value.length > 0) return value;
  return fallback;
}

/** Safe number fallback. */
export function safeNum(value: unknown, fallback = 0): number {
  if (typeof value === 'number' && !isNaN(value)) return value;
  return fallback;
}

/** Safe boolean fallback. */
export function safeBool(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  return fallback;
}

/** Section settings → Tailwind padding classes. */
export function paddingClass(size: string | undefined, side: 'top' | 'bottom'): string {
  const map: Record<string, { top: string; bottom: string }> = {
    none: { top: 'pt-0', bottom: 'pb-0' },
    sm: { top: 'pt-8', bottom: 'pb-8' },
    md: { top: 'pt-16', bottom: 'pb-16' },
    lg: { top: 'pt-24', bottom: 'pb-24' },
    xl: { top: 'pt-32', bottom: 'pb-32' },
  };
  return map[size || 'md']?.[side] || map.md[side];
}

/** Section settings → container width class. */
export function containerWidthClass(size: string | undefined): string {
  const map: Record<string, string> = {
    narrow: 'max-w-screen-md',
    default: 'max-w-screen-xl',
    wide: 'max-w-screen-2xl',
    full: 'max-w-none',
  };
  return map[size || 'default'] || map.default;
}

/** Slugify a string to use in URLs. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

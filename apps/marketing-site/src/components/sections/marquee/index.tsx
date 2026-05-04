'use client';

import { Sparkles } from 'lucide-react';

export default function Marquee() {
  const items = [
    '47 agencies launched this month',
    'Everest Trekkers saw 3× more leads',
    'Free for the first 1,000 agencies',
    '8 discount spots remaining',
    'Built for Nepal · Loved worldwide',
  ];
  return (
    <div className="border-y border-border bg-card overflow-hidden py-4">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

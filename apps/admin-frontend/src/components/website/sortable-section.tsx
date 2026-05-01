'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Section {
  id: string;
  type: string;
  title: string;
  enabled: boolean;
  config: Record<string, unknown>;
  sortOrder: number;
}

const sectionIcons: Record<string, string> = {
  'hero-banner': 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z',
  'featured-tours': 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  'region-showcase': 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z',
  'activity-cards': 'M13 10V3L4 14h7v7l9-11h-7z',
  'package-showcase': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  'testimonials': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  'about-us': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  'why-choose-us': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'contact-form': 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  'newsletter-signup': 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2',
};

interface Props {
  section: Section;
  onToggle: (id: string) => void;
}

export function SortableSection({ section, onToggle }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-ht-surface border rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
        isDragging ? 'border-ht-violet shadow-glow-violet' : 'border-ht-border hover:border-ht-violet/30'
      }`}
    >
      {/* Drag handle */}
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-ht-muted hover:text-ht-soft p-1 min-h-[44px] flex items-center">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Icon */}
      <div className="w-8 h-8 rounded-lg bg-ht-surface2 flex items-center justify-center shrink-0">
        <svg className="w-4 h-4 text-ht-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={sectionIcons[section.type] || sectionIcons['about-us']} />
        </svg>
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-ht-text truncate">{section.title}</p>
        <p className="font-mono text-[10px] text-ht-soft">{section.type}</p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => onToggle(section.id)}
        className={`relative w-10 h-6 rounded-full transition-colors duration-200 shrink-0 ${
          section.enabled ? 'bg-ht-violet' : 'bg-ht-muted'
        }`}
      >
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
          section.enabled ? 'left-5' : 'left-1'
        }`} />
      </button>
    </div>
  );
}

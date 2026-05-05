'use client';

import React from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { addBuilderSection } from '@/lib/builder-api';
import { useAuthStore } from '@/store/auth-store';
import { Plus, Search } from 'lucide-react';

export const SectionPalette: React.FC = () => {
  const selectedPageId = useBuilderStore((s) => s.selectedPageId);
  const pages = useBuilderStore((s) => s.pages);
  const availableSchemas = useBuilderStore((s) => s.availableSchemas);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';
  const [query, setQuery] = React.useState('');

  const schemas = availableSchemas.filter((s) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return s.label.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
  });

  const grouped = schemas.reduce<Record<string, typeof schemas>>((acc, s) => {
    const cat = s.category || 'other';
    (acc[cat] = acc[cat] || []).push(s);
    return acc;
  }, {});

  const categoryOrder = ['hero', 'product', 'trust', 'conversion', 'content', 'media', 'advanced'];
  const categoryNames: Record<string, string> = {
    hero: 'Hero',
    product: 'Products',
    trust: 'Trust',
    conversion: 'Conversion',
    content: 'Content',
    media: 'Media',
    advanced: 'Advanced',
    other: 'Other',
  };

  const handleAdd = async (schema: typeof schemas[0]) => {
    if (!selectedPageId || !tenantSlug) return;
    const page = pages.find((p) => p.id === selectedPageId);
    if (!page) return;

    const maxOrder = page.sections.length > 0
      ? Math.max(...page.sections.map((s) => s.sortOrder))
      : -1;

    const res = await addBuilderSection(tenantSlug, selectedPageId, {
      sectionType: schema.id,
      label: schema.label,
      config: schema.defaults ?? {},
      enabled: true,
      variant: (schema.defaults as any)?.variant ?? 'standard',
      sortOrder: maxOrder + 1,
    });

    if (res.success) {
      const store = useBuilderStore.getState();
      const pIdx = store.pages.findIndex((p) => p.id === selectedPageId);
      const newPages = [...store.pages];
      newPages[pIdx] = {
        ...newPages[pIdx],
        sections: [...newPages[pIdx].sections, res.data as any],
      };
      useBuilderStore.setState({ pages: newPages });
    }
  };

  return (
    <div className="w-[280px] border-r border-ht-border bg-ht-surface flex flex-col overflow-hidden">
      <div className="h-12 border-b border-ht-border flex items-center px-3 shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-ht-soft">Add Section</span>
      </div>
      <div className="p-2 border-b border-ht-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ht-text-faint" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections…"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-ht-ink border border-ht-border text-ht-text text-sm focus:border-ht-violet focus:outline-none"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {categoryOrder.filter((c) => grouped[c]?.length > 0).map((cat) => (
          <div key={cat} className="mb-3">
            <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-ht-text-faint font-semibold">
              {categoryNames[cat]}
            </div>
            <div className="space-y-0.5 px-2">
              {grouped[cat].map((schema) => (
                <button
                  key={schema.id}
                  onClick={() => handleAdd(schema)}
                  disabled={!selectedPageId}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-md hover:bg-ht-ink text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed group"
                >
                  <div className="w-6 h-6 rounded bg-ht-violet/10 flex items-center justify-center shrink-0 group-hover:bg-ht-violet/20 transition-colors">
                    <Plus className="w-3.5 h-3.5 text-ht-violet" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-ht-text truncate">{schema.label}</div>
                    <div className="text-[10px] text-ht-text-faint truncate">{schema.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

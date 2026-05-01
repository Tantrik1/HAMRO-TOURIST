'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiGet, apiPatch, apiPost } from '@/lib/api';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableSection } from '@/components/website/sortable-section';

interface Section {
  id: string;
  type: string;
  title: string;
  enabled: boolean;
  config: Record<string, unknown>;
  sortOrder: number;
}

interface WebsiteConfig {
  id: string;
  themeId: string;
  seoTitle: string | null;
  seoDescription: string | null;
  primaryColor: string;
  sections: Section[];
  published: boolean;
}

const themes = [
  { id: 'adventure-bold', name: 'Adventure Bold', desc: 'Dark, dramatic, glow effects', color: '#7C3AED' },
  { id: 'serene-journey', name: 'Serene Journey', desc: 'Light, minimal, photography-first', color: '#0D9488' },
  { id: 'heritage-classic', name: 'Heritage Classic', desc: 'Warm tones, traditional feel', color: '#B8860B' },
];

export default function WebsiteBuilderPage() {
  const [config, setConfig] = useState<WebsiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [message, setMessage] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    async function load() {
      const res = await apiGet<WebsiteConfig>('/websites/config');
      if (res.success) setConfig(res.data);
      setLoading(false);
    }
    load();
  }, []);

  const save = useCallback(async (updates: Partial<WebsiteConfig>) => {
    setSaving(true);
    const res = await apiPatch<WebsiteConfig>('/websites/config', updates);
    if (res.success) {
      setConfig(res.data);
      setMessage('Saved!');
    } else {
      setMessage('Failed to save');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 2000);
  }, []);

  async function handleThemeChange(themeId: string) {
    await apiPatch(`/websites/${config?.id || 'default'}/theme`, { themeId });
    // Reload config
    const res = await apiGet<WebsiteConfig>('/websites/config');
    if (res.success) setConfig(res.data);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !config) return;
    const sections = [...config.sections];
    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const reordered = arrayMove(sections, oldIndex, newIndex).map((s, i) => ({ ...s, sortOrder: i }));
    setConfig({ ...config, sections: reordered });
    save({ sections: reordered });
  }

  function toggleSection(sectionId: string) {
    if (!config) return;
    const sections = config.sections.map((s) =>
      s.id === sectionId ? { ...s, enabled: !s.enabled } : s,
    );
    setConfig({ ...config, sections });
    save({ sections });
  }

  async function handlePublish() {
    setPublishing(true);
    const res = await apiPost<{ url: string }>(`/websites/${config?.id || 'default'}/publish`, {});
    if (res.success) {
      setConfig((prev) => prev ? { ...prev, published: true } : prev);
      setMessage(`Published! Visit: ${res.data.url}`);
    } else {
      setMessage('Publish failed');
    }
    setPublishing(false);
    setTimeout(() => setMessage(''), 5000);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-ht-surface2 rounded animate-pulse" />
        <div className="h-64 bg-ht-surface2 rounded-xl2 animate-pulse" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ht-text">Website Builder</h1>
          <p className="font-body text-ht-soft mt-1">Customize your theme, arrange sections, and publish.</p>
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span className="font-body text-sm text-[#84CC16] animate-fade-in">{message}</span>
          )}
          <button onClick={handlePublish} disabled={publishing}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[44px] disabled:opacity-50">
            {publishing ? 'Publishing...' : 'Publish Website'}
          </button>
        </div>
      </div>

      {/* Theme Selector */}
      <div className="mb-8">
        <h2 className="font-display font-bold text-xl text-ht-text mb-4">Theme</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`text-left bg-ht-surface border rounded-xl2 p-5 transition-all duration-300 ${
                config?.themeId === theme.id
                  ? 'border-ht-violet shadow-glow-violet'
                  : 'border-ht-border hover:border-ht-violet/40'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.color }} />
                <h3 className="font-display font-bold text-base text-ht-text">{theme.name}</h3>
              </div>
              <p className="font-body text-sm text-ht-soft">{theme.desc}</p>
              {config?.themeId === theme.id && (
                <span className="inline-flex items-center gap-1 mt-3 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-ht-violet/15 text-ht-violet border border-ht-violet/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-current" /> Active
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SEO Settings */}
      <div className="mb-8">
        <h2 className="font-display font-bold text-xl text-ht-text mb-4">SEO</h2>
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-4">
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Site Title</label>
            <input
              type="text"
              value={config?.seoTitle || ''}
              onChange={(e) => setConfig((prev) => prev ? { ...prev, seoTitle: e.target.value } : prev)}
              onBlur={() => config && save({ seoTitle: config.seoTitle })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="My Travel Agency"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Meta Description</label>
            <textarea
              rows={2}
              value={config?.seoDescription || ''}
              onChange={(e) => setConfig((prev) => prev ? { ...prev, seoDescription: e.target.value } : prev)}
              onBlur={() => config && save({ seoDescription: config.seoDescription })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none"
              placeholder="Discover amazing tours and treks..."
            />
          </div>
        </div>
      </div>

      {/* Section Manager */}
      <div>
        <h2 className="font-display font-bold text-xl text-ht-text mb-4">Sections</h2>
        <p className="font-body text-sm text-ht-soft mb-4">Drag to reorder. Toggle to show/hide sections.</p>

        {config?.sections && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={config.sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {config.sections
                  .sort((a, b) => a.sortOrder - b.sortOrder)
                  .map((section) => (
                    <SortableSection key={section.id} section={section} onToggle={toggleSection} />
                  ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}

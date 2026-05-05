'use client';

import React, { useCallback } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { FieldRenderer } from './field-renderer';
import { ALL_SECTION_SCHEMAS, SECTION_SCHEMAS_BY_ID } from '@hamrotourist/builder-blocks';
import { type FieldSchema } from '@hamrotourist/shared-types';
import { updateBuilderSection } from '@/lib/builder-api';
import { useAuthStore } from '@/store/auth-store';
import { Loader2, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';

function shouldShowField(field: FieldSchema, config: Record<string, any>): boolean {
  if (!field.showIf) return true;
  const triggerValue = config[field.showIf.field];
  if (Array.isArray(field.showIf.equals)) {
    return field.showIf.equals.includes(triggerValue);
  }
  return triggerValue === field.showIf.equals;
}

export const SettingsPanel: React.FC = () => {
  const selectedSection = useBuilderStore((s) => s.selectedSection);
  const selectedPage = useBuilderStore((s) => s.selectedPage);
  const isSaving = useBuilderStore((s) => s.isSaving);
  const setError = useBuilderStore((s) => s.setError);
  const setLastSaved = useBuilderStore((s) => s.setLastSaved);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';

  const handleFieldChange = useCallback(
    async (key: string, value: any) => {
      if (!selectedSection || !tenantSlug) return;
      const updatedConfig = { ...selectedSection.config, [key]: value };
      useBuilderStore.setState({ isSaving: true });
      const res = await updateBuilderSection(tenantSlug, selectedSection.id, {
        config: updatedConfig,
      });
      useBuilderStore.setState({ isSaving: false });
      if (res.success) {
        setLastSaved(new Date().toISOString());
        // Update local state
        const store = useBuilderStore.getState();
        const page = store.selectedPage;
        if (!page) return;
        const sectionIdx = page.sections.findIndex((s) => s.id === selectedSection.id);
        if (sectionIdx === -1) return;
        const newSections = [...page.sections];
        newSections[sectionIdx] = { ...newSections[sectionIdx], config: updatedConfig };
        const pageIdx = store.pages.findIndex((p) => p.id === page.id);
        const newPages = [...store.pages];
        newPages[pageIdx] = { ...newPages[pageIdx], sections: newSections };
        useBuilderStore.setState({ pages: newPages });
      } else {
        setError(res.error?.message ?? 'Failed to save');
      }
    },
    [selectedSection, tenantSlug],
  );

  if (!selectedSection) {
    return (
      <div className="w-[340px] border-l border-ht-border bg-ht-surface flex flex-col">
        <div className="h-12 border-b border-ht-border flex items-center px-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-ht-soft">Settings</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <p className="text-sm text-ht-soft">Select a section to edit its settings.</p>
        </div>
      </div>
    );
  }

  const schema = SECTION_SCHEMAS_BY_ID[selectedSection.sectionType] || ALL_SECTION_SCHEMAS.find((s) => s.id === selectedSection.sectionType);

  return (
    <div className="w-[340px] border-l border-ht-border bg-ht-surface flex flex-col overflow-hidden">
      <div className="h-12 border-b border-ht-border flex items-center justify-between px-4 shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-ht-soft">Settings</span>
        <button
          onClick={() => useBuilderStore.getState().selectSection(null)}
          className="text-ht-text-faint hover:text-ht-text transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <h3 className="font-display font-semibold text-sm text-ht-text">{selectedSection.label}</h3>
          <p className="text-xs text-ht-text-faint mt-0.5">{schema?.description ?? 'Section settings'}</p>
        </div>

        {/* Section meta */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-ht-soft uppercase tracking-wider">Label</label>
            <input
              type="text"
              value={selectedSection.label}
              onChange={(e) => {
                // TODO: debounced save for label
              }}
              className="w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text text-sm focus:border-ht-violet focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-ht-text">Enabled</span>
            <button
              onClick={async () => {
                if (!tenantSlug) return;
                useBuilderStore.setState({ isSaving: true });
                const res = await updateBuilderSection(tenantSlug, selectedSection.id, {
                  enabled: !selectedSection.enabled,
                });
                useBuilderStore.setState({ isSaving: false });
                if (res.success) {
                  const store = useBuilderStore.getState();
                  const page = store.selectedPage;
                  if (!page) return;
                  const sIdx = page.sections.findIndex((s) => s.id === selectedSection.id);
                  const newSections = [...page.sections];
                  newSections[sIdx] = { ...newSections[sIdx], enabled: !selectedSection.enabled };
                  const pIdx = store.pages.findIndex((p) => p.id === page.id);
                  const newPages = [...store.pages];
                  newPages[pIdx] = { ...newPages[pIdx], sections: newSections };
                  useBuilderStore.setState({ pages: newPages });
                }
              }}
              className={cn(
                'w-11 h-6 rounded-full transition-colors relative',
                selectedSection.enabled ? 'bg-ht-violet' : 'bg-ht-border',
              )}
            >
              <span
                className={cn(
                  'absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform',
                  selectedSection.enabled && 'translate-x-5',
                )}
              />
            </button>
          </div>
        </div>

        <div className="h-px bg-ht-border" />

        {/* Schema fields */}
        {schema?.fields && (Object.entries(schema.fields) as [string, FieldSchema][]).map(([key, field]) => {
          if (!shouldShowField(field, selectedSection.config)) return null;
          return (
            <div key={key}>
              <FieldRenderer
                schema={{ ...field, key }}
                value={selectedSection.config[key] ?? field.defaultValue ?? ''}
                onChange={(v) => handleFieldChange(key, v)}
              />
            </div>
          );
        })}
      </div>
      <div className="h-10 border-t border-ht-border flex items-center px-4 gap-2 shrink-0">
        {isSaving ? (
          <Loader2 className="w-3.5 h-3.5 text-ht-cyan animate-spin" />
        ) : (
          <Save className="w-3.5 h-3.5 text-ht-lime" />
        )}
        <span className="text-[10px] text-ht-text-faint uppercase tracking-wider">
          {isSaving ? 'Saving…' : 'Saved'}
        </span>
      </div>
    </div>
  );
};

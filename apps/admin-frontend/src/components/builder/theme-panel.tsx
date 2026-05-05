'use client';

import React, { useState, useCallback } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { useAuthStore } from '@/store/auth-store';
import { updateBuilderSettings } from '@/lib/builder-api';
import { Check, Palette, Loader2 } from 'lucide-react';

export const ThemePanel: React.FC = () => {
  const themes = useBuilderStore((s) => s.themes);
  const settings = useBuilderStore((s) => s.settings);
  const isSaving = useBuilderStore((s) => s.isSaving);
  const setSettings = useBuilderStore((s) => s.setSettings);
  const setSaving = useBuilderStore((s) => s.setSaving);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';
  const [applying, setApplying] = useState<string | null>(null);

  const activeKey = settings?.activeThemeKey ?? '';

  const handleApply = useCallback(
    async (key: string) => {
      if (!tenantSlug || key === activeKey) return;
      setApplying(key);
      setSaving(true);
      const res = await updateBuilderSettings(tenantSlug, { activeThemeKey: key });
      setSaving(false);
      setApplying(null);
      if (res.success && res.data) {
        setSettings(res.data);
      }
    },
    [tenantSlug, activeKey, setSettings, setSaving],
  );

  return (
    <div className="w-[280px] border-r border-ht-border bg-ht-surface flex flex-col overflow-hidden">
      <div className="h-12 border-b border-ht-border flex items-center px-3 shrink-0">
        <Palette className="w-4 h-4 text-ht-violet mr-2" />
        <span className="text-xs font-semibold uppercase tracking-wider text-ht-soft">Themes</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {themes.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-ht-text-faint">No themes available.</p>
          </div>
        )}
        {themes.map((theme) => {
          const isActive = theme.key === activeKey;
          const isApplying = applying === theme.key;
          return (
            <div
              key={theme.key}
              className={`relative rounded-xl border overflow-hidden transition-all ${
                isActive
                  ? 'border-ht-violet shadow-glow-violet'
                  : 'border-ht-border hover:border-ht-violet/40'
              }`}
            >
              <div
                className="h-20 w-full"
                style={{
                  background: theme.colorDefaults?.['--bb-primary']
                    ? `linear-gradient(135deg, ${theme.colorDefaults['--bb-primary']}, ${theme.colorDefaults['--bb-secondary'] ?? '#06B6D4'})`
                    : 'linear-gradient(135deg, #7C3AED, #06B6D4)',
                }}
              />
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-ht-text">{theme.name}</h3>
                  {isActive && <Check className="w-4 h-4 text-ht-lime" />}
                </div>
                {theme.description && (
                  <p className="text-xs text-ht-text-faint mt-1 line-clamp-2">{theme.description}</p>
                )}
                <button
                  onClick={() => handleApply(theme.key)}
                  disabled={isActive || isApplying || isSaving}
                  className={`mt-3 w-full py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                    isActive
                      ? 'bg-ht-lime/10 text-ht-lime border border-ht-lime/30'
                      : 'bg-ht-violet/10 text-ht-violet hover:bg-ht-violet/20'
                  }`}
                >
                  {isApplying ? (
                    <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                  ) : isActive ? (
                    'Active'
                  ) : (
                    'Apply'
                  )}
                </button>
              </div>
              {theme.isPremium && (
                <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider bg-ht-accent text-white px-1.5 py-0.5 rounded">
                  Pro
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

'use client';

import React, { useState, useCallback } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { useAuthStore } from '@/store/auth-store';
import { updateBuilderSettings } from '@/lib/builder-api';
import { Settings, Loader2, Save, Plus, X } from 'lucide-react';

export const SiteSettingsPanel: React.FC = () => {
  const settings = useBuilderStore((s) => s.settings);
  const isSaving = useBuilderStore((s) => s.isSaving);
  const setSettings = useBuilderStore((s) => s.setSettings);
  const setSaving = useBuilderStore((s) => s.setSaving);
  const setLastSaved = useBuilderStore((s) => s.setLastSaved);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';

  const [form, setForm] = useState<Record<string, any>>({});
  const [hasChanges, setHasChanges] = useState(false);

  React.useEffect(() => {
    if (settings) {
      setForm({
        logoUrl: settings.logoUrl ?? '',
        faviconUrl: settings.faviconUrl ?? '',
        ogImageUrl: settings.ogImageUrl ?? '',
        googleAnalyticsId: settings.googleAnalyticsId ?? '',
        seoTitle: settings.seoDefaults?.title ?? '',
        seoDescription: settings.seoDefaults?.description ?? '',
        navbarVariant: settings.navbarVariant ?? 'classic',
        footerVariant: settings.footerVariant ?? 'mega',
      });
      setHasChanges(false);
    }
  }, [settings?.id]);

  const handleChange = useCallback((key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  }, []);

  const handleSave = useCallback(async () => {
    if (!tenantSlug || !hasChanges) return;
    setSaving(true);
    const res = await updateBuilderSettings(tenantSlug, {
      logoUrl: form.logoUrl || null,
      faviconUrl: form.faviconUrl || null,
      ogImageUrl: form.ogImageUrl || null,
      googleAnalyticsId: form.googleAnalyticsId || null,
      seoDefaults: {
        title: form.seoTitle || '',
        description: form.seoDescription || '',
      },
      navbarVariant: form.navbarVariant,
      footerVariant: form.footerVariant,
    });
    setSaving(false);
    if (res.success && res.data) {
      setSettings(res.data);
      setHasChanges(false);
      setLastSaved(new Date().toISOString());
    }
  }, [tenantSlug, form, hasChanges, setSettings, setSaving, setLastSaved]);

  const inputClass =
    'w-full px-3 py-2 rounded-lg bg-ht-ink border border-ht-border text-ht-text text-sm placeholder:text-ht-text-faint focus:border-ht-violet focus:outline-none transition-colors';

  return (
    <div className="w-[280px] border-r border-ht-border bg-ht-surface flex flex-col overflow-hidden">
      <div className="h-12 border-b border-ht-border flex items-center px-3 shrink-0">
        <Settings className="w-4 h-4 text-ht-violet mr-2" />
        <span className="text-xs font-semibold uppercase tracking-wider text-ht-soft">Settings</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {!settings && (
          <div className="text-center py-8">
            <p className="text-sm text-ht-text-faint">Loading settings…</p>
          </div>
        )}

        {settings && (
          <>
            {/* Branding */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-ht-text-faint font-semibold mb-2">
                Branding
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-ht-soft mb-1 block">Logo URL</label>
                  <input
                    type="text"
                    value={form.logoUrl ?? ''}
                    onChange={(e) => handleChange('logoUrl', e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-ht-soft mb-1 block">Favicon URL</label>
                  <input
                    type="text"
                    value={form.faviconUrl ?? ''}
                    onChange={(e) => handleChange('faviconUrl', e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-ht-soft mb-1 block">OG Image URL</label>
                  <input
                    type="text"
                    value={form.ogImageUrl ?? ''}
                    onChange={(e) => handleChange('ogImageUrl', e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-ht-border" />

            {/* SEO */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-ht-text-faint font-semibold mb-2">
                SEO Defaults
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-ht-soft mb-1 block">Default Title</label>
                  <input
                    type="text"
                    value={form.seoTitle ?? ''}
                    onChange={(e) => handleChange('seoTitle', e.target.value)}
                    placeholder="My Travel Agency"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="text-xs text-ht-soft mb-1 block">Default Description</label>
                  <textarea
                    value={form.seoDescription ?? ''}
                    onChange={(e) => handleChange('seoDescription', e.target.value)}
                    placeholder="Discover amazing tours and treks..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-ht-border" />

            {/* Layout */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-ht-text-faint font-semibold mb-2">
                Layout Defaults
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-ht-soft mb-1 block">Navbar Variant</label>
                  <select
                    value={form.navbarVariant ?? 'classic'}
                    onChange={(e) => handleChange('navbarVariant', e.target.value)}
                    className={inputClass}
                  >
                    <option value="classic">Classic</option>
                    <option value="mega">Mega Menu</option>
                    <option value="transparent">Transparent</option>
                    <option value="minimal">Minimal</option>
                    <option value="centered">Centered</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-ht-soft mb-1 block">Footer Variant</label>
                  <select
                    value={form.footerVariant ?? 'mega'}
                    onChange={(e) => handleChange('footerVariant', e.target.value)}
                    className={inputClass}
                  >
                    <option value="mega">Mega</option>
                    <option value="minimal">Minimal</option>
                    <option value="centered">Centered</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="social">Social</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="h-px bg-ht-border" />

            {/* Analytics */}
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-ht-text-faint font-semibold mb-2">
                Analytics
              </h3>
              <div>
                <label className="text-xs text-ht-soft mb-1 block">Google Analytics ID</label>
                <input
                  type="text"
                  value={form.googleAnalyticsId ?? ''}
                  onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className={inputClass}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer actions */}
      <div className="h-12 border-t border-ht-border flex items-center px-3 gap-2 shrink-0">
        <button
          onClick={handleSave}
          disabled={!hasChanges || isSaving}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            hasChanges
              ? 'bg-ht-violet text-white hover:bg-ht-violet/90'
              : 'bg-ht-muted text-ht-text-faint cursor-not-allowed'
          }`}
        >
          {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
          Save
        </button>
      </div>
    </div>
  );
};

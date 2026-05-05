'use client';

import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStore } from '@/store/builder-store';
import { useAuthStore } from '@/store/auth-store';
import { TopBar } from '@/components/builder/top-bar';
import { PageTree } from '@/components/builder/page-tree';
import { SectionPalette } from '@/components/builder/section-palette';
import { PreviewCanvas } from '@/components/builder/preview-canvas';
import { SettingsPanel } from '@/components/builder/settings-panel';
import { ThemePanel } from '@/components/builder/theme-panel';
import { SiteSettingsPanel } from '@/components/builder/site-settings-panel';
import {
  getBuilderSettings,
  listBuilderPages,
  listBuilderThemes,
  seedBuilderThemes,
} from '@/lib/builder-api';
import { Loader2 } from 'lucide-react';

export default function BuilderPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';

  const isLoading = useBuilderStore((s) => s.isLoading);
  const error = useBuilderStore((s) => s.error);
  const selectedPageId = useBuilderStore((s) => s.selectedPageId);
  const activePanel = useBuilderStore((s) => s.activePanel);

  const setPages = useBuilderStore((s) => s.setPages);
  const setThemes = useBuilderStore((s) => s.setThemes);
  const setSettings = useBuilderStore((s) => s.setSettings);
  const setLoading = useBuilderStore((s) => s.setLoading);
  const setError = useBuilderStore((s) => s.setError);
  const selectPage = useBuilderStore((s) => s.selectPage);

  const loadData = useCallback(async () => {
    if (!tenantSlug) return;
    setLoading(true);
    setError(null);

    // Seed themes if needed
    await seedBuilderThemes(tenantSlug);

    const [settingsRes, pagesRes, themesRes] = await Promise.all([
      getBuilderSettings(tenantSlug),
      listBuilderPages(tenantSlug),
      listBuilderThemes(tenantSlug),
    ]);

    if (settingsRes.success) {
      setSettings(settingsRes.data);
    }
    if (pagesRes.success) {
      const pages = pagesRes.data;
      setPages(pages);
      if (pages.length > 0 && !selectedPageId) {
        selectPage(pages[0].id);
      }
    }
    if (themesRes.success) {
      setThemes(themesRes.data);
    }

    if (!settingsRes.success || !pagesRes.success) {
      setError('Failed to load builder data. Please try again.');
    }

    setLoading(false);
  }, [tenantSlug]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-ht-ink">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-ht-violet animate-spin mx-auto mb-3" />
          <p className="text-sm text-ht-soft">Loading builder…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-ht-ink overflow-hidden">
      <TopBar onBack={() => router.push('/dashboard/website')} />

      {error && (
        <div className="px-4 py-2 bg-ht-rose/10 border-b border-ht-rose/30 text-ht-rose text-xs">
          {error}
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {activePanel === 'pages' && <PageTree />}
        {activePanel === 'sections' && <SectionPalette />}
        {activePanel === 'theme' && <ThemePanel />}
        {activePanel === 'settings' && <SiteSettingsPanel />}

        {activePanel !== 'none' && activePanel !== 'pages' && activePanel !== 'sections' && activePanel !== 'theme' && activePanel !== 'settings' && (
          <div className="w-[280px] border-r border-ht-border bg-ht-surface flex flex-col">
            <div className="h-12 border-b border-ht-border flex items-center px-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-ht-soft">{activePanel}</span>
            </div>
            <div className="flex-1 flex items-center justify-center p-6 text-center">
              <p className="text-sm text-ht-soft">{activePanel} panel coming soon.</p>
            </div>
          </div>
        )}

        <PreviewCanvas />

        <SettingsPanel />
      </div>

      {/* Bottom tab bar */}
      <div className="h-10 border-t border-ht-border bg-ht-surface flex items-center px-3 gap-1 shrink-0">
        {[
          { id: 'pages' as const, label: 'Pages' },
          { id: 'sections' as const, label: 'Sections' },
          { id: 'theme' as const, label: 'Theme' },
          { id: 'settings' as const, label: 'Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              const store = useBuilderStore.getState();
              store.setActivePanel(store.activePanel === tab.id ? 'none' : tab.id);
            }}
            className={
              'px-3 py-1 rounded-md text-xs font-medium transition-colors ' +
              (activePanel === tab.id
                ? 'bg-ht-violet/15 text-ht-violet'
                : 'text-ht-soft hover:text-ht-text hover:bg-ht-ink')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

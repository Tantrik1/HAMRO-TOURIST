'use client';

import React, { useMemo, useState, useCallback } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { useAuthStore } from '@/store/auth-store';
import { RefreshCw } from 'lucide-react';

const RENDERER_BASE = process.env.NEXT_PUBLIC_RENDERER_URL || 'http://localhost:3002';

export const PreviewCanvas: React.FC = () => {
  const selectedPage = useBuilderStore((s) => s.selectedPage);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';
  const [reloadCounter, setReloadCounter] = useState(0);

  const iframeSrc = useMemo(() => {
    if (!tenantSlug || !selectedPage) return '';
    const pageParam = selectedPage.isHome ? '' : `&page=${selectedPage.slug}`;
    return `${RENDERER_BASE}/site/${tenantSlug}/preview?__t=${Date.now()}${pageParam}`;
  }, [tenantSlug, selectedPage, reloadCounter]);

  const handleReload = useCallback(() => {
    setReloadCounter((c) => c + 1);
  }, []);

  return (
    <div className="flex-1 bg-ht-ink flex flex-col overflow-hidden">
      <div className="h-8 border-b border-ht-border bg-ht-surface flex items-center justify-between px-3 shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-ht-text-faint font-semibold">
          Preview
        </span>
        <button
          onClick={handleReload}
          className="p-1 rounded hover:bg-ht-ink text-ht-text-faint hover:text-ht-text transition-colors"
          title="Reload preview"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="w-full max-w-[1024px] bg-ht-surface rounded-xl border border-ht-border shadow-2xl overflow-hidden mx-auto">
          {iframeSrc ? (
            <iframe
              key={reloadCounter}
              title="preview"
              src={iframeSrc}
              className="w-full min-h-[600px] border-0"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="w-full min-h-[600px] flex items-center justify-center text-sm text-ht-text-faint">
              Select a page to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

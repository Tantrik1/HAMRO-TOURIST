'use client';

import React, { useState } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { useAuthStore } from '@/store/auth-store';
import { publishBuilder, createBuilderSnapshot } from '@/lib/builder-api';
import { cn } from '@/lib/utils';
import {
  Eye, ArrowLeft, Monitor, Smartphone, Tablet, Globe, Loader2,
  Save, Undo2, ChevronDown, ExternalLink, CheckCircle2,
} from 'lucide-react';

type Viewport = 'desktop' | 'tablet' | 'mobile';

export const TopBar: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const settings = useBuilderStore((s) => s.settings);
  const lastSavedAt = useBuilderStore((s) => s.lastSavedAt);
  const isSaving = useBuilderStore((s) => s.isSaving);
  const pages = useBuilderStore((s) => s.pages);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handlePublish = async () => {
    if (!tenantSlug) return;
    setPublishing(true);
    const fullName = user ? `${user.firstName} ${user.lastName}`.trim() : undefined;
    const res = await publishBuilder(tenantSlug, user?.id, fullName);
    setPublishing(false);
    if (res.success) {
      setPublished(true);
      setTimeout(() => setPublished(false), 4000);
    }
  };

  const handleSaveSnapshot = async () => {
    if (!tenantSlug) return;
    const res = await createBuilderSnapshot(tenantSlug, {
      name: `Manual save — ${new Date().toLocaleString()}`,
      snapshotType: 'manual',
      pages: pages.map((p) => ({
        id: p.id,
        slug: p.slug,
        label: p.label,
        status: p.status,
        sections: p.sections,
      })),
    });
    if (res.success) {
      useBuilderStore.setState({ lastSavedAt: new Date().toISOString() });
    }
  };

  const liveUrl = tenantSlug ? `https://${tenantSlug}.hamrotourist.com` : '';

  return (
    <div className="h-12 border-b border-ht-border bg-ht-surface flex items-center justify-between px-3 shrink-0 z-50">
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="p-1.5 rounded-md hover:bg-ht-ink text-ht-soft transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
        <div className="flex items-center gap-1 bg-ht-ink rounded-lg p-0.5 border border-ht-border">
          {[
            { id: 'desktop' as Viewport, icon: Monitor },
            { id: 'tablet' as Viewport, icon: Tablet },
            { id: 'mobile' as Viewport, icon: Smartphone },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => {
                setViewport(v.id);
                useBuilderStore.setState({ activePanel: 'none' });
              }}
              className={cn(
                'p-1.5 rounded-md transition-colors',
                viewport === v.id ? 'bg-ht-violet text-white' : 'text-ht-text-faint hover:text-ht-text',
              )}
            >
              <v.icon className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>
        <span className="text-xs text-ht-text-faint hidden md:inline">
          {isSaving ? 'Saving…' : lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : 'All changes saved'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {settings?.published && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-ht-text border border-ht-border hover:border-ht-violet transition-colors"
          >
            <Globe className="w-3 h-3" />
            Live
          </a>
        )}

        <button
          onClick={handleSaveSnapshot}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-ht-soft hover:text-ht-text border border-ht-border hover:border-ht-violet/50 transition-colors"
        >
          <Save className="w-3 h-3" />
          Save
        </button>

        <div className="relative">
          <button
            onClick={() => setShowMenu((v) => !v)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-grad-primary text-white hover:shadow-glow-violet transition-all"
          >
            {published ? <CheckCircle2 className="w-3.5 h-3.5" /> : publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Eye className="w-3.5 h-3.5" />}
            {published ? 'Published!' : 'Publish'}
            <ChevronDown className="w-3 h-3" />
          </button>
          {showMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-ht-surface border border-ht-border rounded-xl shadow-2xl py-1 z-50">
              <button
                onClick={() => { setShowMenu(false); handlePublish(); }}
                className="w-full text-left px-3 py-2 text-sm text-ht-text hover:bg-ht-ink transition-colors"
              >
                Publish now
              </button>
              <button
                onClick={() => { setShowMenu(false); handleSaveSnapshot(); }}
                className="w-full text-left px-3 py-2 text-sm text-ht-text hover:bg-ht-ink transition-colors"
              >
                Save snapshot
              </button>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-ht-cyan hover:bg-ht-ink transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View live site
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

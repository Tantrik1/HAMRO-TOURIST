'use client';

import React, { useState } from 'react';
import { useBuilderStore } from '@/store/builder-store';
import { useAuthStore } from '@/store/auth-store';
import { cn } from '@/lib/utils';
import { createBuilderPage, deleteBuilderPage, deleteBuilderSection, duplicateBuilderSection, reorderBuilderSections, updateBuilderPage, updateBuilderSection } from '@/lib/builder-api';
import {
  Plus, Trash2, Copy, GripVertical, Eye, EyeOff, ChevronDown, ChevronRight,
  Home, Layout, ArrowUpDown, Check, Pencil,
} from 'lucide-react';

export const PageTree: React.FC = () => {
  const pages = useBuilderStore((s) => s.pages);
  const selectedPageId = useBuilderStore((s) => s.selectedPageId);
  const selectedSectionId = useBuilderStore((s) => s.selectedSectionId);
  const selectPage = useBuilderStore((s) => s.selectPage);
  const selectSection = useBuilderStore((s) => s.selectSection);
  const user = useAuthStore((s) => s.user);
  const tenantSlug = user?.tenantSlug ?? '';
  const [expandedPages, setExpandedPages] = useState<Set<string>>(new Set());
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOverPage, setDragOverPage] = useState<string | null>(null);
  const [dragOverSection, setDragOverSection] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPageLabel, setNewPageLabel] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [creating, setCreating] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, any>>({});
  const [savingPage, setSavingPage] = useState(false);

  const toggleExpand = (pageId: string) => {
    setExpandedPages((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) next.delete(pageId);
      else next.add(pageId);
      return next;
    });
  };

  const handleDeleteSection = async (pageId: string, sectionId: string) => {
    if (!confirm('Delete this section?')) return;
    const res = await deleteBuilderSection(tenantSlug, sectionId);
    if (res.success) {
      const store = useBuilderStore.getState();
      const pIdx = store.pages.findIndex((p) => p.id === pageId);
      const newPages = [...store.pages];
      newPages[pIdx] = {
        ...newPages[pIdx],
        sections: newPages[pIdx].sections.filter((s) => s.id !== sectionId),
      };
      useBuilderStore.setState({ pages: newPages });
      if (selectedSectionId === sectionId) selectSection(null);
    }
  };

  const handleDuplicateSection = async (pageId: string, sectionId: string) => {
    const res = await duplicateBuilderSection(tenantSlug, sectionId);
    if (res.success) {
      const store = useBuilderStore.getState();
      const pIdx = store.pages.findIndex((p) => p.id === pageId);
      const newPages = [...store.pages];
      newPages[pIdx] = {
        ...newPages[pIdx],
        sections: [...newPages[pIdx].sections, res.data],
      };
      useBuilderStore.setState({ pages: newPages });
    }
  };

  const handleToggleSection = async (pageId: string, sectionId: string, enabled: boolean) => {
    const res = await updateBuilderSection(tenantSlug, sectionId, { enabled: !enabled });
    if (res.success) {
      const store = useBuilderStore.getState();
      const pIdx = store.pages.findIndex((p) => p.id === pageId);
      const newPages = [...store.pages];
      const sIdx = newPages[pIdx].sections.findIndex((s) => s.id === sectionId);
      newPages[pIdx].sections[sIdx] = { ...newPages[pIdx].sections[sIdx], enabled: !enabled };
      useBuilderStore.setState({ pages: newPages });
    }
  };

  const handleCreatePage = async () => {
    if (!tenantSlug || !newPageLabel.trim() || !newPageSlug.trim()) return;
    setCreating(true);
    const res = await createBuilderPage(tenantSlug, {
      label: newPageLabel.trim(),
      slug: newPageSlug.trim(),
      isHome: pages.length === 0,
      showInNav: true,
      showInFooter: true,
      status: 'draft',
      sortOrder: pages.length,
    });
    setCreating(false);
    if (res.success && res.data) {
      const store = useBuilderStore.getState();
      useBuilderStore.setState({ pages: [...store.pages, res.data] });
      selectPage(res.data.id);
      setShowCreateForm(false);
      setNewPageLabel('');
      setNewPageSlug('');
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('Delete this page and all its sections?')) return;
    const res = await deleteBuilderPage(tenantSlug, pageId);
    if (res.success) {
      const store = useBuilderStore.getState();
      const newPages = store.pages.filter((p) => p.id !== pageId);
      useBuilderStore.setState({ pages: newPages });
      if (selectedPageId === pageId) {
        selectPage(newPages[0]?.id ?? null);
      }
    }
  };

  const handleUpdatePage = async (pageId: string) => {
    if (!tenantSlug || !editForm.label?.trim()) return;
    setSavingPage(true);
    const res = await updateBuilderPage(tenantSlug, pageId, {
      label: editForm.label.trim(),
      slug: editForm.slug?.trim() || undefined,
      metaTitle: editForm.metaTitle?.trim() || null,
      metaDescription: editForm.metaDescription?.trim() || null,
      showInNav: editForm.showInNav,
      showInFooter: editForm.showInFooter,
    });
    setSavingPage(false);
    if (res.success && res.data) {
      const store = useBuilderStore.getState();
      const newPages = store.pages.map((p) => (p.id === pageId ? res.data! : p));
      useBuilderStore.setState({ pages: newPages });
      setEditingPageId(null);
    }
  };

  const startEdit = (page: typeof pages[0]) => {
    setEditingPageId(page.id);
    setEditForm({
      label: page.label,
      slug: page.slug,
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      showInNav: page.showInNav,
      showInFooter: page.showInFooter,
    });
  };

  const inputClass =
    'w-full px-2 py-1.5 rounded-md bg-ht-ink border border-ht-border text-ht-text text-xs placeholder:text-ht-text-faint focus:border-ht-violet focus:outline-none';

  return (
    <div className="w-[280px] border-r border-ht-border bg-ht-surface flex flex-col overflow-hidden">
      <div className="h-12 border-b border-ht-border flex items-center justify-between px-3 shrink-0">
        <span className="text-xs font-semibold uppercase tracking-wider text-ht-soft">Pages</span>
        <button
          onClick={() => setShowCreateForm((v) => !v)}
          className="p-1.5 rounded-md hover:bg-ht-ink text-ht-text-faint hover:text-ht-text transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showCreateForm && (
        <div className="p-3 border-b border-ht-border space-y-2">
          <input
            type="text"
            value={newPageLabel}
            onChange={(e) => {
              setNewPageLabel(e.target.value);
              if (!newPageSlug) {
                setNewPageSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
              }
            }}
            placeholder="Page name"
            className={inputClass}
            autoFocus
          />
          <input
            type="text"
            value={newPageSlug}
            onChange={(e) => setNewPageSlug(e.target.value)}
            placeholder="page-slug"
            className={inputClass}
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreatePage}
              disabled={creating || !newPageLabel.trim() || !newPageSlug.trim()}
              className="flex-1 py-1.5 rounded-md bg-ht-violet text-white text-xs font-medium hover:bg-ht-violet/90 disabled:opacity-40 transition-colors"
            >
              {creating ? 'Creating…' : 'Create'}
            </button>
            <button
              onClick={() => { setShowCreateForm(false); setNewPageLabel(''); setNewPageSlug(''); }}
              className="px-3 py-1.5 rounded-md border border-ht-border text-ht-soft text-xs hover:bg-ht-ink transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto py-2">
        {pages.length === 0 && !showCreateForm && (
          <div className="text-center py-8 px-4">
            <p className="text-sm text-ht-text-faint mb-3">No pages yet.</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="text-xs text-ht-violet hover:underline"
            >
              Create your first page
            </button>
          </div>
        )}
        {pages.map((page) => {
          const isExpanded = expandedPages.has(page.id);
          const isSelected = selectedPageId === page.id;
          return (
            <div key={page.id}>
              <button
                onClick={() => {
                  selectPage(page.id);
                  if (!isExpanded) toggleExpand(page.id);
                }}
                className={cn(
                  'group w-full flex items-center gap-2 px-3 py-2 text-left transition-colors',
                  isSelected ? 'bg-ht-violet/10 text-ht-violet' : 'hover:bg-ht-ink text-ht-text',
                )}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); toggleExpand(page.id); }}
                  className="text-ht-text-faint hover:text-ht-text shrink-0"
                >
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
                {page.isHome ? <Home className="w-3.5 h-3.5 shrink-0 text-ht-cyan" /> : <Layout className="w-3.5 h-3.5 shrink-0" />}
                <span className="text-sm font-medium truncate flex-1">{page.label}</span>
                {page.status === 'published' && <Check className="w-3 h-3 text-ht-lime shrink-0" />}
                <button
                  onClick={(e) => { e.stopPropagation(); startEdit(page); }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-ht-violet transition-all shrink-0"
                >
                  <Pencil className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeletePage(page.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:text-ht-rose transition-all shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </button>

              {editingPageId === page.id && (
                <div className="px-3 py-2 border-b border-ht-border space-y-2">
                  <input
                    type="text"
                    value={editForm.label ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, label: e.target.value }))}
                    placeholder="Page name"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={editForm.slug ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, slug: e.target.value }))}
                    placeholder="slug"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={editForm.metaTitle ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, metaTitle: e.target.value }))}
                    placeholder="Meta title"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    value={editForm.metaDescription ?? ''}
                    onChange={(e) => setEditForm((f) => ({ ...f, metaDescription: e.target.value }))}
                    placeholder="Meta description"
                    className={inputClass}
                  />
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1.5 text-xs text-ht-soft">
                      <input
                        type="checkbox"
                        checked={editForm.showInNav ?? true}
                        onChange={(e) => setEditForm((f) => ({ ...f, showInNav: e.target.checked }))}
                        className="rounded border-ht-border bg-ht-ink text-ht-violet"
                      />
                      Nav
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-ht-soft">
                      <input
                        type="checkbox"
                        checked={editForm.showInFooter ?? true}
                        onChange={(e) => setEditForm((f) => ({ ...f, showInFooter: e.target.checked }))}
                        className="rounded border-ht-border bg-ht-ink text-ht-violet"
                      />
                      Footer
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdatePage(page.id)}
                      disabled={savingPage}
                      className="flex-1 py-1.5 rounded-md bg-ht-violet text-white text-xs font-medium hover:bg-ht-violet/90 disabled:opacity-40 transition-colors"
                    >
                      {savingPage ? 'Saving…' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditingPageId(null)}
                      className="px-3 py-1.5 rounded-md border border-ht-border text-ht-soft text-xs hover:bg-ht-ink transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {isExpanded && (
                <div className="pl-6 pr-2 space-y-0.5">
                  {page.sections
                    .slice()
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((section, idx) => {
                      const isSectionSelected = selectedSectionId === section.id;
                      return (
                        <div
                          key={section.id}
                          draggable
                          onDragStart={() => setDragging(section.id)}
                          onDragEnd={() => {
                            setDragging(null);
                            setDragOverSection(null);
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOverSection(section.id);
                          }}
                          onDrop={async (e) => {
                            e.preventDefault();
                            setDragOverSection(null);
                            if (!dragging || dragging === section.id) return;
                            // Reorder
                            const store = useBuilderStore.getState();
                            const p = store.pages.find((pg) => pg.id === page.id);
                            if (!p) return;
                            const ids = p.sections.map((s) => s.id);
                            const fromIdx = ids.indexOf(dragging);
                            const toIdx = ids.indexOf(section.id);
                            if (fromIdx === -1 || toIdx === -1) return;
                            ids.splice(fromIdx, 1);
                            ids.splice(toIdx, 0, dragging);
                            await reorderBuilderSections(tenantSlug, page.id, ids);
                            const newPages = [...store.pages];
                            const pIdx = newPages.findIndex((pg) => pg.id === page.id);
                            const reordered = ids.map((id) => newPages[pIdx].sections.find((s) => s.id === id)!);
                            newPages[pIdx] = { ...newPages[pIdx], sections: reordered.map((s, i) => ({ ...s, sortOrder: i })) };
                            useBuilderStore.setState({ pages: newPages });
                            setDragging(null);
                          }}
                          className={cn(
                            'group flex items-center gap-1.5 px-2 py-1.5 rounded-md transition-colors cursor-grab active:cursor-grabbing',
                            isSectionSelected ? 'bg-ht-violet/10 text-ht-violet' : 'hover:bg-ht-ink text-ht-soft',
                            dragOverSection === section.id && dragging !== section.id && 'border border-ht-violet/30',
                          )}
                        >
                          <GripVertical className="w-3 h-3 opacity-0 group-hover:opacity-50 shrink-0" />
                          <button
                            onClick={() => handleToggleSection(page.id, section.id, section.enabled)}
                            className={cn(
                              'shrink-0',
                              section.enabled ? 'text-ht-violet' : 'text-ht-border',
                            )}
                          >
                            {section.enabled ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          </button>
                          <button
                            onClick={() => selectSection(section.id)}
                            className="flex-1 text-left text-xs truncate"
                          >
                            {section.label}
                          </button>
                          <button
                            onClick={() => handleDuplicateSection(page.id, section.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-ht-text transition-all"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteSection(page.id, section.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-ht-rose transition-all"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

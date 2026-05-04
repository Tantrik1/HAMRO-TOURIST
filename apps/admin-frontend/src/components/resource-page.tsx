'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader2, Edit2, X } from 'lucide-react';
import { apiGet, apiPost, apiPatch, apiDelete } from '@/lib/api';

export interface ResourceField {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'number';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface ResourcePageProps {
  title: string;
  subtitle: string;
  endpoint: string;
  fields: ResourceField[];
  primaryField: string;
  secondaryField?: string;
  emptyState: string;
  newButtonLabel?: string;
  beforeSubmit?: (data: Record<string, any>) => Record<string, any>;
  basePath: string;
}

export function ResourcePage({
  title,
  subtitle,
  endpoint,
  fields,
  primaryField,
  secondaryField,
  emptyState,
  newButtonLabel = 'Add New',
  beforeSubmit,
  basePath,
}: ResourcePageProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function reload() {
    setLoading(true);
    const res = await apiGet<any[]>(endpoint);
    if (res.success) setItems(Array.isArray(res.data) ? res.data : []);
    setLoading(false);
  }

  useEffect(() => { reload(); }, [endpoint]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this item? This cannot be undone.')) return;
    await apiDelete(`${endpoint}/${id}`);
    reload();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ht-text">{title}</h1>
          <p className="font-body text-ht-soft mt-1">{subtitle}</p>
        </div>
        <a
          href={`${basePath}/new`}
          className="inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-5 py-2.5 hover:shadow-glow-violet hover:scale-[1.02] transition-all"
        >
          <Plus className="w-4 h-4" />
          {newButtonLabel}
        </a>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-ht-violet animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-ht-surface border border-ht-border border-dashed rounded-xl2 p-12 text-center">
          <p className="font-display text-xl text-ht-soft mb-2">No items yet</p>
          <p className="text-sm text-ht-text-faint">{emptyState}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-ht-surface border border-ht-border rounded-xl2 p-5 hover:border-ht-violet/40 hover:shadow-card-hover transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-semibold text-lg text-ht-text truncate">
                    {item[primaryField] || '—'}
                  </h3>
                  {secondaryField && (
                    <p className="text-sm text-ht-soft mt-1 line-clamp-2">{item[secondaryField] || ''}</p>
                  )}
                  {item.slug && (
                    <p className="text-xs font-mono text-ht-text-faint mt-2">/{item.slug}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <a
                    href={`${basePath}/${item.id}/edit`}
                    className="p-2 rounded-md text-ht-soft hover:text-ht-violet hover:bg-ht-violet/10 transition"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-md text-ht-soft hover:text-ht-rose hover:bg-ht-rose/10 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

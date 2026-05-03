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
}: ResourcePageProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Record<string, any>>({});
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  async function reload() {
    setLoading(true);
    const res = await apiGet<any[]>(endpoint);
    if (res.success) setItems(Array.isArray(res.data) ? res.data : []);
    setLoading(false);
  }

  useEffect(() => { reload(); }, [endpoint]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const payload = beforeSubmit ? beforeSubmit(form) : form;
    const res = editingId
      ? await apiPatch(`${endpoint}/${editingId}`, payload)
      : await apiPost(endpoint, payload);
    setSubmitting(false);
    if (res.success) {
      setShowForm(false);
      setForm({});
      setEditingId(null);
      reload();
    } else {
      setError(res.error.message);
    }
  }

  function handleEdit(item: any) {
    setForm(item);
    setEditingId(item.id);
    setShowForm(true);
    setError('');
  }

  function handleCancelEdit() {
    setShowForm(false);
    setForm({});
    setEditingId(null);
    setError('');
  }

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
        <button
          onClick={() => {
            if (showForm && editingId) {
              handleCancelEdit();
            } else {
              setShowForm((v) => !v);
            }
          }}
          className="inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-5 py-2.5 hover:shadow-glow-violet hover:scale-[1.02] transition-all"
        >
          <Plus className="w-4 h-4" />
          {showForm ? (editingId ? 'Cancel Edit' : 'Cancel') : newButtonLabel}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-ht-surface border border-ht-border rounded-xl2 p-6 mb-6 animate-slide-up"
        >
          {error && (
            <div className="mb-4 p-3 rounded-md bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <label className="block">
                  <span className="text-xs font-body text-ht-soft uppercase tracking-wider">
                    {f.label}{f.required && <span className="text-ht-rose ml-1">*</span>}
                  </span>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={form[f.name] || ''}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      placeholder={f.placeholder}
                      required={f.required}
                      rows={3}
                      className="mt-1 w-full px-3 py-2 bg-ht-ink border border-ht-border rounded-md text-ht-text focus:border-ht-violet focus:outline-none"
                    />
                  ) : f.type === 'select' ? (
                    <select
                      value={form[f.name] || ''}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                      required={f.required}
                      className="mt-1 w-full px-3 py-2 bg-ht-ink border border-ht-border rounded-md text-ht-text focus:border-ht-violet focus:outline-none"
                    >
                      <option value="">Select…</option>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type || 'text'}
                      value={form[f.name] || ''}
                      onChange={(e) => setForm({
                        ...form,
                        [f.name]: f.type === 'number' ? Number(e.target.value) : e.target.value,
                      })}
                      placeholder={f.placeholder}
                      required={f.required}
                      className="mt-1 w-full px-3 py-2 bg-ht-ink border border-ht-border rounded-md text-ht-text focus:border-ht-violet focus:outline-none"
                    />
                  )}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 inline-flex items-center gap-2 bg-grad-primary text-white font-semibold rounded-full px-6 py-2.5 hover:shadow-glow-violet disabled:opacity-50"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {editingId ? 'Update' : 'Save'}
          </button>
        </form>
      )}

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
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-md text-ht-soft hover:text-ht-violet hover:bg-ht-violet/10 transition"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
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

'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiPost } from '@/lib/api';

export default function NewProductPage() {
  const searchParams = useSearchParams();
  const productType = searchParams.get('type') || 'tours';
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    difficulty: 'moderate',
    durationDays: 1,
    maxAltitude: 0,
    basePrice: 0,
    type: 'adventure',
    status: 'draft',
    regionId: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      title: form.title,
      description: form.description || undefined,
      status: form.status,
    };

    if (productType === 'tours') {
      body.difficulty = form.difficulty;
      body.durationDays = Number(form.durationDays);
      if (form.regionId) body.regionId = form.regionId;
    } else if (productType === 'treks') {
      body.difficulty = form.difficulty;
      body.maxAltitude = Number(form.maxAltitude) || undefined;
      if (form.regionId) body.regionId = form.regionId;
    } else if (productType === 'activities') {
      body.type = form.type;
      body.basePrice = Number(form.basePrice);
      if (form.regionId) body.regionId = form.regionId;
    }

    const res = await apiPost(`/products/${productType}`, body);
    setLoading(false);

    if (res.success) {
      router.push('/dashboard/products');
    } else {
      setError('error' in res ? res.error.message : 'Failed to create');
    }
  }

  const label = productType.slice(0, -1);

  return (
    <div>
      <div className="mb-8">
        <a href="/dashboard/products" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Products
        </a>
        <h1 className="font-display font-bold text-3xl text-ht-text mt-2">New {label}</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>
        )}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Title *</label>
            <input type="text" value={form.title} onChange={(e) => update('title', e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder={`Enter ${label} title`} />
          </div>

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => update('description', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none"
              placeholder="Describe the experience..." />
          </div>

          {(productType === 'tours' || productType === 'treks') && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm text-ht-soft mb-1.5">Difficulty</label>
                <select value={form.difficulty} onChange={(e) => update('difficulty', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]">
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="hard">Hard</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              {productType === 'tours' && (
                <div>
                  <label className="block font-body text-sm text-ht-soft mb-1.5">Duration (days)</label>
                  <input type="number" min={1} value={form.durationDays} onChange={(e) => update('durationDays', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
                </div>
              )}
              {productType === 'treks' && (
                <div>
                  <label className="block font-body text-sm text-ht-soft mb-1.5">Max Altitude (m)</label>
                  <input type="number" min={0} value={form.maxAltitude} onChange={(e) => update('maxAltitude', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
                </div>
              )}
            </div>
          )}

          {productType === 'activities' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-sm text-ht-soft mb-1.5">Activity Type</label>
                <input type="text" value={form.type} onChange={(e) => update('type', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                  placeholder="e.g., rafting, paragliding" />
              </div>
              <div>
                <label className="block font-body text-sm text-ht-soft mb-1.5">Base Price ($)</label>
                <input type="number" min={0} step={0.01} value={form.basePrice} onChange={(e) => update('basePrice', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
              </div>
            </div>
          )}

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Status</label>
            <select value={form.status} onChange={(e) => update('status', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
            {loading ? 'Creating...' : `Create ${label}`}
          </button>
          <a href="/dashboard/products"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

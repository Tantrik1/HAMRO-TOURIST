'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/api';
import ImageUploadField from '@/components/image-upload-field';

export default function NewCountryPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    code: '',
    isActive: true,
    sortOrder: 0,
    description: '',
    coverImageUrl: null as string | null,
    media: { bannerImage: null as string | null, cardImage: null as string | null, ogImage: null as string | null, galleryImages: [] as string[] },
    seo: { metaTitle: '', metaDescription: '', metaKeywords: '', ogTitle: '', ogDescription: '', canonicalUrl: '', noIndex: false, noFollow: false },
    faqs: [] as { question: string; answer: string }[],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function slugify(s: string) {
    return s.toLowerCase().trim().replace(/[^a-z0-9-\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      name: form.name,
      code: form.code,
      slug: slugify(form.name),
      sortOrder: Number(form.sortOrder),
    };
    if (form.media.bannerImage || form.media.cardImage || form.media.ogImage || form.media.galleryImages.length) {
      body.media = {
        ...(form.media.bannerImage && { bannerImage: form.media.bannerImage }),
        ...(form.media.cardImage && { cardImage: form.media.cardImage }),
        ...(form.media.ogImage && { ogImage: form.media.ogImage }),
        ...(form.media.galleryImages.length && { galleryImages: form.media.galleryImages }),
      };
    }
    if (form.seo.metaTitle || form.seo.metaDescription || form.seo.metaKeywords) {
      body.seo = {
        ...(form.seo.metaTitle && { metaTitle: form.seo.metaTitle }),
        ...(form.seo.metaDescription && { metaDescription: form.seo.metaDescription }),
        ...(form.seo.metaKeywords && { metaKeywords: form.seo.metaKeywords.split(',').map((s: string) => s.trim()).filter(Boolean) }),
        ...(form.seo.ogTitle && { ogTitle: form.seo.ogTitle }),
        ...(form.seo.ogDescription && { ogDescription: form.seo.ogDescription }),
        ...(form.seo.canonicalUrl && { canonicalUrl: form.seo.canonicalUrl }),
        noIndex: form.seo.noIndex,
        noFollow: form.seo.noFollow,
      };
    }
    if (form.faqs.length) {
      body.faqs = form.faqs.filter((f) => f.question && f.answer);
    }

    const res = await apiPost('/products/countries', body);
    setLoading(false);

    if (res.success) {
      router.push('/dashboard/countries');
    } else {
      setError('error' in res ? res.error.message : 'Failed to create country');
    }
  }

  return (
    <div>
      <div className="mb-8">
        <a href="/dashboard/countries" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Countries
        </a>
        <h1 className="font-display font-bold text-3xl text-ht-text mt-2">New Country</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>
        )}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Country name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="Nepal"
            />
          </div>

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">ISO Code *</label>
            <input
              type="text"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
              required
              maxLength={2}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="NP"
            />
          </div>

          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Sort order</label>
            <input
              type="number"
              min={0}
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
            />
          </div>
        </div>

        {/* Media */}
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ImageUploadField
              label="Banner Image"
              value={form.media.bannerImage}
              onChange={(url) => setForm({ ...form, media: { ...form.media, bannerImage: url } })}
              category="misc"
            />
            <ImageUploadField
              label="Card Image"
              value={form.media.cardImage}
              onChange={(url) => setForm({ ...form, media: { ...form.media, cardImage: url } })}
              category="misc"
            />
          </div>
          <ImageUploadField
            label="OG Image"
            value={form.media.ogImage}
            onChange={(url) => setForm({ ...form, media: { ...form.media, ogImage: url } })}
            category="misc"
          />
        </div>

        {/* SEO */}
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">SEO Settings</h3>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Meta title</label>
            <input
              type="text"
              value={form.seo.metaTitle}
              onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaTitle: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="SEO title (max 60 chars)"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Meta description</label>
            <textarea
              rows={3}
              value={form.seo.metaDescription}
              onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaDescription: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none"
              placeholder="SEO description (max 160 chars)"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Meta keywords</label>
            <input
              type="text"
              value={form.seo.metaKeywords}
              onChange={(e) => setForm({ ...form, seo: { ...form.seo, metaKeywords: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">OG title</label>
            <input
              type="text"
              value={form.seo.ogTitle}
              onChange={(e) => setForm({ ...form, seo: { ...form.seo, ogTitle: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="Open Graph title"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">OG description</label>
            <textarea
              rows={2}
              value={form.seo.ogDescription}
              onChange={(e) => setForm({ ...form, seo: { ...form.seo, ogDescription: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none"
              placeholder="Open Graph description"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Canonical URL</label>
            <input
              type="text"
              value={form.seo.canonicalUrl}
              onChange={(e) => setForm({ ...form, seo: { ...form.seo, canonicalUrl: e.target.value } })}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="https://..."
            />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 font-body text-sm text-ht-soft">
              <input
                type="checkbox"
                checked={form.seo.noIndex}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, noIndex: e.target.checked } })}
                className="w-4 h-4 accent-ht-violet"
              />
              No index
            </label>
            <label className="flex items-center gap-2 font-body text-sm text-ht-soft">
              <input
                type="checkbox"
                checked={form.seo.noFollow}
                onChange={(e) => setForm({ ...form, seo: { ...form.seo, noFollow: e.target.checked } })}
                className="w-4 h-4 accent-ht-violet"
              />
              No follow
            </label>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-lg text-ht-text">FAQs</h3>
            <button
              type="button"
              onClick={() => setForm({ ...form, faqs: [...form.faqs, { question: '', answer: '' }] })}
              className="px-4 py-2 rounded-lg font-body text-sm text-ht-text border border-ht-border hover:border-ht-violet transition-all"
            >
              + Add FAQ
            </button>
          </div>
          {form.faqs.length === 0 && (
            <p className="text-sm text-ht-soft font-body">No FAQs yet.</p>
          )}
          {form.faqs.map((faq, idx) => (
            <div key={idx} className="space-y-3 border-b border-ht-border/50 pb-4 last:border-0">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[idx] = { ...next[idx], question: e.target.value };
                      setForm({ ...form, faqs: next });
                    }}
                    placeholder="Question"
                    className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                  />
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => {
                      const next = [...form.faqs];
                      next[idx] = { ...next[idx], answer: e.target.value };
                      setForm({ ...form, faqs: next });
                    }}
                    placeholder="Answer"
                    className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, faqs: form.faqs.filter((_, i) => i !== idx) })}
                  className="mt-2 text-ht-rose hover:text-ht-rose/80 font-body text-xs"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Country'}
          </button>
          <a
            href="/dashboard/countries"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

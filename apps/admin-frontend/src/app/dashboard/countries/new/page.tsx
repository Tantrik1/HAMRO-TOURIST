'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/api';
import { slugify } from '@/lib/slugify';
import MediaPanel, { defaultMediaState, mediaStateToApi, MediaFormState } from '@/components/cms/media-panel';
import SeoPanel, { defaultSeoState, seoStateToApi, SeoFormState } from '@/components/cms/seo-panel';
import FaqManager, { FaqRow } from '@/components/cms/faq-manager';

export default function NewCountryPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [media, setMedia] = useState<MediaFormState>(defaultMediaState());
  const [seo, setSeo] = useState<SeoFormState>(defaultSeoState());
  const [faqs, setFaqs] = useState<FaqRow[]>([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      slug: slugify(name),
      sortOrder: Number(sortOrder) || 0,
    };
    const mediaPayload = mediaStateToApi(media);
    if (mediaPayload) body.media = mediaPayload;
    const seoPayload = seoStateToApi(seo);
    if (seoPayload) body.seo = seoPayload;
    if (faqs.length) body.faqs = faqs.filter((f) => f.question.trim() && f.answer.trim());

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
      <div className="mb-6 sm:mb-8">
        <a href="/dashboard/countries" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Countries
        </a>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text mt-2">New country</h1>
        <p className="font-body text-sm text-ht-soft mt-1">Full CMS: media, SEO, FAQs. Images auto-convert to high-quality WebP.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>
        )}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">Basic info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-body text-sm text-ht-soft mb-1.5">Country name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                placeholder="Nepal" />
              {name && <p className="mt-1 text-[10px] font-mono text-ht-muted">Slug: {slugify(name) || '—'}</p>}
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">ISO code *</label>
              <input type="text" required maxLength={3} value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm uppercase placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                placeholder="NP" />
            </div>
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Sort order</label>
            <input type="number" min={0} value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            <p className="mt-1 text-[10px] font-mono text-ht-muted">Lower numbers appear first.</p>
          </div>
        </div>

        <MediaPanel value={media} onChange={setMedia} category="countries" />
        <SeoPanel value={seo} onChange={setSeo} category="countries" />

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          <FaqManager value={faqs} onChange={setFaqs} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
            {loading ? 'Creating...' : 'Create country'}
          </button>
          <a href="/dashboard/countries"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center justify-center">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

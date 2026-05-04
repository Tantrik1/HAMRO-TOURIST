'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet, apiPost } from '@/lib/api';
import { slugify } from '@/lib/slugify';
import MediaPanel, { defaultMediaState, mediaStateToApi, MediaFormState } from '@/components/cms/media-panel';
import SeoPanel, { defaultSeoState, seoStateToApi, SeoFormState } from '@/components/cms/seo-panel';
import FaqManager, { FaqRow } from '@/components/cms/faq-manager';

interface Country { id: string; name: string }

export default function NewRegionPage() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);

  const [countryId, setCountryId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [media, setMedia] = useState<MediaFormState>(defaultMediaState());
  const [seo, setSeo] = useState<SeoFormState>(defaultSeoState());
  const [faqs, setFaqs] = useState<FaqRow[]>([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await apiGet<any>('/products/countries');
      if (res.success) {
        setCountries(((res.data as any) || []) as Country[]);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      countryId,
      name: name.trim(),
      slug: slugify(name),
      sortOrder: Number(sortOrder) || 0,
    };
    if (description.trim()) body.description = description.trim();
    const mediaPayload = mediaStateToApi(media);
    if (mediaPayload) {
      body.media = mediaPayload;
      if (media.bannerImage) body.coverImageUrl = media.bannerImage;
    }
    const seoPayload = seoStateToApi(seo);
    if (seoPayload) body.seo = seoPayload;
    if (faqs.length) body.faqs = faqs.filter((f) => f.question.trim() && f.answer.trim());

    const res = await apiPost('/products/regions', body);
    setLoading(false);

    if (res.success) router.push('/dashboard/regions');
    else setError('error' in res ? res.error.message : 'Failed to create region');
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <a href="/dashboard/regions" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Regions
        </a>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text mt-2">New region</h1>
        <p className="font-body text-sm text-ht-soft mt-1">Group destinations and activities under a region. Full SEO, media, FAQs supported.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>
        )}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">Basic info</h3>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Country *</label>
            <select required value={countryId} onChange={(e) => setCountryId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]">
              <option value="">Select country…</option>
              {countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Region name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Everest Region"
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            {name && <p className="mt-1 text-[10px] font-mono text-ht-muted">Slug: {slugify(name) || '—'}</p>}
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Description</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of the region."
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none" />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Sort order</label>
            <input type="number" min={0} value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
          </div>
        </div>

        <MediaPanel value={media} onChange={setMedia} category="regions" />
        <SeoPanel value={seo} onChange={setSeo} category="regions" />

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          <FaqManager value={faqs} onChange={setFaqs} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" disabled={loading || !countryId}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
            {loading ? 'Creating...' : 'Create region'}
          </button>
          <a href="/dashboard/regions"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center justify-center">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet, apiPost } from '@/lib/api';
import { slugify } from '@/lib/slugify';
import MediaPanel, { defaultMediaState, mediaStateToApi, MediaFormState } from '@/components/cms/media-panel';
import SeoPanel, { defaultSeoState, seoStateToApi, SeoFormState } from '@/components/cms/seo-panel';
import FaqManager, { FaqRow } from '@/components/cms/faq-manager';
import GroupDiscountManager, { GroupDiscountRow } from '@/components/cms/group-discount-manager';

interface Region { id: string; name: string; country?: { name: string } }

export default function NewActivityPage() {
  const router = useRouter();
  const [regions, setRegions] = useState<Region[]>([]);

  const [title, setTitle] = useState('');
  const [regionId, setRegionId] = useState('');
  const [type, setType] = useState('paragliding');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [durationHours, setDurationHours] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [linkMode, setLinkMode] = useState<'standalone' | 'bundled'>('standalone');

  const [media, setMedia] = useState<MediaFormState>(defaultMediaState());
  const [seo, setSeo] = useState<SeoFormState>(defaultSeoState());
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [discounts, setDiscounts] = useState<GroupDiscountRow[]>([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await apiGet<any>('/products/regions');
      if (res.success) {
        const payload: any = res.data;
        const list: Region[] = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
        setRegions(list);
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      title: title.trim(),
      slug: slugify(title),
      regionId,
      type: type.trim(),
      basePrice: Number(basePrice) || 0,
      sortOrder: Number(sortOrder) || 0,
      linkMode,
    };
    if (description.trim()) body.description = description.trim();
    if (Number(durationHours)) body.durationHours = Number(durationHours);
    if (media.bannerImage) body.coverImageUrl = media.bannerImage;
    const mediaPayload = mediaStateToApi(media);
    if (mediaPayload) body.media = mediaPayload;
    const seoPayload = seoStateToApi(seo);
    if (seoPayload) body.seo = seoPayload;
    if (faqs.length) body.faqs = faqs.filter((f) => f.question.trim() && f.answer.trim());
    if (discounts.length) body.groupDiscounts = discounts;

    const res = await apiPost('/products/activities', body);
    setLoading(false);
    if (res.success) router.push('/dashboard/activities');
    else setError('error' in res ? res.error.message : 'Failed to create activity');
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <a href="/dashboard/activities" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Activities
        </a>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text mt-2">New activity</h1>
        <p className="font-body text-sm text-ht-soft mt-1">Complete CMS: media, SEO, FAQs, group discounts.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">Basic info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-body text-sm text-ht-soft mb-1.5">Title *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Paragliding in Pokhara"
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
              {title && <p className="mt-1 text-[10px] font-mono text-ht-muted">Slug: {slugify(title) || '—'}</p>}
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Region *</label>
              <select required value={regionId} onChange={(e) => setRegionId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]">
                <option value="">Select region…</option>
                {regions.map((r) => <option key={r.id} value={r.id}>{r.country?.name ? `${r.country.name} — ${r.name}` : r.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Activity type *</label>
              <input type="text" required value={type} onChange={(e) => setType(e.target.value)}
                placeholder="paragliding, rafting, zipline..."
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Base price ($) *</label>
              <input type="number" min={0} step={0.01} required value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Duration (hours)</label>
              <input type="number" min={0} step={0.5} value={durationHours} onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Sort order</label>
              <input type="number" min={0} value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Link mode</label>
              <select value={linkMode} onChange={(e) => setLinkMode(e.target.value as 'standalone' | 'bundled')}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]">
                <option value="standalone">Standalone (bookable on its own)</option>
                <option value="bundled">Bundled (add-on to treks/tours)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Description</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the experience..."
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none" />
          </div>
        </div>

        <MediaPanel value={media} onChange={setMedia} category="activities" />
        <SeoPanel value={seo} onChange={setSeo} category="activities" />

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          <FaqManager value={faqs} onChange={setFaqs} />
        </div>
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          <GroupDiscountManager value={discounts} onChange={setDiscounts} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" disabled={loading || !regionId}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
            {loading ? 'Creating...' : 'Create activity'}
          </button>
          <a href="/dashboard/activities"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center justify-center">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

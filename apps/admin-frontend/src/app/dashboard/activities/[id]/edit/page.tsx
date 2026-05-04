'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet, apiPatch } from '@/lib/api';
import MediaPanel, { defaultMediaState, mediaStateFromApi, mediaStateToApi, MediaFormState } from '@/components/cms/media-panel';
import SeoPanel, { defaultSeoState, seoStateFromApi, seoStateToApi, SeoFormState } from '@/components/cms/seo-panel';
import FaqManager, { FaqRow } from '@/components/cms/faq-manager';
import GroupDiscountManager, { GroupDiscountRow } from '@/components/cms/group-discount-manager';

interface Region { id: string; name: string; country?: { name: string } }

export default function EditActivityPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [regions, setRegions] = useState<Region[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [regionId, setRegionId] = useState('');
  const [type, setType] = useState('');
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
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function load() {
      const [actRes, regionsRes] = await Promise.all([
        apiGet<any>(`/products/activities/${id}`),
        apiGet<any>('/products/regions'),
      ]);
      if (actRes.success) {
        const a: any = actRes.data;
        setTitle(a.title ?? '');
        setSlug(a.slug ?? '');
        setRegionId(a.regionId ?? '');
        setType(a.type ?? '');
        setDescription(a.description ?? '');
        setBasePrice(Number(a.basePrice ?? 0));
        setDurationHours(Number(a.durationHours ?? 0));
        setSortOrder(a.sortOrder ?? 0);
        setStatus((a.status as 'draft' | 'published') ?? 'draft');
        setLinkMode((a.linkMode as 'standalone' | 'bundled') ?? 'standalone');
        setMedia(mediaStateFromApi(a.media ?? (a.coverImageUrl ? { bannerImage: a.coverImageUrl } : null)));
        setSeo(seoStateFromApi(a.seo));
        setFaqs(Array.isArray(a.faqs) ? a.faqs.map((f: any) => ({
          question: f.question, answer: f.answer,
          sortOrder: f.sortOrder ?? 0, isActive: f.isActive ?? true,
        })) : []);
        setDiscounts(Array.isArray(a.groupDiscounts) ? a.groupDiscounts.map((g: any) => ({
          minPax: g.minPax, maxPax: g.maxPax,
          discountType: g.discountType, discountValue: Number(g.discountValue),
          label: g.label ?? '', isActive: g.isActive ?? true,
        })) : []);
      }
      if (regionsRes.success) {
        const payload: any = regionsRes.data;
        const list: Region[] = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : [];
        setRegions(list);
      }
      setFetching(false);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      title: title.trim(),
      regionId,
      type: type.trim(),
      basePrice: Number(basePrice) || 0,
      sortOrder: Number(sortOrder) || 0,
      status,
      linkMode,
    };
    if (description.trim()) body.description = description.trim();
    if (Number(durationHours)) body.durationHours = Number(durationHours);
    if (media.bannerImage) body.coverImageUrl = media.bannerImage;
    body.media = mediaStateToApi(media) ?? {};
    body.seo = seoStateToApi(seo) ?? {};
    body.faqs = faqs.filter((f) => f.question.trim() && f.answer.trim());
    body.groupDiscounts = discounts;

    const res = await apiPatch(`/products/activities/${id}`, body);
    setLoading(false);
    if (res.success) router.push('/dashboard/activities');
    else setError('error' in res ? res.error.message : 'Failed to update activity');
  }

  if (fetching) return <div className="font-body text-ht-soft">Loading activity...</div>;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <a href="/dashboard/activities" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Activities
        </a>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text mt-2">Edit activity</h1>
        <p className="font-body text-sm text-ht-soft mt-1">Slug: <span className="font-mono text-ht-muted">{slug}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">Basic info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-body text-sm text-ht-soft mb-1.5">Title *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
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
                <option value="standalone">Standalone</option>
                <option value="bundled">Bundled</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Description</label>
            <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
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
          <button type="submit" disabled={loading}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
            {loading ? 'Saving...' : 'Save changes'}
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

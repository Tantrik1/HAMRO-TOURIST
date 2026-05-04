'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet, apiPatch } from '@/lib/api';
import MediaPanel, { defaultMediaState, mediaStateFromApi, mediaStateToApi, MediaFormState } from '@/components/cms/media-panel';
import SeoPanel, { defaultSeoState, seoStateFromApi, seoStateToApi, SeoFormState } from '@/components/cms/seo-panel';
import FaqManager, { FaqRow } from '@/components/cms/faq-manager';
import GroupDiscountManager, { GroupDiscountRow } from '@/components/cms/group-discount-manager';
import ItineraryManager, { ItineraryDayRow } from '@/components/cms/itinerary-manager';
import ListField, { arrayToLines, linesToArray } from '@/components/cms/list-field';

interface Region { id: string; name: string; country?: { name: string } }

export default function EditDestinationPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [regions, setRegions] = useState<Region[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [regionId, setRegionId] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'hard' | 'extreme'>('moderate');
  const [description, setDescription] = useState('');
  const [maxAltitude, setMaxAltitude] = useState(0);
  const [durationDays, setDurationDays] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  const [highlights, setHighlights] = useState('');
  const [inclusions, setInclusions] = useState('');
  const [exclusions, setExclusions] = useState('');

  const [itinerary, setItinerary] = useState<ItineraryDayRow[]>([]);
  const [media, setMedia] = useState<MediaFormState>(defaultMediaState());
  const [seo, setSeo] = useState<SeoFormState>(defaultSeoState());
  const [faqs, setFaqs] = useState<FaqRow[]>([]);
  const [discounts, setDiscounts] = useState<GroupDiscountRow[]>([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function load() {
      const [trekRes, regionsRes] = await Promise.all([
        apiGet<any>(`/products/treks/${id}`),
        apiGet<any>('/products/regions'),
      ]);
      if (trekRes.success) {
        const t: any = trekRes.data;
        setTitle(t.title ?? '');
        setSlug(t.slug ?? '');
        setRegionId(t.regionId ?? '');
        setDifficulty((t.difficulty as any) ?? 'moderate');
        setDescription(t.description ?? '');
        setMaxAltitude(Number(t.maxAltitude ?? 0));
        setDurationDays(Number(t.durationDays ?? 1));
        setBasePrice(Number(t.basePrice ?? 0));
        setSortOrder(t.sortOrder ?? 0);
        setStatus((t.status as 'draft' | 'published') ?? 'draft');
        setHighlights(arrayToLines(t.highlights));
        setInclusions(arrayToLines(t.inclusions));
        setExclusions(arrayToLines(t.exclusions));
        setItinerary(Array.isArray(t.itinerary) ? t.itinerary.map((d: any, i: number) => ({
          day: d.day ?? i + 1, title: d.title ?? '',
          description: d.description ?? '', accommodation: d.accommodation ?? '',
          meals: d.meals ?? '', altitude: d.altitude ?? undefined,
        })) : []);
        setMedia(mediaStateFromApi(t.media ?? (t.coverImageUrl ? { bannerImage: t.coverImageUrl } : null)));
        setSeo(seoStateFromApi(t.seo));
        setFaqs(Array.isArray(t.faqs) ? t.faqs.map((f: any) => ({
          question: f.question, answer: f.answer,
          sortOrder: f.sortOrder ?? 0, isActive: f.isActive ?? true,
        })) : []);
        setDiscounts(Array.isArray(t.groupDiscounts) ? t.groupDiscounts.map((g: any) => ({
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
      difficulty,
      durationDays: Number(durationDays) || 1,
      sortOrder: Number(sortOrder) || 0,
      status,
    };
    body.description = description.trim() || null;
    body.maxAltitude = Number(maxAltitude) || null;
    body.basePrice = Number(basePrice) || 0;
    if (media.bannerImage) body.coverImageUrl = media.bannerImage;

    body.highlights = linesToArray(highlights);
    body.inclusions = linesToArray(inclusions);
    body.exclusions = linesToArray(exclusions);
    body.itinerary = itinerary;

    body.media = mediaStateToApi(media) ?? {};
    body.seo = seoStateToApi(seo) ?? {};
    body.faqs = faqs.filter((f) => f.question.trim() && f.answer.trim());
    body.groupDiscounts = discounts;

    const res = await apiPatch(`/products/treks/${id}`, body);
    setLoading(false);
    if (res.success) router.push('/dashboard/destinations');
    else setError('error' in res ? res.error.message : 'Failed to update destination');
  }

  if (fetching) return <div className="font-body text-ht-soft">Loading destination...</div>;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <a href="/dashboard/destinations" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Destinations
        </a>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text mt-2">Edit destination</h1>
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
              <label className="block font-body text-sm text-ht-soft mb-1.5">Difficulty *</label>
              <select required value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]">
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Duration (days) *</label>
              <input type="number" min={1} required value={durationDays} onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Max altitude (m)</label>
              <input type="number" min={0} value={maxAltitude} onChange={(e) => setMaxAltitude(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Base price ($)</label>
              <input type="number" min={0} step={0.01} value={basePrice} onChange={(e) => setBasePrice(Number(e.target.value))}
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
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Description</label>
            <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none" />
          </div>
        </div>

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">What's included</h3>
          <ListField label="Highlights" value={highlights} onChange={setHighlights} />
          <ListField label="Inclusions" value={inclusions} onChange={setInclusions} />
          <ListField label="Exclusions" value={exclusions} onChange={setExclusions} />
        </div>

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          <ItineraryManager value={itinerary} onChange={setItinerary} />
        </div>

        <MediaPanel value={media} onChange={setMedia} category="treks" />
        <SeoPanel value={seo} onChange={setSeo} category="treks" />

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
          <a href="/dashboard/destinations"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center justify-center">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

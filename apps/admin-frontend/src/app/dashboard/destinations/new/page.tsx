'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiGet, apiPost } from '@/lib/api';
import { slugify } from '@/lib/slugify';
import MediaPanel, { defaultMediaState, mediaStateToApi, MediaFormState } from '@/components/cms/media-panel';
import SeoPanel, { defaultSeoState, seoStateToApi, SeoFormState } from '@/components/cms/seo-panel';
import FaqManager, { FaqRow } from '@/components/cms/faq-manager';
import GroupDiscountManager, { GroupDiscountRow } from '@/components/cms/group-discount-manager';
import ItineraryManager, { ItineraryDayRow } from '@/components/cms/itinerary-manager';
import ListField, { linesToArray } from '@/components/cms/list-field';

interface Region { id: string; name: string; country?: { name: string } }

export default function NewDestinationPage() {
  const router = useRouter();
  const [regions, setRegions] = useState<Region[]>([]);

  const [title, setTitle] = useState('');
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
      difficulty,
      durationDays: Number(durationDays) || 1,
      sortOrder: Number(sortOrder) || 0,
    };
    if (description.trim()) body.description = description.trim();
    if (Number(maxAltitude)) body.maxAltitude = Number(maxAltitude);
    if (Number(basePrice)) body.basePrice = Number(basePrice);
    if (media.bannerImage) body.coverImageUrl = media.bannerImage;

    const hl = linesToArray(highlights);
    const inc = linesToArray(inclusions);
    const exc = linesToArray(exclusions);
    if (hl.length) body.highlights = hl;
    if (inc.length) body.inclusions = inc;
    if (exc.length) body.exclusions = exc;
    if (itinerary.length) body.itinerary = itinerary;

    const mediaPayload = mediaStateToApi(media);
    if (mediaPayload) body.media = mediaPayload;
    const seoPayload = seoStateToApi(seo);
    if (seoPayload) body.seo = seoPayload;
    if (faqs.length) body.faqs = faqs.filter((f) => f.question.trim() && f.answer.trim());
    if (discounts.length) body.groupDiscounts = discounts;

    const res = await apiPost('/products/treks', body);
    setLoading(false);
    if (res.success) router.push('/dashboard/destinations');
    else setError('error' in res ? res.error.message : 'Failed to create destination');
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <a href="/dashboard/destinations" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Destinations
        </a>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text mt-2">New destination</h1>
        <p className="font-body text-sm text-ht-soft mt-1">Full CMS: media, SEO, itinerary, FAQs, group discounts.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <h3 className="font-display font-semibold text-lg text-ht-text">Basic info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-body text-sm text-ht-soft mb-1.5">Title *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Everest Base Camp Trek"
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
          <ListField label="Highlights" value={highlights} onChange={setHighlights} placeholder="Sunrise at Kala Patthar&#10;Sherpa culture&#10;Lukla flight" />
          <ListField label="Inclusions" value={inclusions} onChange={setInclusions} placeholder="Permits&#10;Licensed guide&#10;Teahouse accommodation" />
          <ListField label="Exclusions" value={exclusions} onChange={setExclusions} placeholder="International flights&#10;Travel insurance&#10;Personal gear" />
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
          <button type="submit" disabled={loading || !regionId}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50">
            {loading ? 'Creating...' : 'Create destination'}
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

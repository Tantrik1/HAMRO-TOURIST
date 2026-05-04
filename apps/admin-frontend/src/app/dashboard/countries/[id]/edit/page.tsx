'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiGet, apiPatch } from '@/lib/api';
import { slugify } from '@/lib/slugify';
import MediaPanel, { defaultMediaState, mediaStateFromApi, mediaStateToApi, MediaFormState } from '@/components/cms/media-panel';
import SeoPanel, { defaultSeoState, seoStateFromApi, seoStateToApi, SeoFormState } from '@/components/cms/seo-panel';
import FaqManager, { FaqRow } from '@/components/cms/faq-manager';

export default function EditCountryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [slug, setSlug] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [media, setMedia] = useState<MediaFormState>(defaultMediaState());
  const [seo, setSeo] = useState<SeoFormState>(defaultSeoState());
  const [faqs, setFaqs] = useState<FaqRow[]>([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await apiGet<any>(`/products/countries/${id}`);
      if (res.success) {
        const c: any = res.data;
        setName(c.name ?? '');
        setCode(c.code ?? '');
        setSlug(c.slug ?? '');
        setIsActive(c.isActive ?? true);
        setSortOrder(c.sortOrder ?? 0);
        setMedia(mediaStateFromApi(c.media));
        setSeo(seoStateFromApi(c.seo));
        setFaqs(Array.isArray(c.faqs) ? c.faqs.map((f: any) => ({
          question: f.question, answer: f.answer,
          sortOrder: f.sortOrder ?? 0, isActive: f.isActive ?? true,
        })) : []);
      }
      setFetching(false);
    }
    fetchData();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const body: Record<string, unknown> = {
      name: name.trim(),
      code: code.trim().toUpperCase(),
      isActive,
      sortOrder: Number(sortOrder) || 0,
    };
    const mediaPayload = mediaStateToApi(media);
    body.media = mediaPayload ?? {};
    const seoPayload = seoStateToApi(seo);
    body.seo = seoPayload ?? {};
    body.faqs = faqs.filter((f) => f.question.trim() && f.answer.trim());

    const res = await apiPatch(`/products/countries/${id}`, body);
    setLoading(false);

    if (res.success) router.push('/dashboard/countries');
    else setError('error' in res ? res.error.message : 'Failed to update country');
  }

  if (fetching) {
    return <div className="font-body text-ht-soft">Loading country...</div>;
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <a href="/dashboard/countries" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Countries
        </a>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text mt-2">Edit country</h1>
        <p className="font-body text-sm text-ht-soft mt-1">Slug: <span className="font-mono text-ht-muted">{slug}</span></p>
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
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">ISO code *</label>
              <input type="text" required maxLength={3} value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm uppercase placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Sort order</label>
              <input type="number" min={0} value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]" />
            </div>
            <div className="flex items-end">
              <label className="inline-flex items-center gap-3 font-body text-sm text-ht-soft">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 accent-ht-violet" />
                <span>Active (visible on public site)</span>
              </label>
            </div>
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
            {loading ? 'Saving...' : 'Save changes'}
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

'use client';

import ImageUploadField from '@/components/image-upload-field';

export interface SeoFormState {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string; // comma-separated in form; backend expects string[]
  ogTitle: string;
  ogDescription: string;
  ogImage: string | null;
  canonicalUrl: string;
  noIndex: boolean;
  noFollow: boolean;
  structuredData?: string; // raw JSON string; backend expects object
}

interface SeoPanelProps {
  value: SeoFormState;
  onChange: (next: SeoFormState) => void;
  category: string; // media category for og image uploads
}

const inputCls = 'w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]';
const areaCls = 'w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors resize-none';

export default function SeoPanel({ value, onChange, category }: SeoPanelProps) {
  function update<K extends keyof SeoFormState>(key: K, v: SeoFormState[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
      <div>
        <h3 className="font-display font-semibold text-lg text-ht-text">SEO settings</h3>
        <p className="font-body text-xs text-ht-muted">Control how this page appears on Google, Bing, and social shares.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm text-ht-soft mb-1.5">Meta title</label>
          <input type="text" maxLength={60} value={value.metaTitle}
            onChange={(e) => update('metaTitle', e.target.value)}
            className={inputCls} placeholder="Compelling page title (max 60 chars)" />
          <p className="mt-1 text-[10px] font-mono text-ht-muted">{value.metaTitle.length}/60 chars</p>
        </div>
        <div>
          <label className="block font-body text-sm text-ht-soft mb-1.5">Canonical URL</label>
          <input type="text" value={value.canonicalUrl}
            onChange={(e) => update('canonicalUrl', e.target.value)}
            className={inputCls} placeholder="https://yoursite.com/..." />
        </div>
      </div>

      <div>
        <label className="block font-body text-sm text-ht-soft mb-1.5">Meta description</label>
        <textarea rows={3} maxLength={160} value={value.metaDescription}
          onChange={(e) => update('metaDescription', e.target.value)}
          className={areaCls} placeholder="Short summary that appears under the link on Google (max 160 chars)" />
        <p className="mt-1 text-[10px] font-mono text-ht-muted">{value.metaDescription.length}/160 chars</p>
      </div>

      <div>
        <label className="block font-body text-sm text-ht-soft mb-1.5">Meta keywords</label>
        <input type="text" value={value.metaKeywords}
          onChange={(e) => update('metaKeywords', e.target.value)}
          className={inputCls} placeholder="keyword1, keyword2, keyword3" />
        <p className="mt-1 text-[10px] font-mono text-ht-muted">Comma-separated</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm text-ht-soft mb-1.5">OG title (social share)</label>
          <input type="text" maxLength={60} value={value.ogTitle}
            onChange={(e) => update('ogTitle', e.target.value)}
            className={inputCls} placeholder="Optional – defaults to meta title" />
        </div>
        <div>
          <label className="block font-body text-sm text-ht-soft mb-1.5">OG description</label>
          <input type="text" maxLength={160} value={value.ogDescription}
            onChange={(e) => update('ogDescription', e.target.value)}
            className={inputCls} placeholder="Optional – defaults to meta description" />
        </div>
      </div>

      <ImageUploadField
        label="OG image (1200×630 recommended)"
        value={value.ogImage}
        onChange={(url) => update('ogImage', url)}
        category={category}
      />

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 font-body text-sm text-ht-soft">
          <input type="checkbox" checked={value.noIndex}
            onChange={(e) => update('noIndex', e.target.checked)}
            className="w-4 h-4 accent-ht-violet" />
          No index (hide from search engines)
        </label>
        <label className="flex items-center gap-2 font-body text-sm text-ht-soft">
          <input type="checkbox" checked={value.noFollow}
            onChange={(e) => update('noFollow', e.target.checked)}
            className="w-4 h-4 accent-ht-violet" />
          No follow (don’t follow links)
        </label>
      </div>

      <div>
        <label className="block font-body text-sm text-ht-soft mb-1.5">Structured data (JSON-LD)</label>
        <textarea rows={4} value={value.structuredData ?? ''}
          onChange={(e) => update('structuredData', e.target.value)}
          className={`${areaCls} font-mono text-xs`}
          placeholder='{"@context":"https://schema.org", ...}' />
        <p className="mt-1 text-[10px] font-mono text-ht-muted">Advanced: optional JSON-LD injected into the page &lt;head&gt;.</p>
      </div>
    </div>
  );
}

export function defaultSeoState(): SeoFormState {
  return {
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: null,
    canonicalUrl: '',
    noIndex: false,
    noFollow: false,
    structuredData: '',
  };
}

export function seoStateFromApi(seo: any): SeoFormState {
  if (!seo) return defaultSeoState();
  return {
    metaTitle: seo.metaTitle ?? '',
    metaDescription: seo.metaDescription ?? '',
    metaKeywords: Array.isArray(seo.metaKeywords) ? seo.metaKeywords.join(', ') : (seo.metaKeywords ?? ''),
    ogTitle: seo.ogTitle ?? '',
    ogDescription: seo.ogDescription ?? '',
    ogImage: seo.ogImage ?? null,
    canonicalUrl: seo.canonicalUrl ?? '',
    noIndex: !!seo.noIndex,
    noFollow: !!seo.noFollow,
    structuredData: seo.structuredData ? JSON.stringify(seo.structuredData, null, 2) : '',
  };
}

export function seoStateToApi(state: SeoFormState): Record<string, any> | undefined {
  const payload: Record<string, any> = {};
  if (state.metaTitle) payload.metaTitle = state.metaTitle;
  if (state.metaDescription) payload.metaDescription = state.metaDescription;
  const keywords = state.metaKeywords.split(',').map((k) => k.trim()).filter(Boolean);
  if (keywords.length) payload.metaKeywords = keywords;
  if (state.ogTitle) payload.ogTitle = state.ogTitle;
  if (state.ogDescription) payload.ogDescription = state.ogDescription;
  if (state.ogImage) payload.ogImage = state.ogImage;
  if (state.canonicalUrl) payload.canonicalUrl = state.canonicalUrl;
  if (state.noIndex) payload.noIndex = true;
  if (state.noFollow) payload.noFollow = true;
  if (state.structuredData?.trim()) {
    try {
      payload.structuredData = JSON.parse(state.structuredData);
    } catch {
      // ignore invalid JSON – user will see an error elsewhere
    }
  }
  return Object.keys(payload).length ? payload : undefined;
}

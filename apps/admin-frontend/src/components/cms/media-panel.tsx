'use client';

import ImageUploadField from '@/components/image-upload-field';
import GalleryUploadField from '@/components/gallery-upload-field';

export interface MediaFormState {
  bannerImage: string | null;
  cardImage: string | null;
  ogImage: string | null; // optional; SEO panel also manages this
  galleryImages: string[];
  altText: string;
  cardImageAlt: string;
}

interface MediaPanelProps {
  value: MediaFormState;
  onChange: (next: MediaFormState) => void;
  category: string;
  showOgImage?: boolean;
}

const inputCls = 'w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]';

export default function MediaPanel({ value, onChange, category, showOgImage }: MediaPanelProps) {
  function update<K extends keyof MediaFormState>(key: K, v: MediaFormState[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
      <div>
        <h3 className="font-display font-semibold text-lg text-ht-text">Media</h3>
        <p className="font-body text-xs text-ht-muted">Images are auto-converted to high-quality WebP on upload and served from the CDN.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <ImageUploadField
          label="Banner image (hero, 1920×1080 recommended)"
          value={value.bannerImage}
          onChange={(url) => update('bannerImage', url)}
          category={category}
        />
        <ImageUploadField
          label="Card image (listing, 800×600 recommended)"
          value={value.cardImage}
          onChange={(url) => update('cardImage', url)}
          category={category}
        />
      </div>

      {showOgImage && (
        <ImageUploadField
          label="OG image (social share, 1200×630 recommended)"
          value={value.ogImage}
          onChange={(url) => update('ogImage', url)}
          category={category}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm text-ht-soft mb-1.5">Banner alt text</label>
          <input type="text" value={value.altText}
            onChange={(e) => update('altText', e.target.value)}
            className={inputCls} placeholder="Describe the banner image for accessibility" />
        </div>
        <div>
          <label className="block font-body text-sm text-ht-soft mb-1.5">Card alt text</label>
          <input type="text" value={value.cardImageAlt}
            onChange={(e) => update('cardImageAlt', e.target.value)}
            className={inputCls} placeholder="Describe the card image" />
        </div>
      </div>

      <GalleryUploadField
        label="Gallery images"
        value={value.galleryImages}
        onChange={(urls) => update('galleryImages', urls)}
        category={category}
        hint="Showcase the experience. First image is used as fallback cover."
      />
    </div>
  );
}

export function defaultMediaState(): MediaFormState {
  return {
    bannerImage: null,
    cardImage: null,
    ogImage: null,
    galleryImages: [],
    altText: '',
    cardImageAlt: '',
  };
}

export function mediaStateFromApi(media: any): MediaFormState {
  if (!media) return defaultMediaState();
  return {
    bannerImage: media.bannerImage ?? null,
    cardImage: media.cardImage ?? null,
    ogImage: media.ogImage ?? null,
    galleryImages: Array.isArray(media.galleryImages) ? media.galleryImages : [],
    altText: media.altText ?? '',
    cardImageAlt: media.cardImageAlt ?? '',
  };
}

export function mediaStateToApi(state: MediaFormState): Record<string, any> | undefined {
  const payload: Record<string, any> = {};
  if (state.bannerImage) payload.bannerImage = state.bannerImage;
  if (state.cardImage) payload.cardImage = state.cardImage;
  if (state.ogImage) payload.ogImage = state.ogImage;
  if (state.galleryImages.length) payload.galleryImages = state.galleryImages;
  if (state.altText) payload.altText = state.altText;
  if (state.cardImageAlt) payload.cardImageAlt = state.cardImageAlt;
  return Object.keys(payload).length ? payload : undefined;
}

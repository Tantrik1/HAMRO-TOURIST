'use client';

import { useRef, useState } from 'react';
import { uploadImage } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

interface GalleryUploadFieldProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
  category: string;
  hint?: string;
}

export default function GalleryUploadField({ label, value, onChange, category, hint }: GalleryUploadFieldProps) {
  const user = useAuthStore((s) => s.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingCount, setUploadingCount] = useState(0);
  const [error, setError] = useState('');

  async function handleFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    if (!user?.tenantSlug) { setError('Tenant not available'); return; }

    setError('');
    setUploadingCount(files.length);

    try {
      const urls = await Promise.all(
        files.map((f) => uploadImage(f, user.tenantSlug!, category)),
      );
      onChange([...value, ...urls]);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploadingCount(0);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function removeAt(idx: number) {
    onChange(value.filter((_, i) => i !== idx));
  }

  function move(idx: number, dir: -1 | 1) {
    const next = [...value];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block font-body text-sm text-ht-soft">{label}</label>
        <span className="text-xs font-mono text-ht-muted">{value.length} image{value.length === 1 ? '' : 's'}</span>
      </div>

      {hint && <p className="text-xs text-ht-muted font-body mb-3">{hint}</p>}

      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4">
          {value.map((url, idx) => (
            <div key={`${url}-${idx}`} className="relative group rounded-xl overflow-hidden border border-ht-border bg-ht-surface2 aspect-square">
              <img src={url} alt={`gallery ${idx + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0}
                  className="w-7 h-7 rounded-lg bg-ht-surface border border-ht-border text-ht-text flex items-center justify-center hover:border-ht-violet disabled:opacity-30 disabled:cursor-not-allowed">‹</button>
                <button type="button" onClick={() => move(idx, 1)} disabled={idx === value.length - 1}
                  className="w-7 h-7 rounded-lg bg-ht-surface border border-ht-border text-ht-text flex items-center justify-center hover:border-ht-violet disabled:opacity-30 disabled:cursor-not-allowed">›</button>
                <button type="button" onClick={() => removeAt(idx)}
                  className="w-7 h-7 rounded-lg bg-ht-rose/20 border border-ht-rose/50 text-ht-rose flex items-center justify-center hover:bg-ht-rose/40">×</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFilesChange} className="hidden" />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploadingCount > 0}
        className="px-4 py-2 rounded-lg font-body text-sm text-ht-text border border-dashed border-ht-border hover:border-ht-violet hover:text-ht-violet transition-all min-h-[36px] disabled:opacity-50 w-full">
        {uploadingCount > 0 ? `Uploading ${uploadingCount} image${uploadingCount === 1 ? '' : 's'}...` : '+ Add images (you can select multiple)'}
      </button>

      {error && <p className="mt-2 text-xs text-ht-rose font-body">{error}</p>}
    </div>
  );
}

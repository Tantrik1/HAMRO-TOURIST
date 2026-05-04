'use client';

import { useState, useRef } from 'react';
import { uploadImage } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

interface ImageUploadFieldProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  category: string;
  accept?: string;
}

export default function ImageUploadField({ label, value, onChange, category, accept = 'image/*' }: ImageUploadFieldProps) {
  const user = useAuthStore((s) => s.user);
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(value);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!user?.tenantSlug) {
      setError('Tenant not available');
      return;
    }

    setError('');
    setUploading(true);

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const cdnUrl = await uploadImage(file, user.tenantSlug, category);
      setPreview(cdnUrl);
      onChange(cdnUrl);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      // Revert preview to original value
      setPreview(value);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <label className="block font-body text-sm text-ht-soft mb-1.5">{label}</label>

      <div className="flex items-center gap-4">
        {(preview || value) ? (
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-ht-border bg-ht-surface2 shrink-0">
            <img
              src={preview || value || undefined}
              alt={label}
              className="w-full h-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <div className="w-24 h-24 rounded-xl border border-dashed border-ht-border bg-ht-surface2 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-ht-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-2.002-2.002l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M4.5 21h15M12 3.75V21" />
            </svg>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 rounded-lg font-body text-sm text-ht-text border border-ht-border hover:border-ht-violet hover:text-ht-violet transition-all min-h-[36px] disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : value ? 'Change image' : 'Upload image'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => { onChange(null); setPreview(null); }}
              className="px-4 py-2 rounded-lg font-body text-sm text-ht-rose hover:text-ht-rose/80 transition-all min-h-[36px] text-left"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-ht-rose font-body">{error}</p>}
    </div>
  );
}

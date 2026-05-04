'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/api';

export default function NewContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', source: 'manual' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await apiPost('/crm/contacts', form);
    setLoading(false);

    if (res.success) {
      router.push('/dashboard/crm');
    } else {
      setError('error' in res ? res.error.message : 'Failed to create contact');
    }
  }

  return (
    <div>
      <div className="mb-8">
        <a href="/dashboard/crm" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to CRM
        </a>
        <h1 className="font-display font-bold text-3xl text-ht-text mt-2">New Contact</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>
        )}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block font-body text-sm text-ht-soft mb-1.5">Source</label>
              <input
                type="text"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
                placeholder="manual"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Contact'}
          </button>
          <a
            href="/dashboard/crm"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

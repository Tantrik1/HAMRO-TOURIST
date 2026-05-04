'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

export default function NewDomainPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.tenantSlug || !domain) return;
    setError('');
    setLoading(true);

    const res = await apiPost('/domains', { tenantSlug: user.tenantSlug, domain });
    setLoading(false);

    if (res.success) {
      router.push('/dashboard/domains');
    } else {
      setError('error' in res ? res.error.message : 'Failed to add domain');
    }
  }

  return (
    <div>
      <div className="mb-8">
        <a href="/dashboard/domains" className="font-body text-sm text-ht-soft hover:text-ht-violet transition-colors">
          ← Back to Domains
        </a>
        <h1 className="font-display font-bold text-3xl text-ht-text mt-2">Add Custom Domain</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="px-4 py-3 rounded-xl bg-ht-rose/10 border border-ht-rose/30 text-ht-rose text-sm font-body">{error}</div>
        )}

        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6 space-y-5">
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Domain *</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="travel.yourdomain.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-ht-ink border border-ht-border text-ht-text font-body text-sm placeholder-[#5C5C78] focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
            />
            <p className="font-body text-xs text-ht-soft mt-2">
              Enter your custom domain name. You'll need to add a CNAME record to your DNS after adding the domain.
            </p>
          </div>

          <div className="bg-ht-ink border border-ht-border rounded-xl p-4">
            <p className="font-body text-xs text-ht-soft mb-2">Default subdomain</p>
            <p className="font-mono text-sm text-ht-text">
              {user?.tenantSlug ? `${user.tenantSlug}.hamrotourist.com` : 'Not configured'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !domain}
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[48px] disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add Domain'}
          </button>
          <a
            href="/dashboard/domains"
            className="px-8 py-3 rounded-full font-body font-semibold text-base text-ht-soft border border-ht-border hover:border-ht-violet hover:text-ht-text transition-all duration-200 min-h-[48px] flex items-center"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}

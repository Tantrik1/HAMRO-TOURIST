'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPost, apiDelete } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

interface Domain {
  id: string;
  domain: string;
  verificationStatus: string;
  cnameTarget: string | null;
  sslStatus: string | null;
  failureReason: string | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  pending: 'bg-[#F97316]/15 text-[#F97316] border-[#F97316]/30',
  verifying: 'bg-[#06B6D4]/15 text-[#06B6D4] border-[#06B6D4]/30',
  active: 'bg-[#84CC16]/15 text-[#84CC16] border-[#84CC16]/30',
  failed: 'bg-ht-rose/15 text-ht-rose border-ht-rose/30',
};

export default function DomainsPage() {
  const user = useAuthStore((s) => s.user);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!user?.tenantSlug) { setLoading(false); return; }
      const res = await apiGet<Domain[]>(`/domains/tenant/${user.tenantSlug}`);
      setDomains(res.success ? res.data : []);
      setLoading(false);
    }
    load();
  }, [user?.tenantSlug]);

  async function handleDelete(id: string) {
    if (!confirm('Remove this domain?')) return;
    const res = await apiDelete(`/domains/${id}`);
    if (res.success) setDomains((prev) => prev.filter((d) => d.id !== id));
  }

  async function handleVerify(id: string) {
    await apiGet(`/domains/${id}/verify`);
    // Reload
    if (user?.tenantSlug) {
      const res = await apiGet<Domain[]>(`/domains/tenant/${user.tenantSlug}`);
      if (res.success) setDomains(res.data);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">Custom Domains</h1>
        <p className="font-body text-ht-soft mt-1">Connect your own domain to your agency website.</p>
      </div>

      {/* Default subdomain */}
      <div className="bg-ht-surface border border-ht-border rounded-xl2 p-5 mb-6">
        <p className="font-body text-sm text-ht-soft mb-1">Default subdomain</p>
        <p className="font-mono text-base text-ht-text">
          {user?.tenantSlug ? `${user.tenantSlug}.hamrotourist.com` : 'Not configured'}
        </p>
      </div>

      {/* Add domain button */}
      <a
        href="/dashboard/domains/new"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm text-white bg-grad-primary hover:shadow-glow-violet transition-all duration-200 min-h-[44px] mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        Add Domain
      </a>

      {/* Domain list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => <div key={i} className="h-20 bg-ht-surface border border-ht-border rounded-xl2 animate-pulse" />)}
        </div>
      ) : domains.length === 0 ? (
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-12 text-center">
          <p className="font-body text-ht-soft">No custom domains added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {domains.map((d) => (
            <div key={d.id} className="bg-ht-surface border border-ht-border rounded-xl2 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <p className="font-mono text-base text-ht-text">{d.domain}</p>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${statusColors[d.verificationStatus] || statusColors.pending}`}>
                    <span className="w-1 h-1 rounded-full bg-current" />{d.verificationStatus}
                  </span>
                </div>
                <div className="flex gap-2">
                  {d.verificationStatus !== 'active' && (
                    <button onClick={() => handleVerify(d.id)} className="px-3 py-1.5 rounded-lg font-body text-xs text-[#06B6D4] hover:bg-[#06B6D4]/10 transition-all min-h-[32px]">
                      Check Status
                    </button>
                  )}
                  <button onClick={() => handleDelete(d.id)} className="px-3 py-1.5 rounded-lg font-body text-xs text-ht-rose/70 hover:text-ht-rose hover:bg-ht-rose/10 transition-all min-h-[32px]">
                    Remove
                  </button>
                </div>
              </div>

              {d.cnameTarget && d.verificationStatus !== 'active' && (
                <div className="bg-ht-ink border border-ht-border rounded-xl p-4">
                  <p className="font-body text-xs text-ht-soft mb-2">Add this CNAME record to your DNS:</p>
                  <div className="flex gap-6">
                    <div>
                      <p className="font-body text-[10px] text-ht-soft uppercase">Name</p>
                      <p className="font-mono text-sm text-ht-text">{d.domain.split('.')[0]}</p>
                    </div>
                    <div>
                      <p className="font-body text-[10px] text-ht-soft uppercase">Target</p>
                      <p className="font-mono text-sm text-[#06B6D4]">{d.cnameTarget}</p>
                    </div>
                  </div>
                </div>
              )}

              {d.failureReason && (
                <p className="font-body text-xs text-ht-rose mt-2">{d.failureReason}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';

interface Subscription {
  id: string;
  tenantSlug: string;
  plan: string;
  status: string;
  stripePriceId: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
}

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function load() {
      const res = await apiGet<Subscription[]>(`/billing/subscriptions?page=${page}&limit=20`);
      if (res.success) {
        setSubs(res.data);
        setTotal(res.meta?.total || 0);
      }
    }
    load();
  }, [page]);

  const statusColors: Record<string, string> = {
    active: 'bg-ht-lime/15 text-ht-lime border-ht-lime/30',
    past_due: 'bg-ht-coral/15 text-ht-coral border-ht-coral/30',
    canceled: 'bg-ht-muted/30 text-ht-soft border-ht-border',
    trialing: 'bg-ht-cyan/15 text-ht-cyan border-ht-cyan/30',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">Subscriptions</h1>
        <p className="font-body text-ht-soft mt-1">{total} active subscriptions</p>
      </div>

      <div className="bg-ht-surface border border-ht-border rounded-xl2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ht-border">
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Renews</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ht-border">
              {subs.map((s) => (
                <tr key={s.id} className="hover:bg-ht-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-ht-text">{s.tenantSlug}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-ht-violet bg-ht-violet/10 px-2 py-1 rounded-full uppercase">{s.plan}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${statusColors[s.status] || statusColors.active}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {s.status}{s.cancelAtPeriodEnd ? ' (canceling)' : ''}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-ht-soft">{formatDate(s.currentPeriodEnd)}</td>
                  <td className="px-6 py-4 font-body text-sm text-ht-soft">{formatDate(s.createdAt)}</td>
                </tr>
              ))}
              {subs.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center font-body text-ht-soft">No subscriptions yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPatch, apiDelete } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface Tenant {
  id: string;
  slug: string;
  companyName: string;
  plan: string;
  status: string;
  customDomain: string | null;
  published: boolean;
  createdAt: string;
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadTenants = async () => {
    const res = await apiGet<Tenant[]>(`/tenants/admin/tenants?page=${page}&limit=20&search=${search}`);
    if (res.success) {
      setTenants(res.data);
      setTotal(res.meta?.total || 0);
    }
  };

  useEffect(() => { loadTenants(); }, [page, search]);

  const handleSuspend = async (slug: string) => {
    await apiPatch(`/tenants/admin/tenants/${slug}/suspend`, {});
    loadTenants();
  };

  const handleActivate = async (slug: string) => {
    await apiPatch(`/tenants/admin/tenants/${slug}/activate`, {});
    loadTenants();
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete tenant "${slug}"? This cannot be undone.`)) return;
    await apiDelete(`/tenants/admin/tenants/${slug}`);
    loadTenants();
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-ht-lime/15 text-ht-lime border-ht-lime/30',
      suspended: 'bg-ht-rose/15 text-ht-rose border-ht-rose/30',
      deleted: 'bg-ht-muted/30 text-ht-soft border-ht-border',
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${colors[status] || colors.active}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {status}
      </span>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ht-text">Tenants</h1>
          <p className="font-body text-ht-soft mt-1">{total} agencies registered</p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or slug..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-md px-4 py-3 bg-ht-surface2 border border-ht-border rounded-xl font-body text-sm text-ht-text placeholder:text-ht-soft/50 focus:outline-none focus:border-ht-coral transition-colors min-h-[44px]"
        />
      </div>

      <div className="bg-ht-surface border border-ht-border rounded-xl2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ht-border">
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Agency</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Slug</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Plan</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Created</th>
                <th className="px-6 py-4 text-right font-body text-xs text-ht-soft uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ht-border">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-ht-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-body text-sm text-ht-text">{t.companyName}</td>
                  <td className="px-6 py-4 font-mono text-sm text-ht-soft">{t.slug}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-ht-violet bg-ht-violet/10 px-2 py-1 rounded-full">{t.plan || 'free'}</span>
                  </td>
                  <td className="px-6 py-4">{statusBadge(t.status || 'active')}</td>
                  <td className="px-6 py-4 font-body text-sm text-ht-soft">{formatDate(t.createdAt)}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {t.status !== 'suspended' ? (
                      <button onClick={() => handleSuspend(t.slug)} className="font-body text-xs text-ht-coral hover:text-ht-rose transition-colors">
                        Suspend
                      </button>
                    ) : (
                      <button onClick={() => handleActivate(t.slug)} className="font-body text-xs text-ht-lime hover:text-ht-lime transition-colors">
                        Activate
                      </button>
                    )}
                    <button onClick={() => handleDelete(t.slug)} className="font-body text-xs text-ht-rose/60 hover:text-ht-rose transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {tenants.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center font-body text-ht-soft">No tenants found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {total > 20 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Prev</button>
          <span className="px-4 py-2 font-mono text-sm text-ht-text">Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={tenants.length < 20} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}

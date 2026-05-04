'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPatch } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface PlatformUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tenantSlug: string | null;
  isEmailVerified: boolean;
  isBanned: boolean;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loadUsers = async () => {
    const res = await apiGet<PlatformUser[]>(`/tenants/admin/users?page=${page}&limit=20&search=${search}`);
    if (res.success) {
      setUsers(res.data);
      setTotal(res.meta?.total || 0);
    }
  };

  useEffect(() => { loadUsers(); }, [page, search]);

  const handleBan = async (id: string) => {
    await apiPatch(`/tenants/admin/users/${id}/ban`, {});
    loadUsers();
  };

  const handleUnban = async (id: string) => {
    await apiPatch(`/tenants/admin/users/${id}/unban`, {});
    loadUsers();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-ht-text">Users</h1>
          <p className="font-body text-ht-soft mt-1">{total} users on platform</p>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email or name..."
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
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-right font-body text-xs text-ht-soft uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ht-border">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-ht-surface2/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-ht-text">{u.firstName} {u.lastName}</p>
                    <p className="font-mono text-xs text-ht-soft">{u.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-ht-cyan bg-ht-cyan/10 px-2 py-1 rounded-full">{u.role}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-ht-soft">{u.tenantSlug || '—'}</td>
                  <td className="px-6 py-4">
                    {u.isBanned ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border bg-ht-rose/15 text-ht-rose border-ht-rose/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" /> banned
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border bg-ht-lime/15 text-ht-lime border-ht-lime/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-current" /> active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-ht-soft">{formatDate(u.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    {u.role !== 'platform_admin' && (
                      u.isBanned ? (
                        <button onClick={() => handleUnban(u.id)} className="font-body text-xs text-ht-lime hover:text-ht-lime transition-colors">Unban</button>
                      ) : (
                        <button onClick={() => handleBan(u.id)} className="font-body text-xs text-ht-rose hover:text-ht-rose transition-colors">Ban</button>
                      )
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center font-body text-ht-soft">No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {total > 20 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Prev</button>
          <span className="px-4 py-2 font-mono text-sm text-ht-text">Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={users.length < 20} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}

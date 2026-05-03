'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import { formatDateTime } from '@/lib/utils';

interface AuditLog {
  id: string;
  userId: string | null;
  tenantSlug: string | null;
  action: string;
  entityType: string | null;
  entityId: string | null;
  details: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
}

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionFilter, setActionFilter] = useState('');

  useEffect(() => {
    async function load() {
      const params = new URLSearchParams({ page: String(page), limit: '30' });
      if (actionFilter) params.set('action', actionFilter);
      const res = await apiGet<AuditLog[]>(`/tenants/admin/audit-logs?${params}`);
      if (res.success) {
        setLogs(res.data);
        setTotal(res.meta?.total || 0);
      }
    }
    load();
  }, [page, actionFilter]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">Audit Logs</h1>
        <p className="font-body text-ht-soft mt-1">{total} log entries</p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by action (e.g. tenant.created, user.login)..."
          value={actionFilter}
          onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}
          className="w-full max-w-md px-4 py-3 bg-ht-surface2 border border-ht-border rounded-xl font-body text-sm text-ht-text placeholder:text-ht-soft/50 focus:outline-none focus:border-ht-coral transition-colors min-h-[44px]"
        />
      </div>

      <div className="bg-ht-surface border border-ht-border rounded-xl2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ht-border">
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Entity</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ht-border">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-ht-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-ht-soft whitespace-nowrap">{formatDateTime(log.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-ht-cyan bg-ht-cyan/10 px-2 py-1 rounded">{log.action}</span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-ht-soft">
                    {log.entityType && <>{log.entityType}:{log.entityId?.slice(0, 8)}</>}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-ht-soft">{log.tenantSlug || '—'}</td>
                  <td className="px-6 py-4 font-mono text-xs text-ht-soft">{log.ipAddress || '—'}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center font-body text-ht-soft">No logs found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {total > 30 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Prev</button>
          <span className="px-4 py-2 font-mono text-sm text-ht-text">Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={logs.length < 30} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}

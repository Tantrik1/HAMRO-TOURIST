'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiPost } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: string;
  tenantSlug: string | null;
  subscribedAt: string;
}

interface NewsletterStats {
  totalSubscribed: number;
  totalUnsubscribed: number;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<NewsletterStats>({ totalSubscribed: 0, totalUnsubscribed: 0 });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCompose, setShowCompose] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const loadSubscribers = async () => {
    const res = await apiGet<Subscriber[]>(`/notifications/newsletter/subscribers?page=${page}&limit=20`);
    if (res.success) {
      setSubscribers(res.data);
      setTotal(res.meta?.total || 0);
    }
  };

  const loadStats = async () => {
    const res = await apiGet<NewsletterStats>('/notifications/newsletter/stats');
    if (res.success) setStats(res.data);
  };

  useEffect(() => { loadSubscribers(); loadStats(); }, [page]);

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm('Send this newsletter to all subscribers?')) return;
    setSending(true);
    await apiPost('/notifications/newsletter/broadcast', { subject, body });
    setSending(false);
    setShowCompose(false);
    setSubject('');
    setBody('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ht-text">Newsletter</h1>
          <p className="font-body text-ht-soft mt-1">{stats.totalSubscribed} subscribers</p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="px-5 py-2.5 bg-grad-primary text-white font-body font-semibold rounded-full hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[44px]"
        >
          {showCompose ? 'Cancel' : 'Compose Broadcast'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-5">
          <p className="font-body text-sm text-ht-soft">Subscribed</p>
          <p className="font-mono text-3xl text-ht-lime mt-1">{stats.totalSubscribed}</p>
        </div>
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-5">
          <p className="font-body text-sm text-ht-soft">Unsubscribed</p>
          <p className="font-mono text-3xl text-ht-rose mt-1">{stats.totalUnsubscribed}</p>
        </div>
      </div>

      {/* Compose */}
      {showCompose && (
        <form onSubmit={handleSendBroadcast} className="bg-ht-surface border border-ht-border rounded-xl2 p-6 mb-6 space-y-4">
          <h2 className="font-display font-bold text-xl text-ht-text">Compose Newsletter</h2>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-4 py-3 bg-ht-surface2 border border-ht-border rounded-xl font-body text-sm text-ht-text focus:outline-none focus:border-ht-violet transition-colors min-h-[44px]"
              placeholder="Newsletter subject..."
            />
          </div>
          <div>
            <label className="block font-body text-sm text-ht-soft mb-1.5">Body (HTML supported)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              rows={8}
              className="w-full px-4 py-3 bg-ht-surface2 border border-ht-border rounded-xl font-body text-sm text-ht-text focus:outline-none focus:border-ht-violet transition-colors resize-y"
              placeholder="Write your newsletter content..."
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="px-6 py-2.5 bg-grad-warm text-white font-body font-semibold rounded-full hover:shadow-glow-coral transition-all duration-200 disabled:opacity-50 min-h-[44px]"
          >
            {sending ? 'Sending...' : `Send to ${stats.totalSubscribed} subscribers`}
          </button>
        </form>
      )}

      {/* Subscribers table */}
      <div className="bg-ht-surface border border-ht-border rounded-xl2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ht-border">
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Tenant</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Subscribed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ht-border">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-ht-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-ht-text">{s.email}</td>
                  <td className="px-6 py-4 font-body text-sm text-ht-soft">{s.name || '—'}</td>
                  <td className="px-6 py-4 font-mono text-xs text-ht-soft">{s.tenantSlug || 'platform'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border ${
                      s.status === 'subscribed' ? 'bg-ht-lime/15 text-ht-lime border-ht-lime/30' : 'bg-ht-muted/30 text-ht-soft border-ht-border'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-ht-soft">{formatDate(s.subscribedAt)}</td>
                </tr>
              ))}
              {subscribers.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-12 text-center font-body text-ht-soft">No subscribers yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {total > 20 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Prev</button>
          <span className="px-4 py-2 font-mono text-sm text-ht-text">Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={subscribers.length < 20} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import { formatPrice, formatDate } from '@/lib/utils';

interface BookingOverview {
  id: string;
  bookingNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  totalAmount: number;
  currency: string;
  travelDate: string;
  tenantSlug: string;
  createdAt: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingOverview[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    async function load() {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);
      const res = await apiGet<BookingOverview[]>(`/tenants/admin/bookings?${params}`);
      if (res.success) {
        setBookings(res.data);
        setTotal(res.meta?.total || 0);
      }
    }
    load();
  }, [page, statusFilter]);

  const statusColors: Record<string, string> = {
    inquiry: 'bg-ht-cyan/15 text-ht-cyan border-ht-cyan/30',
    confirmed: 'bg-ht-violet/15 text-ht-violet border-ht-violet/30',
    deposit_paid: 'bg-ht-coral/15 text-ht-coral border-ht-coral/30',
    fully_paid: 'bg-ht-lime/15 text-ht-lime border-ht-lime/30',
    completed: 'bg-ht-lime/15 text-ht-lime border-ht-lime/30',
    cancelled: 'bg-ht-rose/15 text-ht-rose border-ht-rose/30',
    refunded: 'bg-ht-muted/30 text-ht-soft border-ht-border',
  };

  const statuses = ['', 'inquiry', 'confirmed', 'deposit_paid', 'fully_paid', 'completed', 'cancelled'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">Bookings</h1>
        <p className="font-body text-ht-soft mt-1">{total} bookings across all agencies</p>
      </div>

      <div className="mb-6 flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => { setStatusFilter(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-full font-body text-xs border transition-all ${
              statusFilter === s
                ? 'bg-ht-coral/15 text-ht-coral border-ht-coral/30'
                : 'bg-ht-surface2 text-ht-soft border-ht-border hover:border-ht-coral/30'
            }`}
          >
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="bg-ht-surface border border-ht-border rounded-xl2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ht-border">
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Booking</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Agency</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-body text-xs text-ht-soft uppercase tracking-wider">Travel Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ht-border">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-ht-surface2/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-ht-text">{b.bookingNumber}</td>
                  <td className="px-6 py-4">
                    <p className="font-body text-sm text-ht-text">{b.customerName}</p>
                    <p className="font-mono text-xs text-ht-soft">{b.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-ht-soft">{b.tenantSlug}</td>
                  <td className="px-6 py-4 font-mono text-sm text-ht-text">{formatPrice(b.totalAmount, b.currency)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${statusColors[b.status] || ''}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {b.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-body text-sm text-ht-soft">{formatDate(b.travelDate)}</td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center font-body text-ht-soft">No bookings found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {total > 20 && (
        <div className="flex justify-center gap-2 mt-6">
          <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Prev</button>
          <span className="px-4 py-2 font-mono text-sm text-ht-text">Page {page}</span>
          <button onClick={() => setPage(page + 1)} disabled={bookings.length < 20} className="px-4 py-2 bg-ht-surface2 border border-ht-border rounded-lg font-body text-sm text-ht-soft disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}

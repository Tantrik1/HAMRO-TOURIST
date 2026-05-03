'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import { formatPrice } from '@/lib/utils';

interface PlatformStats {
  totalTenants: number;
  activeTenants: number;
  suspendedTenants: number;
  totalUsers: number;
  totalSubscriptions: number;
  monthlyRevenue: number;
  planBreakdown: { free: number; pro: number; business: number; enterprise: number };
}

const defaultStats: PlatformStats = {
  totalTenants: 0, activeTenants: 0, suspendedTenants: 0,
  totalUsers: 0, totalSubscriptions: 0, monthlyRevenue: 0,
  planBreakdown: { free: 0, pro: 0, business: 0, enterprise: 0 },
};

export default function DashboardPage() {
  const [stats, setStats] = useState<PlatformStats>(defaultStats);

  useEffect(() => {
    async function load() {
      const res = await apiGet<PlatformStats>('/tenants/admin/stats');
      if (res.success) setStats(res.data);
    }
    load();
  }, []);

  const cards = [
    { label: 'Total Tenants', value: stats.totalTenants, color: 'text-ht-violet', bg: 'bg-ht-violet/10' },
    { label: 'Active Tenants', value: stats.activeTenants, color: 'text-ht-lime', bg: 'bg-ht-lime/10' },
    { label: 'Total Users', value: stats.totalUsers, color: 'text-ht-cyan', bg: 'bg-ht-cyan/10' },
    { label: 'Monthly Revenue', value: formatPrice(stats.monthlyRevenue), color: 'text-ht-coral', bg: 'bg-ht-coral/10' },
  ];

  const planCards = [
    { plan: 'Free', count: stats.planBreakdown.free, color: 'border-ht-border' },
    { plan: 'Pro', count: stats.planBreakdown.pro, color: 'border-ht-violet/40' },
    { plan: 'Business', count: stats.planBreakdown.business, color: 'border-ht-cyan/40' },
    { plan: 'Enterprise', count: stats.planBreakdown.enterprise, color: 'border-ht-coral/40' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">Platform Overview</h1>
        <p className="font-body text-ht-soft mt-1">Monitor your entire SaaS platform.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-ht-surface border border-ht-border rounded-xl2 p-5 hover:border-ht-violet/40 transition-all duration-300">
            <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center mb-3`}>
              <div className={`w-3 h-3 rounded-full ${card.color} bg-current`} />
            </div>
            <p className="font-mono text-2xl font-medium text-ht-text">{card.value}</p>
            <p className="font-body text-sm text-ht-soft mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {planCards.map((p) => (
          <div key={p.plan} className={`bg-ht-surface border ${p.color} rounded-xl2 p-5`}>
            <p className="font-body text-sm text-ht-soft">{p.plan} Plan</p>
            <p className="font-mono text-3xl font-medium text-ht-text mt-2">{p.count}</p>
            <p className="font-body text-xs text-ht-soft mt-1">tenants</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/dashboard/tenants" className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 hover:border-ht-coral/40 transition-all duration-300">
          <h3 className="font-display font-bold text-lg text-ht-text mb-2 group-hover:text-ht-coral transition-colors">Manage Tenants</h3>
          <p className="font-body text-sm text-ht-soft">View, suspend, or activate agency accounts.</p>
        </a>
        <a href="/dashboard/subscriptions" className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 hover:border-ht-violet/40 transition-all duration-300">
          <h3 className="font-display font-bold text-lg text-ht-text mb-2 group-hover:text-ht-violet transition-colors">Subscriptions</h3>
          <p className="font-body text-sm text-ht-soft">Monitor billing, revenue, and plan changes.</p>
        </a>
        <a href="/dashboard/newsletter" className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 hover:border-ht-cyan/40 transition-all duration-300">
          <h3 className="font-display font-bold text-lg text-ht-text mb-2 group-hover:text-ht-cyan transition-colors">Newsletter</h3>
          <p className="font-body text-sm text-ht-soft">Send broadcasts to all subscribers.</p>
        </a>
      </div>
    </div>
  );
}

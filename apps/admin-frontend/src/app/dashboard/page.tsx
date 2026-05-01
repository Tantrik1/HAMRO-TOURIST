'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';
import { useAuthStore } from '@/store/auth-store';

interface DashboardStats {
  totalTours: number;
  totalTreks: number;
  totalActivities: number;
  totalPackages: number;
  totalLeads: number;
  websitePublished: boolean;
}

const defaultStats: DashboardStats = {
  totalTours: 0, totalTreks: 0, totalActivities: 0, totalPackages: 0, totalLeads: 0, websitePublished: false,
};

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const [stats, setStats] = useState<DashboardStats>(defaultStats);

  useEffect(() => {
    async function loadStats() {
      const [tours, treks, activities, packages] = await Promise.all([
        apiGet<any[]>('/products/tours'),
        apiGet<any[]>('/products/treks'),
        apiGet<any[]>('/products/activities'),
        apiGet<any[]>('/products/packages'),
      ]);
      setStats({
        totalTours: tours.success ? tours.data.length : 0,
        totalTreks: treks.success ? treks.data.length : 0,
        totalActivities: activities.success ? activities.data.length : 0,
        totalPackages: packages.success ? packages.data.length : 0,
        totalLeads: 0,
        websitePublished: false,
      });
    }
    loadStats();
  }, []);

  const statCards = [
    { label: 'Tours', value: stats.totalTours, color: 'text-ht-violet', bg: 'bg-ht-violet/10', icon: 'M3 21V3h18v18H3zm4-4h2v-6H7v6zm4 0h2V7h-2v10zm4 0h2v-4h-2v4z' },
    { label: 'Treks', value: stats.totalTreks, color: 'text-[#06B6D4]', bg: 'bg-[#06B6D4]/10', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
    { label: 'Activities', value: stats.totalActivities, color: 'text-[#F97316]', bg: 'bg-[#F97316]/10', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { label: 'Packages', value: stats.totalPackages, color: 'text-[#84CC16]', bg: 'bg-[#84CC16]/10', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">
          Welcome back, {user?.firstName}
        </h1>
        <p className="font-body text-ht-soft mt-1">Here&apos;s your agency overview.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-ht-surface border border-ht-border rounded-xl2 p-5 hover:border-ht-violet/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <svg className={`w-5 h-5 ${card.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                </svg>
              </div>
            </div>
            <p className="font-mono text-3xl font-medium text-ht-text">{card.value}</p>
            <p className="font-body text-sm text-ht-soft mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <a href="/dashboard/products/new" className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 hover:border-ht-violet/40 transition-all duration-300">
          <h3 className="font-display font-bold text-lg text-ht-text mb-2 group-hover:text-ht-violet transition-colors">Add New Tour</h3>
          <p className="font-body text-sm text-ht-soft">Create a new tour listing with itinerary and pricing.</p>
        </a>
        <a href="/dashboard/website" className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 hover:border-[#06B6D4]/40 transition-all duration-300">
          <h3 className="font-display font-bold text-lg text-ht-text mb-2 group-hover:text-[#06B6D4] transition-colors">Website Builder</h3>
          <p className="font-body text-sm text-ht-soft">Customize your theme, sections, and publish your site.</p>
        </a>
        <a href="/dashboard/crm" className="group bg-ht-surface border border-ht-border rounded-xl2 p-6 hover:border-[#F97316]/40 transition-all duration-300">
          <h3 className="font-display font-bold text-lg text-ht-text mb-2 group-hover:text-[#F97316] transition-colors">View Leads</h3>
          <p className="font-body text-sm text-ht-soft">Manage contacts and track your sales pipeline.</p>
        </a>
      </div>

      {/* Website Status */}
      <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
        <h2 className="font-display font-bold text-xl text-ht-text mb-4">Website Status</h2>
        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${
            stats.websitePublished
              ? 'bg-[#84CC16]/15 text-[#84CC16] border-[#84CC16]/30'
              : 'bg-ht-muted/30 text-ht-soft border-ht-border'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {stats.websitePublished ? 'Published' : 'Draft'}
          </span>
          <span className="font-body text-sm text-ht-soft">
            {user?.tenantSlug ? `${user.tenantSlug}.hamrotourist.com` : 'No subdomain set'}
          </span>
        </div>
      </div>
    </div>
  );
}

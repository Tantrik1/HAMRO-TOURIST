'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/lib/api';

interface AnalyticsData {
  totalProducts: number;
  publishedProducts: number;
  totalLeads: number;
  wonLeads: number;
  totalContacts: number;
  pipelineValue: number;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalProducts: 0, publishedProducts: 0, totalLeads: 0, wonLeads: 0, totalContacts: 0, pipelineValue: 0,
  });

  useEffect(() => {
    async function load() {
      const [tours, treks, activities, pipeline] = await Promise.all([
        apiGet<any[]>('/products/tours'),
        apiGet<any[]>('/products/treks'),
        apiGet<any[]>('/products/activities'),
        apiGet<any>('/crm/leads/pipeline/summary'),
      ]);

      const allProducts = [
        ...(tours.success ? tours.data : []),
        ...(treks.success ? treks.data : []),
        ...(activities.success ? activities.data : []),
      ];

      setData({
        totalProducts: allProducts.length,
        publishedProducts: allProducts.filter((p) => p.status === 'published').length,
        totalLeads: pipeline.success ? Object.values(pipeline.data.counts as Record<string, number>).reduce((a: number, b: number) => a + b, 0) : 0,
        wonLeads: pipeline.success ? (pipeline.data.counts?.won || 0) : 0,
        totalContacts: 0,
        pipelineValue: pipeline.success ? Object.values(pipeline.data.values as Record<string, number>).reduce((a: number, b: number) => a + b, 0) : 0,
      });
    }
    load();
  }, []);

  const cards = [
    { label: 'Total Products', value: data.totalProducts, color: 'text-ht-violet' },
    { label: 'Published', value: data.publishedProducts, color: 'text-[#84CC16]' },
    { label: 'Total Leads', value: data.totalLeads, color: 'text-[#06B6D4]' },
    { label: 'Won Deals', value: data.wonLeads, color: 'text-[#F97316]' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-ht-text">Analytics</h1>
        <p className="font-body text-ht-soft mt-1">Overview of your agency performance.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-ht-surface border border-ht-border rounded-xl2 p-5">
            <p className={`font-mono text-3xl font-medium ${card.color}`}>{card.value}</p>
            <p className="font-body text-sm text-ht-soft mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {data.pipelineValue > 0 && (
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-6">
          <h2 className="font-display font-bold text-xl text-ht-text mb-2">Pipeline Value</h2>
          <p className="font-mono text-4xl font-medium text-[#84CC16]">
            ${data.pipelineValue.toLocaleString()}
          </p>
          <p className="font-body text-sm text-ht-soft mt-1">Total value across all active leads</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { apiGet, apiDelete } from '@/lib/api';

type ProductType = 'tours' | 'treks' | 'activities' | 'packages';

interface Product {
  id: string;
  title: string;
  slug: string;
  status: string;
  coverImageUrl: string | null;
  difficulty?: string;
  durationDays?: number;
  basePrice?: number;
  type?: string;
}

const tabs: { label: string; value: ProductType }[] = [
  { label: 'Tours', value: 'tours' },
  { label: 'Treks', value: 'treks' },
  { label: 'Activities', value: 'activities' },
  { label: 'Packages', value: 'packages' },
];

const statusBadge: Record<string, string> = {
  published: 'bg-[#84CC16]/15 text-[#84CC16] border-[#84CC16]/30',
  draft: 'bg-ht-muted/30 text-ht-soft border-ht-border',
  archived: 'bg-ht-rose/15 text-ht-rose border-ht-rose/30',
};

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<ProductType>('tours');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await apiGet<Product[]>(`/products/${activeTab}`);
      setProducts(res.success ? res.data : []);
      setLoading(false);
    }
    load();
  }, [activeTab]);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this?')) return;
    const res = await apiDelete(`/products/${activeTab}/${id}`);
    if (res.success) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-3xl text-ht-text">Products</h1>
          <p className="font-body text-ht-soft mt-1">Manage your tours, treks, activities, and packages.</p>
        </div>
        <a
          href={`/dashboard/products/new?type=${activeTab}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm text-white bg-grad-primary hover:shadow-glow-violet hover:scale-[1.02] transition-all duration-200 min-h-[44px]"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add {activeTab.slice(0, -1)}
        </a>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-ht-surface border border-ht-border rounded-xl p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg font-body text-sm transition-all duration-200 min-h-[36px] ${
              activeTab === tab.value
                ? 'bg-ht-violet text-white'
                : 'text-ht-soft hover:text-ht-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-ht-surface border border-ht-border rounded-xl2 p-5 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-ht-surface2" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 bg-ht-surface2 rounded" />
                  <div className="h-3 w-32 bg-ht-surface2 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-ht-surface border border-ht-border rounded-xl2 p-12 text-center">
          <p className="font-body text-ht-soft mb-4">No {activeTab} yet.</p>
          <a href={`/dashboard/products/new?type=${activeTab}`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body font-semibold text-sm text-white bg-grad-primary hover:shadow-glow-violet transition-all duration-200">
            Create your first {activeTab.slice(0, -1)}
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="bg-ht-surface border border-ht-border rounded-xl2 p-5 hover:border-ht-violet/40 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-ht-surface2 overflow-hidden shrink-0">
                  {product.coverImageUrl ? (
                    <img src={product.coverImageUrl} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ht-violet/20 to-[#06B6D4]/20">
                      <svg className="w-6 h-6 text-ht-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-base text-ht-text truncate">{product.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${statusBadge[product.status] || statusBadge.draft}`}>
                      <span className="w-1 h-1 rounded-full bg-current" />
                      {product.status}
                    </span>
                    {product.difficulty && <span className="font-body text-xs text-ht-soft capitalize">{product.difficulty}</span>}
                    {product.durationDays && <span className="font-body text-xs text-ht-soft">{product.durationDays}d</span>}
                    {product.basePrice != null && <span className="font-mono text-xs text-[#F97316]">${product.basePrice}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href={`/dashboard/products/${product.id}?type=${activeTab}`}
                    className="px-3 py-1.5 rounded-lg font-body text-xs text-ht-soft hover:text-ht-text hover:bg-ht-surface2 transition-all min-h-[32px] flex items-center">
                    Edit
                  </a>
                  <button onClick={() => handleDelete(product.id)}
                    className="px-3 py-1.5 rounded-lg font-body text-xs text-ht-rose/70 hover:text-ht-rose hover:bg-ht-rose/10 transition-all min-h-[32px]">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

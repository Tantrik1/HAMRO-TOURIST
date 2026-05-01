'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { Sidebar } from '@/components/layout/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-ht-ink">
        <Sidebar />
        <main className="lg:pl-64">
          <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

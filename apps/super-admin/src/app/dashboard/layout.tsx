'use client';

import { ProtectedRoute } from '@/components/protected-route';
import { AdminShell } from '@/components/layout/admin-shell';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminShell>{children}</AdminShell>
    </ProtectedRoute>
  );
}

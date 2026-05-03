'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/auth?mode=login');
      return;
    }
    if (isAuthenticated && user && !user.tenantSlug && !pathname.startsWith('/onboarding')) {
      router.push('/onboarding');
    }
  }, [isAuthenticated, isLoading, user, pathname, router]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}

'use client';

// Legacy /login route — redirect to the unified /auth flow so bookmarks still work.
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/auth?mode=login');
  }, [router]);
  return null;
}

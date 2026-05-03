'use client';

// Legacy /register route — redirect to the unified /auth?mode=signup flow.
// The old page asked for a "companyName" that was silently dropped, which was
// confusing; the new /auth flow routes users to the onboarding wizard instead.
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/auth?mode=signup');
  }, [router]);
  return null;
}

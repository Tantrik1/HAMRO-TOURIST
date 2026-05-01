import { cookies, headers } from 'next/headers';

export async function getTenantSlug(): Promise<string> {
  const headersList = await headers();
  const slug = headersList.get('x-tenant-slug');
  if (slug) return slug;

  const cookieStore = await cookies();
  return cookieStore.get('tenant-slug')?.value || 'demo';
}

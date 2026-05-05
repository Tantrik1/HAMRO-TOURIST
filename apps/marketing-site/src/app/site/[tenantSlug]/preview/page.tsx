export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { fetchSiteData } from '@/lib/site-api';
import { SiteRenderer } from '@/components/site-renderer';

interface Props {
  params: { tenantSlug: string };
  searchParams: { page?: string };
}

export function generateStaticParams() {
  return [];
}

export default async function PreviewPage({ params, searchParams }: Props) {
  const data = await fetchSiteData(params.tenantSlug, true);
  if (!data) notFound();

  return <SiteRenderer data={data} pageSlug={searchParams.page} preview />;
}

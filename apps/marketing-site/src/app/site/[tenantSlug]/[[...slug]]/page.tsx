import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { fetchSiteData } from '@/lib/site-api';
import { SiteRenderer } from '@/components/site-renderer';

interface Props {
  params: { tenantSlug: string; slug?: string[] };
}

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchSiteData(params.tenantSlug);
  if (!data) return { title: 'Not found' };

  const pageSlug = params.slug?.[0];
  const page = pageSlug
    ? data.pages.find((p) => p.slug === pageSlug)
    : data.pages.find((p) => p.isHome);

  return {
    title: page?.metaTitle || page?.label || data.settings?.seoDefaults?.title || 'Hamro Tourist',
    description: page?.metaDescription || data.settings?.seoDefaults?.description,
  };
}

export default async function TenantPage({ params }: Props) {
  const data = await fetchSiteData(params.tenantSlug);
  if (!data) notFound();

  const pageSlug = params.slug?.[0];
  return <SiteRenderer data={data} pageSlug={pageSlug} />;
}

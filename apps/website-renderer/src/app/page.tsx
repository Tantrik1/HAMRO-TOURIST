import { getTenantSlug } from '@/lib/tenant';
import {
  fetchTenantConfig,
  fetchTours,
  fetchTreks,
  fetchActivities,
  fetchPackages,
  fetchRegions,
} from '@/lib/api';
import { SectionRenderer } from '@/components/SectionRenderer';

export const revalidate = 300;

export default async function HomePage() {
  const slug = await getTenantSlug();
  const [config, tours, treks, activities, packages, regions] = await Promise.all([
    fetchTenantConfig(slug),
    fetchTours(slug),
    fetchTreks(slug),
    fetchActivities(slug),
    fetchPackages(slug),
    fetchRegions(slug),
  ]);

  const themeId = config?.themeId || 'adventure-bold';
  const sections = config?.sections || [];

  return (
    <main className="min-h-screen">
      <SectionRenderer
        themeId={themeId}
        sections={sections}
        data={{
          agency: {
            name: config?.seoTitle || slug,
            logo: config?.faviconUrl || '',
            tagline: config?.seoDescription || 'Discover amazing adventures',
          },
          tours: tours || [],
          treks: treks || [],
          regions: regions || [],
          activities: activities || [],
          packages: packages || [],
        }}
      />
    </main>
  );
}

import { getTenantSlug } from '@/lib/tenant';
import { fetchRegionBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function RegionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenantSlug = await getTenantSlug();
  const region = await fetchRegionBySlug(tenantSlug, slug);
  if (!region) notFound();

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:underline">Home</a> &rarr; <span className="text-gray-900">{region.name}</span>
      </nav>
      <h1 className="text-4xl font-bold">{region.name}</h1>
      {region.description && <p className="text-gray-600 mt-3 max-w-3xl">{region.description}</p>}

      {region.tours?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Tours in {region.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {region.tours.map((tour: any) => (
              <a key={tour.id} href={`/tours/${tour.slug}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-500">{tour.durationDays} days</p>
              </a>
            ))}
          </div>
        </section>
      )}

      {region.treks?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Treks in {region.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {region.treks.map((trek: any) => (
              <a key={trek.id} href={`/treks/${trek.slug}`} className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-semibold">{trek.title}</h3>
                <p className="text-sm text-gray-500">{trek.difficulty}</p>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

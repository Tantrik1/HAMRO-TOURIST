import { getTenantSlug } from '@/lib/tenant';
import { fetchPackages } from '@/lib/api';

export const revalidate = 300;

export default async function PackagesPage() {
  const slug = await getTenantSlug();
  const packages = await fetchPackages(slug) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg: any) => (
          <a key={pkg.id} href={`/packages/${pkg.slug}`}
            className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition bg-white">
            <div className="h-48 bg-gray-200" style={pkg.coverImageUrl ? { backgroundImage: `url(${pkg.coverImageUrl})`, backgroundSize: 'cover' } : {}} />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{pkg.title}</h2>
              {pkg.regions?.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">{pkg.regions.map((r: any) => r.name).join(', ')}</p>
              )}
            </div>
          </a>
        ))}
        {packages.length === 0 && <p className="text-gray-500 col-span-full">No packages available yet.</p>}
      </div>
    </main>
  );
}

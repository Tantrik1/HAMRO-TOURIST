import { getTenantSlug } from '@/lib/tenant';
import { fetchTreks } from '@/lib/api';

export const revalidate = 300;

export default async function TreksPage() {
  const slug = await getTenantSlug();
  const treks = await fetchTreks(slug) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Treks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treks.map((trek: any) => (
          <a key={trek.id} href={`/treks/${trek.slug}`}
            className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition bg-white">
            <div className="h-48 bg-gray-200" style={trek.coverImageUrl ? { backgroundImage: `url(${trek.coverImageUrl})`, backgroundSize: 'cover' } : {}} />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{trek.title}</h2>
              <p className="text-gray-500 mt-1">{trek.difficulty}{trek.maxAltitude ? ` &middot; ${trek.maxAltitude}m` : ''}</p>
            </div>
          </a>
        ))}
        {treks.length === 0 && <p className="text-gray-500 col-span-full">No treks available yet.</p>}
      </div>
    </main>
  );
}

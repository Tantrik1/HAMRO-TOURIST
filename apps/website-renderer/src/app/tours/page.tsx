import { getTenantSlug } from '@/lib/tenant';
import { fetchTours } from '@/lib/api';

export const revalidate = 300;

export default async function ToursPage() {
  const slug = await getTenantSlug();
  const tours = await fetchTours(slug) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Tours</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour: any) => (
          <a key={tour.id} href={`/tours/${tour.slug}`}
            className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition bg-white">
            <div className="h-48 bg-gray-200" style={tour.coverImageUrl ? { backgroundImage: `url(${tour.coverImageUrl})`, backgroundSize: 'cover' } : {}} />
            <div className="p-5">
              <h2 className="text-xl font-semibold">{tour.title}</h2>
              <p className="text-gray-500 mt-1">{tour.durationDays} days &middot; {tour.difficulty}</p>
              {tour.description && <p className="text-gray-600 mt-2 line-clamp-2">{tour.description}</p>}
            </div>
          </a>
        ))}
        {tours.length === 0 && <p className="text-gray-500 col-span-full">No tours available yet.</p>}
      </div>
    </main>
  );
}

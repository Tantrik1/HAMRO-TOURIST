import { getTenantSlug } from '@/lib/tenant';
import { fetchTourBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenantSlug = await getTenantSlug();
  const tour = await fetchTourBySlug(tenantSlug, slug);
  if (!tour) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:underline">Home</a> &rarr;{' '}
        <a href="/tours" className="hover:underline">Tours</a> &rarr;{' '}
        <span className="text-gray-900">{tour.title}</span>
      </nav>
      <div className="h-64 md:h-96 bg-gray-200 rounded-xl mb-8" style={tour.coverImageUrl ? { backgroundImage: `url(${tour.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}} />
      <h1 className="text-4xl font-bold">{tour.title}</h1>
      <div className="flex gap-4 mt-3 text-sm text-gray-500">
        <span>{tour.durationDays} days</span>
        <span>Difficulty: {tour.difficulty}</span>
        {tour.region && <span>Region: {tour.region.name}</span>}
      </div>
      {tour.description && <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-wrap">{tour.description}</div>}
      {tour.tourActivities?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Included Activities</h2>
          <ul className="space-y-2">
            {tour.tourActivities.map((ta: any) => (
              <li key={ta.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                <span>{ta.activity?.title || 'Activity'} <span className="text-xs text-gray-400">({ta.inclusionType})</span></span>
                {ta.inclusionType === 'optional' && <span className="font-mono text-sm">${ta.extraPrice}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

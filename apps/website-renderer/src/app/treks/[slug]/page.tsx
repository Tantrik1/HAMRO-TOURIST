import { getTenantSlug } from '@/lib/tenant';
import { fetchTrekBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function TrekDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenantSlug = await getTenantSlug();
  const trek = await fetchTrekBySlug(tenantSlug, slug);
  if (!trek) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:underline">Home</a> &rarr; <a href="/treks" className="hover:underline">Treks</a> &rarr; <span className="text-gray-900">{trek.title}</span>
      </nav>
      <div className="h-64 md:h-96 bg-gray-200 rounded-xl mb-8" style={trek.coverImageUrl ? { backgroundImage: `url(${trek.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}} />
      <h1 className="text-4xl font-bold">{trek.title}</h1>
      <div className="flex gap-4 mt-3 text-sm text-gray-500">
        <span>Difficulty: {trek.difficulty}</span>
        {trek.maxAltitude && <span>Max altitude: {trek.maxAltitude}m</span>}
        {trek.region && <span>Region: {trek.region.name}</span>}
      </div>
      {trek.description && <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-wrap">{trek.description}</div>}
    </main>
  );
}

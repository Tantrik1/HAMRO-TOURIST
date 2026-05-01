import { getTenantSlug } from '@/lib/tenant';
import { fetchActivityBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function ActivityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenantSlug = await getTenantSlug();
  const activity = await fetchActivityBySlug(tenantSlug, slug);
  if (!activity) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:underline">Home</a> &rarr; <a href="/activities" className="hover:underline">Activities</a> &rarr; <span className="text-gray-900">{activity.title}</span>
      </nav>
      <h1 className="text-4xl font-bold">{activity.title}</h1>
      <div className="flex gap-4 mt-3 text-sm text-gray-500">
        <span className="uppercase font-medium text-indigo-600">{activity.type}</span>
        <span className="text-2xl font-bold text-gray-900">${activity.basePrice}</span>
      </div>
      {activity.description && <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-wrap">{activity.description}</div>}
    </main>
  );
}

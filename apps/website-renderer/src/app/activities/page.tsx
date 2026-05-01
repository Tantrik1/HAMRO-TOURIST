import { getTenantSlug } from '@/lib/tenant';
import { fetchActivities } from '@/lib/api';

export const revalidate = 300;

export default async function ActivitiesPage() {
  const slug = await getTenantSlug();
  const activities = await fetchActivities(slug) || [];

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Activities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activities.map((act: any) => (
          <a key={act.id} href={`/activities/${act.slug}`}
            className="block p-5 rounded-xl bg-white shadow-lg hover:shadow-xl transition">
            <div className="text-xs font-medium text-indigo-600 uppercase mb-2">{act.type}</div>
            <h2 className="text-lg font-semibold">{act.title}</h2>
            <p className="text-2xl font-bold mt-2">${act.basePrice}</p>
          </a>
        ))}
        {activities.length === 0 && <p className="text-gray-500 col-span-full">No activities available yet.</p>}
      </div>
    </main>
  );
}

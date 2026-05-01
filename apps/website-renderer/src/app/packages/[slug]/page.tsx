import { getTenantSlug } from '@/lib/tenant';
import { fetchPackageBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tenantSlug = await getTenantSlug();
  const pkg = await fetchPackageBySlug(tenantSlug, slug);
  if (!pkg) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:underline">Home</a> &rarr; <a href="/packages" className="hover:underline">Packages</a> &rarr; <span className="text-gray-900">{pkg.title}</span>
      </nav>
      <div className="h-64 md:h-96 bg-gray-200 rounded-xl mb-8" style={pkg.coverImageUrl ? { backgroundImage: `url(${pkg.coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}} />
      <h1 className="text-4xl font-bold">{pkg.title}</h1>
      {pkg.regions?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {pkg.regions.map((r: any) => <span key={r.id} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">{r.name}</span>)}
        </div>
      )}
      {pkg.description && <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-wrap">{pkg.description}</div>}
    </main>
  );
}

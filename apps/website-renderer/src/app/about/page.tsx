import { getTenantSlug } from '@/lib/tenant';
import { fetchTenantConfig } from '@/lib/api';

export const revalidate = 300;

export default async function AboutPage() {
  const slug = await getTenantSlug();
  const config = await fetchTenantConfig(slug);

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>
      <div className="prose prose-lg max-w-none text-gray-700">
        <p>Welcome to {config?.seoTitle || slug}. We are a travel agency dedicated to creating unforgettable experiences across some of the most beautiful destinations in the world.</p>
        <p>Our team of experienced guides and travel experts curate the best tours, treks, and activities to ensure you have the adventure of a lifetime.</p>
      </div>
    </main>
  );
}

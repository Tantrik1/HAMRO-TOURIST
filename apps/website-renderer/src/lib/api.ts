const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function apiFetch<T>(path: string, tenantSlug: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}/api${path}`, {
      headers: { 'x-tenant-slug': tenantSlug, 'Content-Type': 'application/json' },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function fetchTenantConfig(slug: string) {
  return apiFetch<any>('/websites/config', slug);
}

export async function fetchTours(slug: string) {
  return apiFetch<any[]>('/products/tours?published=true', slug);
}

export async function fetchTourBySlug(tenantSlug: string, tourSlug: string) {
  return apiFetch<any>(`/products/tours/slug/${tourSlug}`, tenantSlug);
}

export async function fetchTreks(slug: string) {
  return apiFetch<any[]>('/products/treks?published=true', slug);
}

export async function fetchTrekBySlug(tenantSlug: string, trekSlug: string) {
  return apiFetch<any>(`/products/treks/slug/${trekSlug}`, tenantSlug);
}

export async function fetchActivities(slug: string) {
  return apiFetch<any[]>('/products/activities?published=true', slug);
}

export async function fetchActivityBySlug(tenantSlug: string, actSlug: string) {
  return apiFetch<any>(`/products/activities/slug/${actSlug}`, tenantSlug);
}

export async function fetchPackages(slug: string) {
  return apiFetch<any[]>('/products/packages?published=true', slug);
}

export async function fetchPackageBySlug(tenantSlug: string, pkgSlug: string) {
  return apiFetch<any>(`/products/packages/slug/${pkgSlug}`, tenantSlug);
}

export async function fetchRegions(slug: string) {
  return apiFetch<any[]>('/products/regions', slug);
}

export async function fetchRegionBySlug(tenantSlug: string, regionSlug: string) {
  return apiFetch<any>(`/products/regions/slug/${regionSlug}`, tenantSlug);
}

export async function fetchCountries(slug: string) {
  return apiFetch<any[]>('/products/countries', slug);
}

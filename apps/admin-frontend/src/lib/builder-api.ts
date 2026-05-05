import { apiFetch } from './api';
import type { BuilderSettings, BuilderPage, BuilderTheme, BuilderSnapshot } from '@/store/builder-store';

type S = { id: string; sectionType: string; label: string; enabled: boolean; config: Record<string, any>; sortOrder: number; variant: string; pageId: string; createdAt: string; updatedAt: string };

function headers(tenantSlug: string) {
  return { 'x-tenant-slug': tenantSlug };
}

export async function getBuilderSettings(tenantSlug: string) { return apiFetch<BuilderSettings>(`/builder/settings`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function updateBuilderSettings(tenantSlug: string, body: Record<string, any>) { return apiFetch<BuilderSettings>(`/builder/settings`, { method: 'PATCH', body: JSON.stringify(body), headers: headers(tenantSlug) }); }
export async function listBuilderThemes(tenantSlug: string) { return apiFetch<BuilderTheme[]>(`/builder/themes`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function getBuilderTheme(tenantSlug: string, key: string) { return apiFetch<BuilderTheme>(`/builder/themes/${key}`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function seedBuilderThemes(tenantSlug: string) { return apiFetch<{ seeded: boolean }>(`/builder/themes/seed`, { method: 'POST', body: JSON.stringify({}), headers: headers(tenantSlug) }); }
export async function listBuilderPages(tenantSlug: string) { return apiFetch<BuilderPage[]>(`/builder/pages`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function getBuilderPage(tenantSlug: string, pageId: string) { return apiFetch<BuilderPage>(`/builder/pages/${pageId}`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function getBuilderPageBySlug(tenantSlug: string, slug: string) { return apiFetch<BuilderPage>(`/builder/pages/slug/${slug}`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function createBuilderPage(tenantSlug: string, body: Record<string, any>) { return apiFetch<BuilderPage>(`/builder/pages`, { method: 'POST', body: JSON.stringify(body), headers: headers(tenantSlug) }); }
export async function updateBuilderPage(tenantSlug: string, pageId: string, body: Record<string, any>) { return apiFetch<BuilderPage>(`/builder/pages/${pageId}`, { method: 'PATCH', body: JSON.stringify(body), headers: headers(tenantSlug) }); }
export async function deleteBuilderPage(tenantSlug: string, pageId: string) { return apiFetch<{ deleted: boolean }>(`/builder/pages/${pageId}`, { method: 'DELETE', headers: headers(tenantSlug) }); }
export async function reorderBuilderPages(tenantSlug: string, pageIds: string[]) { return apiFetch<{ reordered: boolean }>(`/builder/pages/reorder`, { method: 'POST', body: JSON.stringify({ pageIds }), headers: headers(tenantSlug) }); }
export async function addBuilderSection(tenantSlug: string, pageId: string, body: Record<string, any>) { return apiFetch<S>(`/builder/pages/${pageId}/sections`, { method: 'POST', body: JSON.stringify(body), headers: headers(tenantSlug) }); }
export async function updateBuilderSection(tenantSlug: string, sectionId: string, body: Record<string, any>) { return apiFetch<S>(`/builder/sections/${sectionId}`, { method: 'PATCH', body: JSON.stringify(body), headers: headers(tenantSlug) }); }
export async function deleteBuilderSection(tenantSlug: string, sectionId: string) { return apiFetch<{ deleted: boolean }>(`/builder/sections/${sectionId}`, { method: 'DELETE', headers: headers(tenantSlug) }); }
export async function reorderBuilderSections(tenantSlug: string, pageId: string, sectionIds: string[]) { return apiFetch<{ reordered: boolean }>(`/builder/pages/${pageId}/sections/reorder`, { method: 'POST', body: JSON.stringify({ sectionIds }), headers: headers(tenantSlug) }); }
export async function duplicateBuilderSection(tenantSlug: string, sectionId: string) { return apiFetch<S>(`/builder/sections/${sectionId}/duplicate`, { method: 'POST', body: JSON.stringify({}), headers: headers(tenantSlug) }); }
export async function listBuilderSnapshots(tenantSlug: string) { return apiFetch<BuilderSnapshot[]>(`/builder/snapshots`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function createBuilderSnapshot(tenantSlug: string, body: Record<string, any>) { return apiFetch<BuilderSnapshot>(`/builder/snapshots`, { method: 'POST', body: JSON.stringify(body), headers: headers(tenantSlug) }); }
export async function restoreBuilderSnapshot(tenantSlug: string, snapshotId: string) { return apiFetch<BuilderPage[]>(`/builder/snapshots/${snapshotId}/restore`, { method: 'POST', body: JSON.stringify({}), headers: headers(tenantSlug) }); }
export async function deleteBuilderSnapshot(tenantSlug: string, snapshotId: string) { return apiFetch<{ deleted: boolean }>(`/builder/snapshots/${snapshotId}`, { method: 'DELETE', headers: headers(tenantSlug) }); }
export async function publishBuilder(tenantSlug: string, userId?: string, userName?: string) { return apiFetch<{ url: string; snapshotId: string }>(`/builder/publish`, { method: 'POST', body: JSON.stringify({ userId, userName }), headers: headers(tenantSlug) }); }
export async function getLiveSnapshot(tenantSlug: string) { return apiFetch<BuilderSnapshot>(`/builder/live`, { method: 'GET', headers: headers(tenantSlug) }); }
export async function getBuilderSiteData(tenantSlug: string) { return apiFetch<{ settings: BuilderSettings; pages: BuilderPage[]; theme: BuilderTheme | null }>(`/builder/site`, { method: 'GET', headers: headers(tenantSlug) }); }

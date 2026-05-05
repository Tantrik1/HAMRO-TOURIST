const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface SiteData {
  settings: {
    activeThemeKey: string;
    colors: Record<string, string>;
    fonts: Record<string, string>;
    faviconUrl: string | null;
    logoUrl: string | null;
    ogImageUrl: string | null;
    navbarVariant: string | null;
    footerVariant: string | null;
    navLinks: Array<{
      label: string;
      href: string;
      target?: string;
      children?: Array<{ label: string; href: string; target?: string; description?: string }>;
    }>;
    footerColumns: Array<{ title: string; items: Array<{ label: string; href: string; target?: string }> }>;
    socialLinks: Record<string, string>;
    published: boolean;
    publishedAt: string | null;
    customCss: string[];
    customHeadScripts: string[];
    seoDefaults: Record<string, string>;
  };
  pages: Array<{
    id: string;
    slug: string;
    label: string;
    navLabel?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    isHome: boolean;
    showInNav: boolean;
    showInFooter: boolean;
    status: string;
    navbarVariant: string;
    footerVariant: string;
    themeOverrides: Record<string, any> | null;
    sortOrder: number;
    sections: Array<{
      id: string;
      sectionType: string;
      label: string;
      enabled: boolean;
      config: Record<string, any>;
      sortOrder: number;
      variant: string;
    }>;
  }>;
  theme: {
    key: string;
    name: string;
    colorDefaults: Record<string, string>;
    fontDefaults: Record<string, string>;
    defaultNavbarVariant: string;
    defaultFooterVariant: string;
  } | null;
}

export async function fetchSiteData(tenantSlug: string, preview = false): Promise<SiteData | null> {
  try {
    const url = `${API_BASE}/api/builder/site${preview ? '?preview=true' : ''}`;
    const res = await fetch(url, {
      headers: { 'x-tenant-slug': tenantSlug },
      next: { revalidate: preview ? 0 : 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function fetchPageBySlug(
  tenantSlug: string,
  slug: string,
): Promise<SiteData['pages'][0] | null> {
  try {
    const res = await fetch(`${API_BASE}/api/builder/pages/slug/${slug}`, {
      headers: { 'x-tenant-slug': tenantSlug },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

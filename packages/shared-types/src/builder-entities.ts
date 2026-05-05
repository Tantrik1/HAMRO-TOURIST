// ============================================================
// Website Builder — Domain Entities
// ============================================================
// Shared between website-builder-service, admin-frontend editor,
// and website-renderer. These match the DB schema 1:1.
// ============================================================

export type BuilderThemeStatus = 'published' | 'draft' | 'archived';

/** A theme instance owned by a tenant. Multiple drafts allowed, one published. */
export interface BuilderTheme {
  id: string;
  tenantSlug: string;
  /** Base theme id: 'adventure-bold' | 'serene-journey' | etc. */
  themeId: string;
  /** User-chosen name: 'My Summer Theme' */
  name: string;
  status: BuilderThemeStatus;
  publishedAt: string | null;
  /** Global theme config (colors, fonts, agency info overrides). */
  configuration: BuilderThemeConfiguration;
  version: number;
  createdBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BuilderThemeConfiguration {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    text?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
    mono?: string;
  };
  branding?: {
    agencyName?: string;
    tagline?: string;
    logoUrl?: string;
    faviconUrl?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  social?: Record<string, string>;
  analytics?: {
    googleAnalyticsId?: string;
    metaPixelId?: string;
  };
  customScripts?: {
    head?: string;
    body?: string;
  };
}

/** A page within a theme instance. */
export interface BuilderPage {
  id: string;
  themeId: string;
  tenantSlug: string;
  slug: string;
  title: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoOgImage: string | null;
  isSystemPage: boolean;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

/** A section placed on a page. */
export interface BuilderSection {
  id: string;
  pageId: string;
  themeId: string;
  tenantSlug: string;
  sectionType: string;
  sortOrder: number;
  content: Record<string, unknown>;
  settings: BuilderSectionSettings;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BuilderSectionSettings {
  paddingTop?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  paddingBottom?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backgroundColor?: string;
  backgroundImage?: string;
  containerWidth?: 'narrow' | 'default' | 'wide' | 'full';
  /** Show only on certain devices. */
  visibility?: {
    mobile?: boolean;
    tablet?: boolean;
    desktop?: boolean;
  };
  customClass?: string;
  [key: string]: unknown;
}

/** Frozen snapshot of a theme's configuration + pages + sections for rollback. */
export interface BuilderSnapshot {
  id: string;
  themeId: string;
  tenantSlug: string;
  label: string | null;
  configuration: BuilderThemeConfiguration;
  pages: BuilderPage[];
  sections: BuilderSection[];
  navigation: BuilderNavigation[];
  version: number;
  publishedBy: string | null;
  createdAt: string;
}

/** Navigation menu data (header, footer columns). */
export interface BuilderNavigation {
  id: string;
  themeId: string;
  tenantSlug: string;
  location: 'header' | 'footer-col-1' | 'footer-col-2' | 'footer-col-3';
  items: NavItem[];
  updatedAt: string;
}

export interface NavItem {
  id: string;
  label: string;
  url: string;
  target?: '_self' | '_blank';
  icon?: string;
  children?: NavItem[];
}

/** Theme asset tracked per tenant. */
export interface BuilderMediaAsset {
  id: string;
  tenantSlug: string;
  themeId: string | null;
  mediaServiceId: string;
  cdnUrl: string;
  filename: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  altText: string | null;
  uploadedAt: string;
}

// ─── Preview & publish ─────────────────────────────────────

export interface PreviewToken {
  token: string;
  themeId: string;
  tenantSlug: string;
  expiresAt: string;
}

export interface PublishResult {
  themeId: string;
  tenantSlug: string;
  publishedAt: string;
  snapshotId: string;
  liveUrl: string;
}

// ─── Section palette (for editor UI) ───────────────────────

export interface PaletteSection {
  sectionType: string;
  label: string;
  description?: string;
  category: string;
  icon?: string;
  preview?: string;
  premium?: boolean;
}

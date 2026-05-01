import {
  UserRole,
  TenantPlan,
  TenantStatus,
  CustomDomainStatus,
  ProductStatus,
  Difficulty,
  InclusionType,
  DiscountType,
  ItineraryParentType,
  ThemeId,
  WebsiteSectionType,
  LeadStatus,
} from './enums';

// ─── Auth ────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantSlug: string | null;
  isEmailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  tenantSlug: string | null;
  iat?: number;
  exp?: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ─── Tenant ──────────────────────────────────────────────

export interface Tenant {
  id: string;
  slug: string;
  companyName: string;
  planId: string;
  schemaName: string;
  customDomain: string | null;
  customDomainStatus: CustomDomainStatus;
  domainVerifyToken: string | null;
  published: boolean;
  publishedAt: Date | null;
  ownerUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plan {
  id: string;
  name: TenantPlan;
  displayName: string;
  priceMonthly: number;
  maxCountries: number;
  maxRegionsPerCountry: number;
  maxTeamMembers: number;
  canUseCustomDomain: boolean;
  canUseCustomHtml: boolean;
  canAccessApi: boolean;
}

export interface TenantLimits {
  maxCountries: number;
  maxRegionsPerCountry: number;
  maxTeamMembers: number;
  canUseCustomDomain: boolean;
  canUseCustomHtml: boolean;
  canAccessApi: boolean;
}

// ─── Geography ───────────────────────────────────────────

export interface Country {
  id: string;
  name: string;
  code: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Region {
  id: string;
  countryId: string;
  name: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Products ────────────────────────────────────────────

export interface Tour {
  id: string;
  regionId: string;
  title: string;
  slug: string;
  description: string | null;
  difficulty: Difficulty;
  durationDays: number;
  coverImageUrl: string | null;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Trek {
  id: string;
  regionId: string;
  title: string;
  slug: string;
  description: string | null;
  difficulty: Difficulty;
  maxAltitude: number | null;
  coverImageUrl: string | null;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  regionId: string;
  title: string;
  slug: string;
  type: string;
  description: string | null;
  basePrice: number;
  coverImageUrl: string | null;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Package {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Itinerary & Pricing ─────────────────────────────────

export interface Itinerary {
  id: string;
  parentId: string;
  parentType: ItineraryParentType;
  title: string;
  description: string | null;
  totalDays: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ItineraryDay {
  id: string;
  itineraryId: string;
  dayNumber: number;
  title: string;
  description: string | null;
  accommodation: string | null;
  meals: string | null;
}

export interface ItineraryPricing {
  id: string;
  itineraryId: string;
  label: string;
  basePrice: number;
  currency: string;
  validFrom: Date | null;
  validTo: Date | null;
}

export interface GroupDiscount {
  id: string;
  pricingId: string;
  minPax: number;
  maxPax: number;
  discountType: DiscountType;
  discountValue: number;
}

// ─── Website Builder ─────────────────────────────────────

export interface WebsiteConfig {
  id: string;
  tenantSlug: string;
  themeId: ThemeId;
  seoTitle: string | null;
  seoDescription: string | null;
  faviconUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  sections: SectionConfig[];
  navLinks: NavLink[];
  footerLinks: NavLink[];
  socialLinks: SocialLink[];
  published: boolean;
}

export interface SectionConfig {
  id: string;
  type: WebsiteSectionType;
  title: string;
  enabled: boolean;
  config: Record<string, unknown>;
  sortOrder: number;
}

export interface NavLink {
  label: string;
  href: string;
  isExternal: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

// ─── Theme ───────────────────────────────────────────────

export interface ThemeConfig {
  themeId: ThemeId;
  colors: { primary: string; secondary: string; accent: string };
  fonts: { heading: string; body: string };
  sections: SectionConfig[];
  seo: SEOConfig;
  agency: { name: string; logo: string; tagline: string };
}

export interface SEOConfig {
  title: string;
  description: string;
  ogImage: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  canonicalUrl: string | null;
  robotsDirective: string;
}

// ─── CRM ─────────────────────────────────────────────────

export interface CrmContact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CrmLead {
  id: string;
  contactId: string;
  status: LeadStatus;
  value: number | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Pagination ──────────────────────────────────────────

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

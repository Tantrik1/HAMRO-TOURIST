// ============================================
// Shared types for builder blocks (renderer-side)
// These mirror the data passed to theme sections at render time.
// ============================================

export interface BlockTour {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  difficulty?: string;
  durationDays?: number;
  coverImageUrl?: string | null;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  regionId?: string;
  regionName?: string;
  countryName?: string;
  rating?: number;
  reviewsCount?: number;
  badges?: string[];
}

export interface BlockTrek extends BlockTour {
  maxAltitude?: number | null;
}

export interface BlockActivity {
  id: string;
  title: string;
  slug: string;
  type?: string;
  description?: string | null;
  basePrice?: number;
  currency?: string;
  coverImageUrl?: string | null;
  icon?: string;
  durationHours?: number;
}

export interface BlockPackage {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  coverImageUrl?: string | null;
  durationDays?: number;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  highlights?: string[];
  badges?: string[];
}

export interface BlockRegion {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  coverImageUrl?: string | null;
  packageCount?: number;
  tourCount?: number;
  countryId?: string;
  countryName?: string;
}

export interface BlockCountry {
  id: string;
  name: string;
  code?: string;
  slug: string;
  flagEmoji?: string;
  coverImageUrl?: string | null;
  packageCount?: number;
}

export interface BlockDestination {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  coverImageUrl?: string | null;
  lat?: number;
  lng?: number;
  region?: string;
  country?: string;
}

export interface BlockTestimonial {
  id: string;
  authorName: string;
  authorLocation?: string;
  authorImage?: string | null;
  rating?: number;
  content: string;
  tourName?: string;
  date?: string;
}

export interface BlockFeature {
  icon?: string;
  title: string;
  description?: string;
}

export interface BlockFaq {
  question: string;
  answer: string;
}

export interface BlockStat {
  value: string | number;
  label: string;
  suffix?: string;
  icon?: string;
}

export interface BlockTeamMember {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
  social?: { platform: string; url: string }[];
}

export interface BlockNavItem {
  label: string;
  href: string;
  target?: '_self' | '_blank';
  icon?: string;
  featured?: boolean;
  description?: string;
  imageUrl?: string;
  children?: BlockNavItem[];
}

export interface BlockAgency {
  name: string;
  tagline?: string;
  logo?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  social?: Record<string, string>;
}

/** Standard render props passed to every section component. */
export interface SectionRenderContext {
  content: Record<string, unknown>;
  settings: Record<string, unknown>;
  agency: BlockAgency;
  data?: {
    tours?: BlockTour[];
    treks?: BlockTrek[];
    activities?: BlockActivity[];
    packages?: BlockPackage[];
    regions?: BlockRegion[];
    countries?: BlockCountry[];
    destinations?: BlockDestination[];
    testimonials?: BlockTestimonial[];
  };
}

// ============================================
// Shared Types for Serene Journey Theme
// ============================================

export interface Country {
  id: string;
  name: string;
  code: string;
  slug: string;
  isActive: boolean;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  countryId: string;
  country?: Country;
}

export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  durationDays: number;
  coverImageUrl: string | null;
  regionId: string;
  region?: Region;
  status: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface Trek {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  maxAltitude: number | null;
  coverImageUrl: string | null;
  regionId: string;
  region?: Region;
  status: string;
  durationDays?: number;
  minPrice?: number;
  maxPrice?: number;
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  accommodation: string | null;
  meals: string[];
  activities: string[];
}

export interface Itinerary {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  days: ItineraryDay[];
  included: string[];
  excluded: string[];
  highlights: string[];
  minPrice: number;
  maxPrice: number;
}

export interface GroupDiscount {
  minGroupSize: number;
  maxGroupSize: number | null;
  discountPercent: number;
}

export interface PricingInfo {
  basePrice: number;
  currency: string;
  groupDiscounts: GroupDiscount[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  featured?: boolean;
  description?: string;
  imageUrl?: string;
}

export interface MegaMenuSection {
  title: string;
  items: NavItem[];
  featuredItem?: {
    title: string;
    description: string;
    imageUrl: string;
    href: string;
  };
}

export interface SearchFilters {
  query?: string;
  countryId?: string;
  regionId?: string;
  difficulty?: string[];
  minDuration?: number;
  maxDuration?: number;
  minPrice?: number;
  maxPrice?: number;
  activities?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'newest' | 'popular';
}

export interface Testimonial {
  id: string;
  authorName: string;
  authorLocation: string;
  authorImage: string | null;
  rating: number;
  content: string;
  tourName?: string;
  date: string;
}

export interface AgencyInfo {
  name: string;
  logo: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export type DifficultyLevel = 'easy' | 'moderate' | 'hard' | 'extreme';

export const DifficultyConfig: Record<DifficultyLevel, { label: string; color: string; bgColor: string; borderColor: string }> = {
  easy: {
    label: 'Easy',
    color: '#059669',
    bgColor: 'rgba(5, 150, 105, 0.10)',
    borderColor: 'rgba(5, 150, 105, 0.20)',
  },
  moderate: {
    label: 'Moderate',
    color: '#0891B2',
    bgColor: 'rgba(8, 145, 178, 0.10)',
    borderColor: 'rgba(8, 145, 178, 0.20)',
  },
  hard: {
    label: 'Hard',
    color: '#EA580C',
    bgColor: 'rgba(234, 88, 12, 0.10)',
    borderColor: 'rgba(234, 88, 12, 0.20)',
  },
  extreme: {
    label: 'Extreme',
    color: '#DC2626',
    bgColor: 'rgba(220, 38, 38, 0.10)',
    borderColor: 'rgba(220, 38, 38, 0.20)',
  },
};

export interface TravelFinderConfig {
  showDestination?: boolean;
  showDateRange?: boolean;
  showDuration?: boolean;
  showDifficulty?: boolean;
  showPriceRange?: boolean;
  showActivityType?: boolean;
  destinations?: Region[];
  activities?: Activity[];
  minPrice?: number;
  maxPrice?: number;
  maxDuration?: number;
}

export interface PageConfig {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  [key: string]: unknown;
}

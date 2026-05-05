export enum UserRole {
  PLATFORM_ADMIN = 'platform_admin',
  AGENCY_OWNER = 'agency_owner',
  AGENCY_STAFF = 'agency_staff',
  AGENCY_VIEWER = 'agency_viewer',
}

export enum TenantPlan {
  FREE = 'free',
  PRO = 'pro',
  BUSINESS = 'business',
  ENTERPRISE = 'enterprise',
}

export enum TenantStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum CustomDomainStatus {
  PENDING = 'pending',
  VERIFYING = 'verifying',
  ACTIVE = 'active',
  FAILED = 'failed',
}

export enum ProductStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum Difficulty {
  EASY = 'easy',
  MODERATE = 'moderate',
  HARD = 'hard',
  EXTREME = 'extreme',
}

export enum InclusionType {
  INCLUDED = 'included',
  OPTIONAL = 'optional',
}

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
  FIXED_AMOUNT = 'fixed_amount',
}

export enum LinkMode {
  STANDALONE = 'standalone',
  DESTINATION = 'destination',
  PRODUCT = 'product',
  MULTI = 'multi',
}

export enum ItineraryParentType {
  TOUR = 'tour',
  TREK = 'trek',
  PACKAGE = 'package',
}

export enum ThemeId {
  ADVENTURE_BOLD = 'adventure-bold',
  SERENE_JOURNEY = 'serene-journey',
  HERITAGE_CLASSIC = 'heritage-classic',
  URBAN_EXPLORER = 'urban-explorer',
  MOUNTAIN_VISTA = 'mountain-vista',
  FAMILY_VOYAGE = 'family-voyage',
}

export enum WebsiteSectionType {
  HERO_BANNER = 'hero-banner',
  FEATURED_TOURS = 'featured-tours',
  REGION_SHOWCASE = 'region-showcase',
  ACTIVITY_CARDS = 'activity-cards',
  PACKAGE_SHOWCASE = 'package-showcase',
  TESTIMONIALS = 'testimonials',
  ABOUT_US = 'about-us',
  WHY_CHOOSE_US = 'why-choose-us',
  CONTACT_FORM = 'contact-form',
  NEWSLETTER_SIGNUP = 'newsletter-signup',
  CUSTOM_HTML = 'custom-html',
}

export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  PROPOSAL = 'proposal',
  WON = 'won',
  LOST = 'lost',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAST_DUE = 'past_due',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  TRIALING = 'trialing',
}

export enum BookingStatus {
  INQUIRY = 'inquiry',
  CONFIRMED = 'confirmed',
  DEPOSIT_PAID = 'deposit_paid',
  FULLY_PAID = 'fully_paid',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum BookingPaymentMethod {
  STRIPE = 'stripe',
  ESEWA = 'esewa',
  KHALTI = 'khalti',
  BANK_TRANSFER = 'bank_transfer',
}

export enum BookingPaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum BookingItemType {
  TOUR = 'tour',
  TREK = 'trek',
  ACTIVITY = 'activity',
  PACKAGE = 'package',
}

export enum NewsletterStatus {
  SUBSCRIBED = 'subscribed',
  UNSUBSCRIBED = 'unsubscribed',
}

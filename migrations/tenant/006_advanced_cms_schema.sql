-- Migration: Advanced CMS Schema v2.0
-- Adds SEO, media, FAQs, group discounts, package destinations, activity links, and product fields

-- =============================================
-- 1. COUNTRIES table updates
-- =============================================
ALTER TABLE countries
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- =============================================
-- 2. REGIONS table updates
-- =============================================
ALTER TABLE regions
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- =============================================
-- 3. TREKS table updates
-- =============================================
ALTER TABLE treks
  ADD COLUMN IF NOT EXISTS duration_days INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS base_price DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS inclusions JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS exclusions JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- =============================================
-- 4. TOURS table updates
-- =============================================
ALTER TABLE tours
  ADD COLUMN IF NOT EXISTS destination_id UUID DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS base_price DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS inclusions JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS exclusions JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- =============================================
-- 5. ACTIVITIES table updates
-- =============================================
ALTER TABLE activities
  ADD COLUMN IF NOT EXISTS duration_hours DECIMAL(6,2) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS link_mode VARCHAR(20) DEFAULT 'standalone',
  ADD COLUMN IF NOT EXISTS linked_trek_ids JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS linked_tour_ids JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- =============================================
-- 6. PACKAGES table updates
-- =============================================
ALTER TABLE packages
  ADD COLUMN IF NOT EXISTS total_days INT DEFAULT 1,
  ADD COLUMN IF NOT EXISTS base_price DECIMAL(10,2) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS inclusions JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS exclusions JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS itinerary JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS seo JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS media JSONB DEFAULT NULL;

-- =============================================
-- 7. GROUP_DISCOUNTS table rebuild (polymorphic)
-- =============================================
-- Note: if old columns exist, we need to migrate data or recreate
-- This migration assumes a fresh polymorphic structure

ALTER TABLE group_discounts
  ADD COLUMN IF NOT EXISTS entity_type VARCHAR(50) DEFAULT 'itinerary_pricing',
  ADD COLUMN IF NOT EXISTS entity_id UUID DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS label VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Make max_pax nullable per schema
ALTER TABLE group_discounts ALTER COLUMN max_pax DROP NOT NULL;

-- =============================================
-- 8. FAQS table (polymorphic)
-- =============================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_entity ON faqs(entity_type, entity_id, is_active, sort_order);

-- =============================================
-- 9. PACKAGE_DESTINATIONS join table
-- =============================================
CREATE TABLE IF NOT EXISTS package_destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  destination_id UUID NOT NULL REFERENCES treks(id) ON DELETE CASCADE,
  custom_name VARCHAR(255) DEFAULT NULL,
  custom_description TEXT DEFAULT NULL,
  duration_days INT DEFAULT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(package_id, destination_id)
);

CREATE INDEX IF NOT EXISTS idx_package_destinations_package ON package_destinations(package_id);
CREATE INDEX IF NOT EXISTS idx_package_destinations_destination ON package_destinations(destination_id);

-- =============================================
-- 10. ACTIVITY_TREKS junction table
-- =============================================
CREATE TABLE IF NOT EXISTS activity_treks (
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  trek_id UUID NOT NULL REFERENCES treks(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (activity_id, trek_id)
);

CREATE INDEX IF NOT EXISTS idx_activity_treks_trek ON activity_treks(trek_id);

-- =============================================
-- 11. ACTIVITY_TOURS junction table
-- =============================================
CREATE TABLE IF NOT EXISTS activity_tours (
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  tour_id UUID NOT NULL REFERENCES tours(id) ON DELETE CASCADE,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (activity_id, tour_id)
);

CREATE INDEX IF NOT EXISTS idx_activity_tours_tour ON activity_tours(tour_id);

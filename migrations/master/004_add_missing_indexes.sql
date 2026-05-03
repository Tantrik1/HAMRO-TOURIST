-- Migration: Add missing indexes for frequently queried columns
-- This improves query performance for slug lookups, status filters, and foreign key joins

-- Tours table indexes
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);
CREATE INDEX IF NOT EXISTS idx_tours_status ON tours(status);
CREATE INDEX IF NOT EXISTS idx_tours_region_id ON tours(region_id);
CREATE INDEX IF NOT EXISTS idx_tours_created_at ON tours(created_at);

-- Regions table indexes
CREATE INDEX IF NOT EXISTS idx_regions_slug ON regions(slug);
CREATE INDEX IF NOT EXISTS idx_regions_country_id ON regions(country_id);

-- Activities table indexes
CREATE INDEX IF NOT EXISTS idx_activities_slug ON activities(slug);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_region_id ON activities(region_id);

-- Packages table indexes
CREATE INDEX IF NOT EXISTS idx_packages_slug ON packages(slug);
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);

-- Countries table indexes
CREATE INDEX IF NOT EXISTS idx_countries_slug ON countries(slug);

-- Treks table indexes (if trek entity exists)
CREATE INDEX IF NOT EXISTS idx_treks_slug ON treks(slug) IF EXISTS;
CREATE INDEX IF NOT EXISTS idx_treks_status ON treks(status) IF EXISTS;
CREATE INDEX IF NOT EXISTS idx_treks_region_id ON treks(region_id) IF EXISTS;

-- Composite indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_tours_status_region ON tours(status, region_id);
CREATE INDEX IF NOT EXISTS idx_activities_status_region ON activities(status, region_id);

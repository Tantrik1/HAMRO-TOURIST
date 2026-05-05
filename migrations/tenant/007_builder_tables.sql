-- Migration: Builder Tables v1.0
-- Adds theme, page, section, snapshot, and settings tables for the visual builder.
-- These tables live inside each tenant schema (tenant_{slug}).

-- =============================================
-- 1. builder_settings — global site config
-- =============================================
CREATE TABLE IF NOT EXISTS builder_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  active_theme_key VARCHAR(100) NOT NULL DEFAULT 'adventure-bold',
  colors JSONB NOT NULL DEFAULT '{}',
  fonts JSONB NOT NULL DEFAULT '{}',
  favicon_url VARCHAR(255),
  logo_url VARCHAR(255),
  og_image_url VARCHAR(255),
  google_analytics_id VARCHAR(100),
  custom_css JSONB NOT NULL DEFAULT '[]',
  custom_head_scripts JSONB NOT NULL DEFAULT '[]',
  seo_defaults JSONB NOT NULL DEFAULT '{}',
  navbar_variant VARCHAR(100),
  footer_variant VARCHAR(100),
  nav_links JSONB NOT NULL DEFAULT '[]',
  footer_columns JSONB NOT NULL DEFAULT '[]',
  social_links JSONB NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =============================================
-- 2. builder_themes — available themes
-- =============================================
CREATE TABLE IF NOT EXISTS builder_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  source VARCHAR(50) NOT NULL DEFAULT 'builtin',
  is_premium BOOLEAN NOT NULL DEFAULT false,
  color_defaults JSONB NOT NULL DEFAULT '{}',
  font_defaults JSONB NOT NULL DEFAULT '{}',
  allowed_sections JSONB NOT NULL DEFAULT '[]',
  default_nav_links JSONB NOT NULL DEFAULT '[]',
  default_footer_columns JSONB NOT NULL DEFAULT '[]',
  default_navbar_variant VARCHAR(50) NOT NULL DEFAULT 'classic',
  default_footer_variant VARCHAR(50) NOT NULL DEFAULT 'mega',
  preview_image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- =============================================
-- 3. builder_pages — pages
-- =============================================
CREATE TABLE IF NOT EXISTS builder_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(100) UNIQUE NOT NULL,
  label VARCHAR(200) NOT NULL,
  nav_label VARCHAR(200),
  meta_title TEXT,
  meta_description TEXT,
  is_home BOOLEAN NOT NULL DEFAULT false,
  show_in_nav BOOLEAN NOT NULL DEFAULT true,
  show_in_footer BOOLEAN NOT NULL DEFAULT false,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  navbar_variant VARCHAR(100) NOT NULL DEFAULT 'classic',
  footer_variant VARCHAR(100) NOT NULL DEFAULT 'mega',
  theme_overrides JSONB,
  sort_order INT NOT NULL DEFAULT 0,
  published_at TIMESTAMP,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_builder_pages_slug ON builder_pages(slug);
CREATE INDEX IF NOT EXISTS idx_builder_pages_status ON builder_pages(status);
CREATE INDEX IF NOT EXISTS idx_builder_pages_sort_order ON builder_pages(sort_order);

-- =============================================
-- 4. builder_sections — sections within pages
-- =============================================
CREATE TABLE IF NOT EXISTS builder_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type VARCHAR(100) NOT NULL,
  label VARCHAR(200) NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT true,
  config JSONB NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  parent_section_id VARCHAR(100),
  variant VARCHAR(50) NOT NULL DEFAULT 'standard',
  page_id UUID NOT NULL REFERENCES builder_pages(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_builder_sections_page_id ON builder_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_builder_sections_type ON builder_sections(section_type);
CREATE INDEX IF NOT EXISTS idx_builder_sections_sort ON builder_sections(sort_order);

-- =============================================
-- 5. builder_snapshots — publish + backup snapshots
-- =============================================
CREATE TABLE IF NOT EXISTS builder_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  snapshot_type VARCHAR(50) NOT NULL DEFAULT 'manual',
  pages JSONB NOT NULL DEFAULT '[]',
  theme_overrides JSONB NOT NULL DEFAULT '{}',
  theme_key VARCHAR(100) NOT NULL,
  published_by_user_id VARCHAR(100),
  published_by_name VARCHAR(200),
  published_at TIMESTAMP,
  is_live BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_builder_snapshots_live ON builder_snapshots(is_live, created_at DESC);

-- =============================================
-- 6. Defaults: seed settings row
-- =============================================
INSERT INTO builder_settings (id, active_theme_key)
SELECT gen_random_uuid(), 'adventure-bold'
WHERE NOT EXISTS (SELECT 1 FROM builder_settings LIMIT 1);

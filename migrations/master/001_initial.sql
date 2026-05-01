-- Master schema migration: users, plans, tenants, refresh_tokens
-- Run against public schema

-- Enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('platform_admin', 'agency_owner', 'agency_staff', 'agency_viewer');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE tenant_plan AS ENUM ('free', 'pro', 'business', 'enterprise');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE custom_domain_status AS ENUM ('pending', 'verifying', 'active', 'failed');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name tenant_plan NOT NULL UNIQUE,
  display_name VARCHAR(50) NOT NULL,
  price_monthly DECIMAL(10, 2) NOT NULL DEFAULT 0,
  max_countries INT NOT NULL DEFAULT 5,
  max_regions_per_country INT NOT NULL DEFAULT 3,
  max_team_members INT NOT NULL DEFAULT 1,
  can_use_custom_domain BOOLEAN NOT NULL DEFAULT false,
  can_use_custom_html BOOLEAN NOT NULL DEFAULT false,
  can_access_api BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role user_role NOT NULL DEFAULT 'agency_owner',
  tenant_slug VARCHAR(63),
  is_email_verified BOOLEAN NOT NULL DEFAULT false,
  google_id VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_tenant_slug ON users(tenant_slug);

-- Tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(63) NOT NULL UNIQUE,
  company_name VARCHAR(255) NOT NULL,
  plan_id UUID NOT NULL REFERENCES plans(id),
  schema_name VARCHAR(63) NOT NULL,
  custom_domain VARCHAR(255),
  custom_domain_status custom_domain_status NOT NULL DEFAULT 'pending',
  domain_verify_token VARCHAR(64),
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  owner_user_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);

-- Refresh tokens
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  is_revoked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_hash ON refresh_tokens(token_hash);

-- Audit log (master-level)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  tenant_slug VARCHAR(63),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id VARCHAR(255),
  details JSONB,
  ip_address VARCHAR(45),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant ON audit_logs(tenant_slug);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);

-- Seed default plans
INSERT INTO plans (name, display_name, price_monthly, max_countries, max_regions_per_country, max_team_members, can_use_custom_domain, can_use_custom_html, can_access_api)
VALUES
  ('free', 'Free', 0, 5, 3, 1, false, false, false),
  ('pro', 'Pro', 29, 999999, 999999, 5, true, true, true),
  ('business', 'Business', 79, 999999, 999999, 15, true, true, true),
  ('enterprise', 'Enterprise', 199, 999999, 999999, 999999, true, true, true)
ON CONFLICT (name) DO NOTHING;

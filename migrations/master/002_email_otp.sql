-- Email OTP verification codes
CREATE TABLE IF NOT EXISTS email_otps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  code_hash VARCHAR(255) NOT NULL,
  purpose VARCHAR(32) NOT NULL DEFAULT 'register',
  attempts INT NOT NULL DEFAULT 0,
  consumed_at TIMESTAMPTZ NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_otps_email_purpose ON email_otps(email, purpose);
CREATE INDEX IF NOT EXISTS idx_email_otps_expires_at ON email_otps(expires_at);

-- Tenants table extensions for company onboarding details
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS year_established INT NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS about_company TEXT NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS countries_served TEXT[] NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS theme_slug VARCHAR(64) NULL;
ALTER TABLE tenants ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ NULL;

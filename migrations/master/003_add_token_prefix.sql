-- Add token_prefix column to refresh_tokens for O(1) lookups
-- Run against public schema

ALTER TABLE refresh_tokens
ADD COLUMN token_prefix VARCHAR(16);

-- Backfill existing tokens with prefix (first 16 chars of hash as proxy)
UPDATE refresh_tokens
SET token_prefix = SUBSTRING(token_hash, 1, 16)
WHERE token_prefix IS NULL;

-- Make column NOT NULL after backfill
ALTER TABLE refresh_tokens
ALTER COLUMN token_prefix SET NOT NULL;

-- Create index for efficient token lookup
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token_prefix
ON refresh_tokens(token_prefix);

-- Drop old index on token_hash (no longer needed for lookups)
DROP INDEX IF EXISTS idx_refresh_tokens_token_hash;

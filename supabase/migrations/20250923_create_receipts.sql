-- Migration: create receipts table (idempotent)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

BEGIN;

CREATE TABLE IF NOT EXISTS public.receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('Decision-RDS','Consent-RDS','Settlement-RDS','Delta-RDS','Vault-RDS','Comms-RDS')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  org_id UUID,
  tenant_id UUID,
  inputs_hash TEXT NOT NULL,
  policy_version TEXT NOT NULL,
  result JSONB,
  reasons TEXT[],
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  canonical JSONB NOT NULL DEFAULT '{}'::jsonb,
  sha256_hash TEXT NOT NULL,
  anchor_ref JSONB,
  anchor_status TEXT DEFAULT 'pending' CHECK (anchor_status IN ('pending','anchored','failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_receipts_sha256 ON public.receipts (sha256_hash);
CREATE INDEX IF NOT EXISTS idx_receipts_user_id ON public.receipts (user_id);
CREATE INDEX IF NOT EXISTS idx_receipts_tenant_id ON public.receipts (tenant_id);
CREATE INDEX IF NOT EXISTS idx_receipts_type ON public.receipts (type);
CREATE INDEX IF NOT EXISTS idx_receipts_created_at ON public.receipts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_receipts_anchor_status ON public.receipts (anchor_status);

ALTER TABLE public.receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS receipts_select_own ON public.receipts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS receipts_insert_own ON public.receipts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS receipts_update_own ON public.receipts
  FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_receipts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS receipts_updated_at ON public.receipts;
CREATE TRIGGER receipts_updated_at
  BEFORE UPDATE ON public.receipts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_receipts_updated_at();

COMMIT;

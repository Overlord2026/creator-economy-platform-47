-- CRITICAL SECURITY FIX: Enable RLS on family_vaults and fix function search_path issues

-- Fix 1: Add missing RLS policy for family vault deletion
DROP POLICY IF EXISTS "Vault creators can delete their vaults" ON public.family_vaults;
CREATE POLICY "Vault creators can delete their vaults"
ON public.family_vaults
FOR DELETE
USING (auth.uid() = created_by);

-- Fix 2: Add search_path to all security definer functions to prevent privilege escalation
CREATE OR REPLACE FUNCTION public.is_org_member(row_org uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  select exists (
    select 1 from public.org_members m
    where m.org_id = row_org and m.user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.update_profiles_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_receipts_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;
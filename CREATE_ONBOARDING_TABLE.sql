-- Complete user_onboarding_progress table creation with expanded user types
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/tyrwccvkgbxlfyycsnhd/sql/new

-- Create user onboarding tracking table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.user_onboarding_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tenant_id UUID,
  user_type TEXT NOT NULL CHECK (user_type IN (
    'advisor',
    'client',
    'family',
    'professional',
    'athlete',
    'brand',
    'school',
    'agent',
    'cpa',
    'attorney',
    'insurance',
    'healthcare',
    'realtor',
    'consultant',
    'accountant'
  )),
  step_name TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, step_name)
);

-- Enable RLS
ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_onboarding_progress
CREATE POLICY IF NOT EXISTS "Users can view their own onboarding progress"
  ON public.user_onboarding_progress
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Users can insert their own onboarding progress"
  ON public.user_onboarding_progress
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY IF NOT EXISTS "Users can update their own onboarding progress"
  ON public.user_onboarding_progress
  FOR UPDATE
  USING (user_id = auth.uid());

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_id
  ON public.user_onboarding_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_user_onboarding_user_type
  ON public.user_onboarding_progress(user_type);

-- Grant permissions
GRANT ALL ON public.user_onboarding_progress TO authenticated;
GRANT ALL ON public.user_onboarding_progress TO service_role;

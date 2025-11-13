-- Fix user_onboarding_progress to support all persona types
-- This allows 'family', 'professional', 'athlete', 'brand', etc.

-- Drop the old constraint
ALTER TABLE public.user_onboarding_progress
  DROP CONSTRAINT IF EXISTS user_onboarding_progress_user_type_check;

-- Add new constraint with expanded user types
ALTER TABLE public.user_onboarding_progress
  ADD CONSTRAINT user_onboarding_progress_user_type_check
  CHECK (user_type IN (
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
  ));

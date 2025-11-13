-- Create user_onboarding_progress table
-- Copy this ENTIRE file and paste into Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.user_onboarding_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tenant_id UUID,
  user_type TEXT NOT NULL,
  step_name TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, step_name)
);

ALTER TABLE public.user_onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own onboarding progress"
  ON public.user_onboarding_progress
  FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own onboarding progress"
  ON public.user_onboarding_progress
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own onboarding progress"
  ON public.user_onboarding_progress
  FOR UPDATE
  USING (user_id = auth.uid());

CREATE INDEX idx_user_onboarding_user_id ON public.user_onboarding_progress(user_id);

GRANT ALL ON public.user_onboarding_progress TO authenticated;
GRANT ALL ON public.user_onboarding_progress TO service_role;

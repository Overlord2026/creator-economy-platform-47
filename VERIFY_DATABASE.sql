-- Verification queries for user_onboarding_progress table
-- Run these in Supabase SQL Editor to verify everything works

-- 1. Check table exists and see its structure
SELECT
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'user_onboarding_progress'
ORDER BY ordinal_position;

-- 2. Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'user_onboarding_progress';

-- 3. Check policies exist
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'user_onboarding_progress';

-- 4. Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'user_onboarding_progress';

-- 5. View any existing data
SELECT * FROM user_onboarding_progress ORDER BY created_at DESC LIMIT 10;

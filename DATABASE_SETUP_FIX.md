# 🔧 Database Setup Fix - user_onboarding_progress Table

## ⚠️ Problem
The `user_onboarding_progress` table doesn't exist in your Supabase database yet.

## ✅ Solution
Run the complete table creation script that includes all the persona types we need.

---

## 🎯 Quick Fix (Copy-Paste This)

### Step 1: Open Supabase SQL Editor
https://supabase.com/dashboard/project/tyrwccvkgbxlfyycsnhd/sql/new

### Step 2: Copy and Paste This SQL
```sql
-- Complete user_onboarding_progress table creation with expanded user types

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
```

### Step 3: Click "RUN"
You should see: **"Success. No rows returned"**

---

## ✅ Verification

After running the script, verify the table was created:

```sql
-- Check table exists
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name = 'user_onboarding_progress';

-- Check the constraint allows all user types
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name LIKE '%user_onboarding%';
```

You should see:
- ✅ Table `user_onboarding_progress` exists
- ✅ Constraint includes all persona types (family, professional, athlete, etc.)

---

## 🧪 Test It Works

Now test the onboarding flow:

1. Go to: http://localhost:8086/onboarding?persona=family&segment=retirees
2. Enter your email (any email works for demo)
3. Wait 2 seconds (auto-completes)
4. Should advance to next step with no errors!

Check the database:
```sql
SELECT * FROM user_onboarding_progress ORDER BY created_at DESC LIMIT 5;
```

You should see your onboarding progress being saved!

---

## 📊 What This Creates

**Table**: `user_onboarding_progress`
- Tracks which onboarding steps users have completed
- Supports all persona types (family, athlete, professional, etc.)
- Has RLS policies so users can only see their own data
- Indexed for performance

**Features**:
- ✅ Row Level Security enabled
- ✅ User-specific access control
- ✅ Fast lookups with indexes
- ✅ Supports all current and future persona types

---

## 🚨 Why This Happened

Your Supabase database hasn't had all 483 migrations applied yet. The original table creation was in migration `20250718002417`, but it:

1. Wasn't applied to your database yet
2. Only allowed 'advisor' and 'client' (too restrictive)

This script creates the table with the correct expanded persona types from the start.

---

## 🔄 Alternative: Apply All Migrations

If you want to run ALL migrations (not recommended - may take a while):

```bash
# In your terminal (not Claude Code)
cd /Users/ryansokol/creator-economy-platform-47
supabase login
supabase link --project-ref tyrwccvkgbxlfyycsnhd
supabase db push
```

This will apply all 483 migrations, which might take several minutes and could fail if there are conflicts.

**Recommendation**: Just run the SQL script above instead - it's faster and safer!

---

## ✅ Summary

**Fastest Solution**:
1. Open: https://supabase.com/dashboard/project/tyrwccvkgbxlfyycsnhd/sql/new
2. Paste the SQL from above
3. Click RUN
4. Test onboarding at: http://localhost:8086/onboarding?persona=family&segment=retirees
5. Done! 🎉

**Time to complete**: ~1 minute

# 🗄️ How to Apply Database Migration

## The Migration File
**File**: `supabase/migrations/20251113000000_fix_user_onboarding_user_types.sql`

**What it does**:
- Fixes the `user_onboarding_progress` table to accept all persona types
- Adds support for: family, professional, athlete, brand, school, agent, cpa, attorney, insurance, healthcare, realtor, consultant, accountant

---

## Method 1: Supabase Dashboard (EASIEST - Recommended)

### Step 1: Copy the SQL
Copy this SQL code:

```sql
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
```

### Step 2: Open Supabase SQL Editor
Go to: https://supabase.com/dashboard/project/tyrwccvkgbxlfyycsnhd/sql/new

### Step 3: Paste and Run
1. Paste the SQL code into the editor
2. Click "RUN" or press Cmd/Ctrl + Enter
3. You should see: "Success. No rows returned"

### Step 4: Verify
Run this query to verify:
```sql
SELECT constraint_name, check_clause
FROM information_schema.check_constraints
WHERE constraint_name = 'user_onboarding_progress_user_type_check';
```

You should see the new constraint with all the user types.

---

## Method 2: Supabase CLI

### Step 1: Login to Supabase
```bash
supabase login
```
This will open your browser for authentication.

### Step 2: Link Your Project
```bash
supabase link --project-ref tyrwccvkgbxlfyycsnhd
```

### Step 3: Push Migration
```bash
supabase db push
```

This will apply all pending migrations including the new one.

### Step 4: Verify
```bash
supabase db diff
```

Should show no differences if migration was successful.

---

## Method 3: Manual psql Connection

If you have direct database credentials:

```bash
psql "postgresql://postgres:[PASSWORD]@db.tyrwccvkgbxlfyycsnhd.supabase.co:5432/postgres" \
  -f supabase/migrations/20251113000000_fix_user_onboarding_user_types.sql
```

---

## ✅ Verification

After applying the migration, test it works:

### Option A: Test in Supabase Dashboard
```sql
-- This should work now (previously would fail)
INSERT INTO user_onboarding_progress (
  user_id,
  user_type,
  step_name,
  is_completed
) VALUES (
  gen_random_uuid(),
  'family',  -- This was previously not allowed!
  'email-verify',
  true
);

-- Clean up test record
DELETE FROM user_onboarding_progress WHERE user_type = 'family' AND step_name = 'email-verify';
```

### Option B: Test in the App
1. Go to http://localhost:8086/onboarding?persona=family&segment=retirees
2. Complete the first step (email verification)
3. Check browser console - should have no errors
4. Check Supabase dashboard - should see a record in `user_onboarding_progress`

---

## 🐛 Troubleshooting

### Error: "Access token not provided"
**Solution**: Run `supabase login` first

### Error: "Project not linked"
**Solution**: Run `supabase link --project-ref tyrwccvkgbxlfyycsnhd`

### Error: "Permission denied"
**Solution**: Make sure you're logged in with an account that has access to the project

### Error: "Constraint already exists"
**This is fine!** It means someone already ran the migration. The `DROP CONSTRAINT IF EXISTS` prevents errors.

---

## 🎯 Quick Start (Copy-Paste Ready)

**For Supabase Dashboard** (Easiest):
1. Go to: https://supabase.com/dashboard/project/tyrwccvkgbxlfyycsnhd/sql/new
2. Paste the SQL from the top of this file
3. Click RUN
4. Done! ✅

**For CLI**:
```bash
# Login once
supabase login

# Link project once
supabase link --project-ref tyrwccvkgbxlfyycsnhd

# Push migrations
supabase db push
```

---

## 📊 Expected Result

**Before Migration**:
```
ERROR: new row for relation "user_onboarding_progress" violates check constraint
DETAIL: Failing row contains (user_type = 'family')
```

**After Migration**:
```
✅ Row inserted successfully
```

---

## 🔄 What Happens Next

Once this migration is applied:

1. ✅ Onboarding flow will work for ALL persona types
2. ✅ Users can be: family, professional, athlete, brand, school, agent, etc.
3. ✅ No more constraint violation errors
4. ✅ Progress will save to database correctly

---

**Recommended**: Use Method 1 (Supabase Dashboard) - it's the fastest and easiest!

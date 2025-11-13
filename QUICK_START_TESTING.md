# 🚀 Quick Start Testing Guide

## Development Server Status
✅ **Running**: http://localhost:8086/

---

## ⚡ Quick Test Routes

### 1. Landing & Marketing Pages
```
http://localhost:8086/                    → Landing page (NIL platform)
http://localhost:8086/personas            → Persona selection
http://localhost:8086/families            → Family segments
http://localhost:8086/athletes            → Athlete marketing
http://localhost:8086/brands              → Brand marketing
http://localhost:8086/pros                → Professional directory
```

### 2. Demo Flows (Ready to Test)
```
http://localhost:8086/demo/offerlock      → Lock an NIL offer
http://localhost:8086/demo/contract       → Sign contract
http://localhost:8086/demo/settlement     → Track settlement
```

### 3. Onboarding Flow (Fixed - Needs DB Migration)
```
http://localhost:8086/onboarding?persona=family&segment=retirees
http://localhost:8086/onboarding?persona=family&segment=aspiring
http://localhost:8086/onboarding?persona=professional
```

### 4. Dashboards (Stubs)
```
http://localhost:8086/dashboard           → Main dashboard
http://localhost:8086/deals               → Deals list
```

### 5. NIL Platform (Not Yet Tested)
```
http://localhost:8086/nil                 → NIL hub
http://localhost:8086/nil/athlete/home    → Athlete dashboard
http://localhost:8086/nil/brand/home      → Brand dashboard
http://localhost:8086/nil/school/home     → School dashboard
http://localhost:8086/nil/agent/home      → Agent dashboard
```

### 6. Professional Portals (Not Yet Tested)
```
http://localhost:8086/advisors/home       → Advisor workspace
http://localhost:8086/attorney/home       → Attorney workspace
http://localhost:8086/insurance/home      → Insurance workspace
http://localhost:8086/health/home         → Healthcare workspace
http://localhost:8086/medicare/home       → Medicare workspace
http://localhost:8086/realtor/home        → Realtor workspace
```

---

## 🔧 Critical Fix Required BEFORE Testing Onboarding

### Apply Database Migration

The onboarding flow requires a database migration to work properly.

**Option 1: Supabase Dashboard (Recommended)**
1. Go to: https://supabase.com/dashboard/project/tyrwccvkgbxlfyycsnhd/sql/new
2. Copy the contents of: `supabase/migrations/20251113000000_fix_user_onboarding_user_types.sql`
3. Paste and run the migration
4. Verify success

**Option 2: Supabase CLI**
```bash
supabase db push
```

**What the migration does:**
- Updates the `user_onboarding_progress` table
- Expands allowed `user_type` values from just 'advisor' and 'client'
- Adds support for: family, professional, athlete, brand, school, agent, cpa, attorney, insurance, healthcare, realtor, consultant, accountant

---

## 🧪 Testing Checklist

### Phase 1: Core Flows (Start Here)

#### Landing & Navigation
- [ ] Visit http://localhost:8086/
- [ ] Click through navigation menu
- [ ] Test "Get Started" button (should open persona chooser)
- [ ] Test "Athletes" nav link
- [ ] Test "Brands" nav link
- [ ] Test "Pros" nav link

#### Demo Flows
- [ ] Go to http://localhost:8086/demo/offerlock
- [ ] Fill out the form with test data:
  - Name: "Test Athlete"
  - Level: College
  - School: "Test University"
  - Followers: "50000"
  - Brand: "Test Brand"
  - Offer Value: "25000"
- [ ] Click "Lock Offer"
- [ ] Verify offer locked confirmation
- [ ] Click "Continue → Contract"
- [ ] Test contract flow
- [ ] Test settlement flow

#### Onboarding (After DB Migration)
- [ ] Go to http://localhost:8086/onboarding?persona=family&segment=retirees
- [ ] Step 1: Enter email (auto-completes after 2 seconds)
- [ ] Step 2: Complete profile
- [ ] Step 3: Complete household info
- [ ] Step 4: Link accounts (or skip)
- [ ] Step 5: Upload documents (or skip)
- [ ] Step 6: Set goals
- [ ] Step 7: Invite professional (or skip)
- [ ] Verify progress bar updates
- [ ] Check database for saved progress

### Phase 2: NIL Platform Features

#### Athlete Flow
- [ ] Visit http://localhost:8086/nil/athlete/home
- [ ] Check dashboard loads
- [ ] Test navigation
- [ ] Verify tools are accessible

#### Brand Flow
- [ ] Visit http://localhost:8086/nil/brand/home
- [ ] Check dashboard loads
- [ ] Test deal creation
- [ ] Verify search functionality

#### School Flow
- [ ] Visit http://localhost:8086/nil/school/home
- [ ] Check compliance tools
- [ ] Test athlete roster
- [ ] Verify reporting

### Phase 3: Professional Portals

#### Advisor Workspace
- [ ] Visit http://localhost:8086/advisors/home
- [ ] Test navigation between:
  - Home
  - Leads
  - Meetings
  - Campaigns
  - Pipeline
  - Tools
  - Proof
- [ ] Verify each page loads

#### Other Professional Portals
- [ ] Attorney workspace
- [ ] Insurance workspace
- [ ] Healthcare workspace
- [ ] Medicare workspace
- [ ] Realtor workspace

---

## 🐛 Known Issues

### Fixed ✅
1. **OnboardingPage.tsx** - Supabase client reference (line 47)
2. **Database Schema** - user_type constraint too restrictive

### Pending ⚠️
1. **Database Migration** - Must be applied before onboarding works
2. **Bundle Size** - 614KB (recommend code splitting)
3. **Test Suite** - Placeholder only, no actual tests

### Not Yet Tested 🔍
1. NIL platform features (athlete, brand, school dashboards)
2. Professional portals (advisor, attorney, insurance, etc.)
3. Tools and calculators
4. Authentication flows
5. Data persistence
6. Plaid integration
7. Stripe integration

---

## 🔍 Debugging Tips

### Check Browser Console
Open DevTools (F12) and watch for:
- ❌ JavaScript errors
- ⚠️ Network request failures
- 🟡 Warning messages

### Common Issues

**"Table user_onboarding_progress constraint violation"**
- ✅ **Solution**: Apply database migration (see above)

**"Cannot find module '@/components/...'"**
- ✅ **Solution**: Module likely exists, check import path

**"404 Not Found"**
- ✅ **Solution**: Check if route exists in App.tsx or routes.tsx

**Build fails with type errors**
- ✅ **Solution**: Run `npm run typecheck` to see specific errors

---

## 📊 Quick Health Check

Run these commands to verify everything:

```bash
# Check build status
npm run build

# Check TypeScript
npm run typecheck

# Start dev server
npm run dev
```

All should pass with no errors!

---

## 🎯 Priority Testing Order

1. **HIGH**: Demo flows (OfferLock → Contract → Settlement)
2. **HIGH**: Landing page and navigation
3. **MEDIUM**: Onboarding flow (after migration)
4. **MEDIUM**: NIL platform dashboards
5. **LOW**: Professional portals
6. **LOW**: Tools and calculators

---

## 📝 Reporting Issues

When you find an issue:

1. **Note the URL** where it occurred
2. **Check browser console** for errors
3. **Screenshot** the problem
4. **Describe steps** to reproduce
5. **Note expected** vs actual behavior

---

## ✅ Success Criteria

The platform is considered functional when:

- [ ] All marketing pages load without errors
- [ ] Demo flows complete successfully
- [ ] Onboarding saves progress to database
- [ ] NIL dashboards are accessible
- [ ] Navigation works throughout app
- [ ] No critical console errors

---

**Ready to test!** Start with the demo flows at http://localhost:8086/demo/offerlock

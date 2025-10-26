# TypeScript Build Error Resolution Guide

## Summary

There are 100+ TypeScript build errors caused by mismatched usage patterns of the `safeSupabase` utility functions. The errors fall into 5 main categories.

## Quick Fix: Use Find & Replace in Your Editor

The fastest way to fix all these errors is to use your IDE's find-and-replace across the entire `src/components` directory.

### Fix 1: Remove `'*'` From `safeQueryOptionalTable` Calls (30+ occurrences)

**Find (regex):**
```
safeQueryOptionalTable\(([^,]+),\s*'\*',\s*
```

**Replace with:**
```
safeQueryOptionalTable($1, 
```

**Example:**
```typescript
// Before
const advisors = await safeQueryOptionalTable('advisors', '*', {});

// After  
const advisors = await safeQueryOptionalTable('advisors', {});
```

---

### Fix 2: Add `isOk` Import (20+ files)

**Find:**
```typescript
import { safeInsert } from '@/lib/db/safeSupabase';
```

**Replace:**
```typescript
import { safeInsert, isOk } from '@/lib/db/safeSupabase';
```

**Also find:**
```typescript
import { safeQueryOptionalTable, safeInsert } from '@/lib/db/safeSupabase';
```

**Replace:**
```typescript
import { safeQueryOptionalTable, safeInsert, isOk } from '@/lib/db/safeSupabase';
```

---

### Fix 3: Replace `.error` Checks with `isOk()` (15+ occurrences)

**Find:**
```typescript
if (result.error) {
```

**Replace:**
```typescript
if (!isOk(result)) {
```

**Example:**
```typescript
// Before
const result = await safeInsert('table', data);
if (result.error) {
  console.error(result.error);
  return;
}

// After
const result = await safeInsert('table', data);
if (!isOk(result)) {
  console.error(result.error);
  return;
}
```

---

### Fix 4: Fix `.ok` and `.data` Access on Direct Arrays (50+ occurrences)

**Components expecting `.ok` and `.data`:**
- MarketplaceDashboard.tsx
- RIAAdminPanel.tsx
- RecentlyJoinedTicker.tsx
- AccountantOnboardingFlow.tsx
- AdvisorOnboardingFlow.tsx
- AttorneyOnboardingFlow.tsx
- ConsultantOnboardingFlow.tsx
- PersonaSwitcher.tsx
- ReasonCodesTimeline.tsx
- RevocationCenter.tsx
- And 40+ more...

**Pattern 1:**
```typescript
// Find
if (result.ok && result.data) {
  setCategories(result.data);
}

// Replace
if (Array.isArray(result) && result.length > 0) {
  setCategories(result);
}
```

**Pattern 2:**
```typescript
// Find
const data = result.ok && result.data ? result.data : [];

// Replace
const data = Array.isArray(result) ? result : [];
```

**Pattern 3:**
```typescript
// Find
const item = result.ok && result.data && result.data.length > 0 ? result.data[0] : null;

// Replace
const item = Array.isArray(result) && result.length > 0 ? result[0] : null;
```

---

### Fix 5: Add Array.isArray Checks (10+ occurrences)

**Find:**
```typescript
if (advisors && advisors.length > 0) {
```

**Replace:**
```typescript
if (Array.isArray(advisors) && advisors.length > 0) {
```

**Also:**
```typescript
// Find
if (leads && leads.length > 0) {

// Replace
if (Array.isArray(leads) && leads.length > 0) {
```

---

### Fix 6: Fix Analytics `trackEvent` Calls (5+ occurrences)

**Find:**
```typescript
analytics.trackEvent('event_name', { ...props })
```

**Replace:**
```typescript
analytics.track({ event: 'event_name', properties: { ...props } })
```

---

### Fix 7: Wrap Single Results in Arrays (3 occurrences)

**Find (in KYCVerificationFlow.tsx and similar):**
```typescript
setRecords(Array.isArray(result) ? result : [result]);
```

**Replace:**
```typescript
setRecords(Array.isArray(result) ? result : (result ? [result] : []));
```

---

### Fix 8: Ensure State Setters Get Arrays (5 occurrences)

**Find (in LendingAnalyticsDashboard.tsx, LoanScenarioCalculator.tsx):**
```typescript
if (applications && partners) {
  // ...operations
  setApplications(applications);
}
```

**Replace:**
```typescript
if (Array.isArray(applications) && Array.isArray(partners)) {
  // ...operations
  setApplications(applications);
}
```

---

## Manual Fixes Required

Some files need context-specific fixes:

### src/components/lending/LendingAnalyticsDashboard.tsx

**Lines 70-109:**
```typescript
// Add type assertion
const applications = await safeQueryOptionalTable('loan_requests', {});
const partners = await safeQueryOptionalTable('lending_partners', {});

if (Array.isArray(applications) && Array.isArray(partners)) {
  const totalVolume = applications.reduce((sum: number, app: any) => sum + (app.requested_amount || 0), 0);
  const approved = applications.filter((app: any) => app.status === 'approved');
  
  // ...rest of logic
  
  setApplications(applications); // Already an array
}
```

### src/components/lending/LoanScenarioCalculator.tsx

**Lines 63-69 and 194-200:**
```typescript
const scenarios = await safeQueryOptionalTable('loan_scenarios', {});

if (Array.isArray(scenarios)) {
  setScenarios(scenarios);
}
```

### src/components/onboarding/ProgressOnboarding.tsx

**Line 46:**
```typescript
// Wrong
const { trackEvent } = useEventTracking();

// Correct - use destructured methods properly
const eventTracking = useEventTracking();

// Then later:
eventTracking.track({ event: 'onboarding_progress', properties: { step: currentStep } });
```

---

## Testing After Fixes

After applying all fixes:

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Verify 0 errors:**
   All 100+ TypeScript errors should be resolved.

3. **Test critical flows:**
   - Landing page loads
   - Lead intake works
   - Marketplace displays
   - Onboarding completes
   - Lending features functional

---

## Why These Errors Occurred

The `safeSupabase.ts` utilities were refactored to return `Res<T>` types (with `.ok` and `.error` properties) for better error handling. However, many components were written against an older API where:

- `safeQueryOptionalTable` accepted 3 parameters: `(table, columns, filters)`
- Functions returned data directly instead of wrapped in `Res<T>`
- No type guards were needed for error checking

The new API:
- `safeQueryOptionalTable` should accept 2 parameters: `(table, filters)` 
- Returns `T[]` directly (not `Res<T[]>`)
- Other functions like `safeInsert` return `Res<T>` and require `isOk()` checks

---

## Automated Fix Script (If You Have Command Line Access)

If you can run bash scripts in your environment:

```bash
#!/bin/bash

# Run from project root
find src/components -name "*.tsx" -type f | while read file; do
  # Fix 1: Remove '*' from safeQueryOptionalTable
  sed -i "s/safeQueryOptionalTable(\([^,]*\), '\*', /safeQueryOptionalTable(\1, /g" "$file"
  
  # Fix 2: Add isOk import
  sed -i "s/import { safeInsert } from '@\/lib\/db\/safeSupabase';/import { safeInsert, isOk } from '@\/lib\/db\/safeSupabase';/g" "$file"
  
  # Fix 3: Replace result.error
  sed -i "s/if (result\.error)/if (!isOk(result))/g" "$file"
  
  # Fix 4: Array.isArray checks
  sed -i "s/if (advisors && advisors\.length/if (Array.isArray(advisors) \&\& advisors.length/g" "$file"
  
  # Fix 5: Analytics
  sed -i "s/analytics\.trackEvent/analytics.track/g" "$file"
done
```

---

## Summary Table

| Error Category | Files Affected | Fix Type | Est. Time |
|---------------|----------------|----------|-----------|
| `safeQueryOptionalTable` 3rd arg | 30+ | Find/Replace | 2 min |
| Missing `isOk` import | 20+ | Find/Replace | 2 min |
| `.error` checks | 15+ | Find/Replace | 1 min |
| `.ok`/`.data` on arrays | 50+ | Find/Replace (3 patterns) | 5 min |
| Array type checks | 10+ | Find/Replace | 1 min |
| Analytics calls | 5+ | Find/Replace | 1 min |
| Manual fixes | 3 | Context-specific | 5 min |
| **TOTAL** | **100+** | **Mostly automated** | **15-20 min** |

---

## Next Steps

1. Use your IDE's multi-file find-and-replace feature
2. Apply all patterns above systematically
3. Run `npm run build` to verify
4. Test critical user flows

All errors should resolve after these changes. The NIL features remain 100% unaffected since they use different data access patterns.

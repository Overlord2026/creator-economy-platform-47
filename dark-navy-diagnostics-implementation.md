## Copy-Paste Prompt for Dark Navy Dashboard Implementation

Create an admin diagnostics system to verify API integrations and system health:

### 1. Create Supabase Edge Function
**File**: `supabase/functions/admin-diagnostics/index.ts`
- Environment variable checks: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`
- Stripe API ping test: `stripe.products.list({limit:1})` 
- Database schema validation: Check `profiles.stripe_customer_id` and subscription tables
- Return structured results with no sensitive data exposure

### 2. Create Individual Diagnostic Components
**Files**: `src/components/admin/diagnostics/`
- `EnvVariablesCheck.tsx` - Server-side environment variable validation with GREEN/RED badges
- `StripeApiCheck.tsx` - Live Stripe API connectivity test with status indicators
- `DatabaseSchemaCheck.tsx` - Database schema validation checks
- `WebhookRouteCheck.tsx` - HEAD/GET requests to webhook endpoints (`/api/stripe/webhook`)

### 3. Create Main Dashboard
**File**: `src/components/admin/diagnostics/AdminDiagnosticsDashboard.tsx`
- Card-based layout with real-time status updates
- Export functionality for compliance reports
- Manual refresh capability
- Overall system health summary

### 4. Create Protected Page
**File**: `src/pages/admin/AdminDiagnostics.tsx`
- Route protection: Admin role OR `DIAG_ENABLED=true` environment flag
- Integration with existing `AdminPortalLayout`
- Comprehensive error handling

### 5. Add Routes
- `/admin/diagnostics` - Main diagnostics page
- Update admin navigation to include "Diagnostics" menu item
- Integrate with existing routing system

### 6. Security Features
- Never display secret values, only presence/absence
- Color-coded status indicators (GREEN/RED badges)
- Timestamp tracking for audit trails
- Comprehensive error logging

This creates a unified diagnostics dashboard that validates all API integrations (Stripe, Plaid, Supabase, webhooks) and confirms system health in one centralized admin interface.
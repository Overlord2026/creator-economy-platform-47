# Backend & Services Scan

## Edge Functions (242 Total)

### Receipts & Audit (Signature Feature)
| Area | Item | Notes |
|---|---|---|
| supabase/functions | emit-receipt/index.ts | Receipt emission |
| supabase/functions | store-receipt/index.ts | Receipt storage |
| supabase/functions | aies-receipts/index.ts | AI receipt generation |
| supabase/functions | aies-receipts-export/index.ts | Export receipts |
| supabase/functions | aies-receipts-sign/index.ts | Cryptographic signing |
| supabase/functions | anchor/index.ts | Blockchain anchoring |
| supabase/functions | anchor-resolver/index.ts | Cross-chain proof resolution |
| supabase/functions | anchors-verify/index.ts | Verification service |

### NIL Platform Functions
| Area | Item | Notes |
|---|---|---|
| supabase/functions | nil-auth-verify/index.ts | NIL authentication |
| supabase/functions | nil-disclosure-processor/index.ts | FTC compliance |
| supabase/functions | nil-onboarding-automation/index.ts | Onboarding automation |
| supabase/functions | nil-policy-evaluate/index.ts | Policy enforcement |
| supabase/functions | nil-anchor-resolver/index.ts | Deal anchoring |

### Integration Functions
| Area | Item | Notes |
|---|---|---|
| supabase/functions | plaid-create-link-token/index.ts | Banking aggregation |
| supabase/functions | plaid-exchange-public-token/index.ts | Account linking |
| supabase/functions | plaid-sync-accounts/index.ts | Transaction sync |
| supabase/functions | stripe-ach-transfer/index.ts | ACH payments |
| supabase/functions | stripe-webhook/index.ts | Payment webhooks |
| supabase/functions | docusign-integration/index.ts | E-signatures |

### Compliance & Policy
| Area | Item | Notes |
|---|---|---|
| supabase/functions | policy-eval/index.ts | Policy evaluation |
| supabase/functions | policy-evaluate/index.ts | Policy engine |
| supabase/functions | compliance-action/index.ts | Compliance workflows |
| supabase/functions | export-compliance-report/index.ts | Report generation |

### Authentication & Security
| Area | Item | Notes |
|---|---|---|
| supabase/functions | audit-log/index.ts | Audit logging |
| supabase/functions | log-security-event/index.ts | Security events |
| supabase/functions | test-audit-triggers/index.ts | Audit testing |

## Services Layer

### Core Services
| Area | Item | Notes |
|---|---|---|
| src/services | receipts.ts | Receipt management (619 refs) |
| src/services | transitionMaster.ts | State transitions |
| src/services | auditLog/auditLogService.ts | Audit logging service |

### Integration Services
| Area | Item | Notes |
|---|---|---|
| src/integrations | supabase/client.ts | Supabase client |
| src/integrations | supabase/types.ts | Type definitions |

## Key Features

### Pages (High-Level Features)
| Area | Item | Notes |
|---|---|---|
| src/pages | NIL platform (13 pages) | Full NIL workflow |
| src/pages | Marketplace (6 pages) | Professional marketplace |
| src/pages | Family Office (5 pages) | Estate & documents |
| src/pages | Admin (10+ pages) | Management tools |

### Components (Reusable UI)
| Area | Item | Notes |
|---|---|---|
| src/components | 200+ components | UI library |
| src/components/ui | Radix UI wrappers | Design system |

## Missing Backend Services

### P0 - Critical
- ❌ school-roster-import/ - Bulk athlete upload
- ❌ school-compliance-export/ - NCAA PDF generation
- ❌ marketplace-search/ - Advanced search
- ❌ marketplace-rank/ - Featured/trending algorithm

### P1 - Important
- ❌ social-proof-verify/ - Instagram verification
- ❌ social-engagement-sync/ - Engagement scraping
- ❌ nil-index-compute/ - NIL Index calculation
- ❌ course-progress-sync/ - Education tracking

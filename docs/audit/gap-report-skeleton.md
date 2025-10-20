# GAP REPORT — Platform vs Market (Auto-skeleton)

## 1) What we have (summaries + links)
- Routes: docs/audit/route-inventory.md
- Backend & services: docs/audit/backend-scan.md
- Receipts coverage: docs/audit/receipts-coverage.md
- Policies & guards: docs/audit/policy-guards.md
- Integrations: docs/audit/integrations.md
- UI Copy/CTAs: docs/audit/ui-copy-cta.md

## 2) What competitors expect (from your strategy doc)
- Marketplace & discovery
- School exchanges & compliance portals
- Education modules
- Mobile (PWA/App)
- Analytics & NIL Index
- Integrations (university + social posting/proof)
- Offer→Contract→E-Sign→Payment
- Disclosure pack builder
(Use this list to compare line-by-line.) 

## 3) Gaps (map to landing-page sections)

### HERO message & proof (what's missing?)
**Current:** "Family Office Marketplace" (generic)
**Needed:** NIL-specific value prop that leads with compliance + speed
**Status:** ⚠️ Copy exists but not NIL-focused on main landing

### How-it-works (steps not wired?)
**Current:** Scattered across pages
**Needed:** Centralized 3-step process
**Status:** ⚠️ Functionality exists, UI not unified
**Steps:**
1. ✅ Browse & Connect (marketplace functional)
2. ✅ Lock Terms Fast (contract flow works)
3. ✅ Stay Compliant (receipts + disclosures work)

### Personas (who needs their page?)
**Current:** 
- ✅ Athlete onboarding
- ✅ Brand onboarding
- ⚠️ School/compliance officer (no dedicated workspace)
- ✅ Agent/advisor (pros workspace exists)
- ⚠️ Parent (Family Vault exists, not prominent)

**Needed:**
- ❌ School-specific landing pages
- ❌ Compliance officer dashboard
- ❌ Parent onboarding flow

### Rails (policy/receipts/vault explainers)
**Current:**
- ✅ Receipts: Well-documented, 619+ references
- ✅ Policy Gates: 393+ references, training enforcement works
- ✅ Vault: Family Vault implemented

**Needed:**
- ⚠️ Landing page trust rail section (copy exists, not surfaced)
- ⚠️ Visual explainers (screenshots/diagrams)

### Pricing/Plans (are tiers defined?)
**Current:** ⚠️ Subscription tiers exist in code, not on public landing
**Needed:** 
- ❌ Public pricing page
- ❌ Plan comparison table
- ❌ School custom pricing CTA

## 4) Priorities (P0 → P2)

### P0: Must for MVP/demo
1. **Public Marketplace** - Browse athletes & brands
   - **Status:** ⚠️ Routes exist (/marketplace/creators) but no athlete/brand-specific browse
   - **Blocker:** Missing athlete profiles, brand directory
   - **Sprint:** S-1

2. **School Exchanges** - School-branded portals
   - **Status:** ❌ Not started
   - **Blocker:** No `schools` table, no school routes
   - **Sprint:** S-1 to S-2

3. **Compliance Dashboard** - NCAA-ready exports
   - **Status:** ⚠️ Compliance foundations exist, no unified dashboard
   - **Blocker:** UI consolidation needed
   - **Sprint:** S-2

4. **Offer→Contract→E-Sign→Payment** - Core money path
   - **Status:** ✅ Fully implemented
   - **Blocker:** None
   - **Sprint:** Complete

5. **Disclosure Pack Builder** - FTC compliance
   - **Status:** ✅ Functional
   - **Blocker:** None (minor: no bulk download)
   - **Sprint:** Complete (enhancements S-2)

### P1: Competitive parity
6. **Education Modules** - NIL 101 certification
   - **Status:** ⚠️ Route exists, content incomplete
   - **Blocker:** Course content, quizzes
   - **Sprint:** S-3

7. **Mobile PWA & Push** - On-the-go approvals
   - **Status:** ❌ Not configured
   - **Blocker:** PWA manifest, service worker, push setup
   - **Sprint:** S-3

8. **Analytics & NIL Index** - Decision support
   - **Status:** ⚠️ Route exists, algorithm not implemented
   - **Blocker:** Index calculation logic
   - **Sprint:** S-3

9. **Integrations (Univ + Social)** - Reduce manual work
   - **Status:** ❌ Not started (Instagram, Twitter, SIS)
   - **Blocker:** OAuth setup, API implementation
   - **Sprint:** S-3 to S-4

### P2: Differentiators / moat
10. **Proof Explorer** - Public blockchain verification
    - **Status:** ⚠️ Receipts anchored, no public explorer UI
    - **Blocker:** UI for non-users to verify
    - **Sprint:** S-4

11. **Secure Vault UX** - Enhanced Family Vault
    - **Status:** ✅ Functional, could use UX polish
    - **Blocker:** None (cosmetic improvements)
    - **Sprint:** S-4

## 5) Screenshots to capture

### Internal: OfferLock→Contract→Settlement, Receipts, Admin/Compliance tables
**To Capture:**
- [ ] Marketplace browse (current state: /marketplace/creators)
- [ ] NIL offer creation flow (/nil/offers)
- [ ] Contract editor with DocuSign integration
- [ ] Payment escrow & release flow
- [ ] Receipts viewer with blockchain anchoring
- [ ] Disclosure pack builder
- [ ] Admin compliance tables
- [ ] Family Vault interface

**Purpose:** Demo what already works, identify UI gaps

### External: Opendorse/Icon Source/INFLCR public pages
**To Capture:**
- [ ] Opendorse marketplace (athlete browse)
- [ ] INFLCR school portal (branding, roster)
- [ ] Icon Source compliance dashboard (filters, export)
- [ ] Generic NIL platform education modules

**Purpose:** Benchmark UI/UX, feature parity checklist

## 6) Decisions & owners

### Immediate Decisions Needed (This Week)
1. **School Pilot Partners:** Which 3-5 universities for beta?
   - **Owner:** CTO + Product Manager
   - **Deadline:** End of week

2. **Marketplace Launch Date:** Target Q1 2026?
   - **Owner:** Product Manager
   - **Deadline:** Next sprint planning

3. **Mobile Priority:** PWA or native apps first?
   - **Owner:** Engineering Manager
   - **Decision:** PWA first (S-3), native later

4. **Social Integrations:** Instagram priority over Twitter/TikTok?
   - **Owner:** CTO
   - **Decision:** Instagram + Twitter in S-3, TikTok S-4

### Owner Assignments
- **CTO:** Overall roadmap, tech debt management, integration architecture
- **Engineering Manager:** Sprint planning, resource allocation, QA coordination
- **Product Manager:** School partnerships, feature prioritization, competitive analysis
- **Lead Developer (Backend):** School exchange backend (S-2), social API integrations (S-3)
- **Lead Developer (Frontend):** Marketplace UI (S-1), mobile PWA (S-3)
- **QA Lead:** Test plans for S-1 to S-6, regression suites
- **Compliance Specialist:** NCAA rule engine design, policy templates

## 7) Sprint Breakdown (S-1 to S-6)

### Sprint 1: Public Marketplace (Weeks 1-2)
**Goal:** Launch athlete/brand browse
**Features:**
- [ ] /marketplace/athletes - Browse athletes with filters
- [ ] /marketplace/brands - Browse brands
- [ ] Athlete profile pages
- [ ] Brand profile pages
- [ ] Featured/trending sections
**Owner:** Frontend Lead
**Acceptance:** 100 athletes browsable, filters work, mobile responsive

### Sprint 2: School Exchanges (Weeks 3-5)
**Goal:** School-branded portals
**Features:**
- [ ] Database: `schools`, `athlete_roster`, `school_exchanges` tables
- [ ] /nil/schools - School directory
- [ ] /nil/schools/:id - School portal home
- [ ] /nil/schools/:id/roster - Roster management
- [ ] /nil/schools/:id/marketplace - Local deals
**Owner:** Backend Lead + Frontend Lead
**Acceptance:** 3 pilot schools onboarded, roster import works

### Sprint 3: Compliance Dashboard (Weeks 6-7)
**Goal:** Unified compliance view
**Features:**
- [ ] /nil/schools/:id/compliance - Dashboard UI
- [ ] Deal status tracking
- [ ] Disclosure compliance tracker
- [ ] NCAA PDF export
- [ ] Rule violation alerts
**Owner:** Frontend Lead
**Acceptance:** Compliance officer can export NCAA report in <30 seconds

### Sprint 4: Education Modules (Weeks 8-9)
**Goal:** Complete NIL 101
**Features:**
- [ ] Course content (NIL 101, FTC, Contracts)
- [ ] Video lessons
- [ ] Quizzes
- [ ] Certificate generation
**Owner:** Content Writer + Frontend Lead
**Acceptance:** Athletes can complete NIL 101 in <30 minutes

### Sprint 5: Mobile PWA (Weeks 10-11)
**Goal:** Installable mobile app
**Features:**
- [ ] PWA manifest & service worker
- [ ] Push notifications (Firebase)
- [ ] Add to home screen prompts
- [ ] Mobile-optimized deal approval
**Owner:** Frontend Lead + DevOps
**Acceptance:** App installs on iOS/Android, push works

### Sprint 6: Analytics & Social (Weeks 12-14)
**Goal:** NIL Index + social integrations
**Features:**
- [ ] NIL Index calculation algorithm
- [ ] /nil/index - Public rankings
- [ ] Instagram API integration
- [ ] Twitter API integration
- [ ] Social proof verification
**Owner:** Backend Lead
**Acceptance:** Index updates daily, Instagram posts verified

## 8) Reference Documentation

### Current Gap Analysis & Build Plan
- Main Report: See comprehensive 17-section audit report
- Database Schema: docs/DATABASE_SCHEMA.md
- Architecture: docs/ARCHITECTURE.md
- Security: SECURITY.md

### Competitive Analysis
- Opendorse: [URL]
- INFLCR: [URL]
- Icon Source: [URL]
- AthleticDirectorU: [URL]

### Sprint Planning
- Priorities CSV: docs/audit/priorities.csv
- Landing Map: docs/audit/landing-map.md

---

**Status Summary:**
- **Current State:** 72/100 - Strong infrastructure, missing discovery features
- **After S-1 to S-6:** 90/100 - Competitive parity + unique differentiators
- **Timeline:** 14 weeks to production-ready
- **Investment:** $500K (team + tools + pilots)

*Reference: current gap analysis & build plan.*

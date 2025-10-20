# Policy & Guardrail Touchpoints

## Summary
**Total References:** 393+ across policy/RLS/guardrail files

## Core Policy Files

### Policy Evaluation Engine
- src/features/ai/governance/policy.ts
- src/services/transitionMaster.ts
- supabase/functions/policy-eval/index.ts
- supabase/functions/policy-evaluate/index.ts
- supabase/functions/nil-policy-evaluate/index.ts

### RLS & Security
- src/test/RLSSmokeTest.ts
- src/lib/storage-hygiene.ts
- src/services/security/clientSecurityAudit.ts
- 200+ database RLS policies (via Supabase schema)

### Guardrail Components
- src/components/security/AdminAccessGuard.tsx
- src/components/security/PolicyGate.tsx
- src/hooks/useMFAEnforcement.ts
- src/hooks/useSessionTimeout.ts
- src/hooks/useSecurityMonitoring.ts

## Training & Education Gates

### Training Completion Enforcement
**Files with `training_completed` checks (393 references):**
- Blocks deal creation until NIL 101 complete
- Gates contract signing
- Restricts compliance exports
- Prevents sensitive actions

### Implementation Locations
- Database: `profiles.training_completed` column
- RLS policies: Check training status
- UI components: Show education prompts
- Edge functions: Validate before actions

## RLS Policy Categories

### User Data Isolation
- Profiles: Users see only their own data
- Organizations: `is_org_member()` function
- Multi-tenant: School-based filtering
- Role-based: Admin override capabilities

### Financial Data
- Bank accounts: Owner-only access
- Transfers: Sender/receiver only
- Bills: Payer-only access
- Investment data: Client-only

### Documents & Vault
- Documents: Explicit sharing required
- Vault items: Member permissions
- Legacy items: Family-only access
- Estate documents: Beneficiary access

### NIL-Specific
- Deals: Creator/brand visibility
- Disclosures: School compliance access
- Cap spend: School admin only
- FMV quotes: Deal participants

## Guardrail Types

### Pre-Action Gates
- ✅ Training completion checks
- ✅ MFA enforcement for privileged actions
- ✅ Session timeout validation
- ✅ Role permission checks

### Real-Time Monitoring
- ✅ Security event logging (log-security-event/)
- ✅ Audit log tracking (audit-log/)
- ✅ Policy violation alerts
- ✅ Suspicious activity detection

### Post-Action Verification
- ✅ Receipt generation
- ✅ Audit trail anchoring
- ✅ Compliance report inclusion
- ✅ Evidence preservation

## Policy Enforcement Points

### Database Level
- ✅ RLS policies on all tables
- ✅ `SECURITY INVOKER` functions
- ✅ Foreign key constraints
- ✅ Check constraints (via triggers)

### Application Level
- ✅ React components (PolicyGate)
- ✅ Route guards (AdminAccessGuard)
- ✅ API validation (Zod schemas)
- ✅ Edge function checks

### Integration Level
- ✅ Plaid verification
- ✅ Stripe compliance
- ✅ DocuSign authentication
- ✅ Social platform OAuth

## Files with Policy/Guardrail Logic

### Top 20 Policy Files
1. src/features/ai/governance/policy.ts (202 references)
2. src/services/transitionMaster.ts (transition rules)
3. src/test/RLSSmokeTest.ts (RLS testing)
4. src/components/security/AdminAccessGuard.tsx (role checks)
5. src/hooks/useMFAEnforcement.ts (MFA gates)
6. src/hooks/useSessionTimeout.ts (session policy)
7. src/hooks/useSecurityMonitoring.ts (real-time alerts)
8. supabase/functions/policy-eval/index.ts (evaluation)
9. supabase/functions/nil-policy-evaluate/index.ts (NIL rules)
10. src/lib/storage-hygiene.ts (localStorage security)
... (383+ more files)

## Missing Policy Coverage

### P0 - Critical Gaps
- ❌ School-specific policy templates
- ❌ Automated policy generation for new schools
- ❌ Conference-level policy inheritance
- ❌ Policy versioning & audit trail

### P1 - Important
- ❌ Real-time policy updates (currently code-based)
- ❌ A/B testing for policy changes
- ❌ Policy impact analysis
- ❌ Automated exception handling

## Recommendations

### Immediate
1. Centralize school policy templates
2. Add policy version tracking
3. Implement policy testing framework
4. Document all policy decision points

### Short-Term
1. Build policy management UI for admins
2. Create policy audit dashboard
3. Add automated policy compliance checks
4. Implement policy change notifications

### Long-Term
1. AI-powered policy recommendation
2. Policy conflict detection
3. Automated policy documentation
4. Policy compliance scoring

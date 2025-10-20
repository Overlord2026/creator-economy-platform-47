# Receipts Coverage

## Summary
**Total References:** 619+ across 176 files

## Core Receipt Infrastructure

### Primary Receipt Files
- src/features/receipts/record.ts
- src/features/receipts/store.ts
- src/features/receipts/audit.ts
- src/services/receipts.ts
- src/services/transitionMaster.ts

### Edge Functions
- supabase/functions/emit-receipt/index.ts
- supabase/functions/store-receipt/index.ts
- supabase/functions/aies-receipts/index.ts
- supabase/functions/aies-receipts-export/index.ts
- supabase/functions/aies-receipts-sign/index.ts

### Anchoring Services
- src/features/anchor/providers.ts
- src/features/anchor/api.ts
- supabase/functions/anchor/index.ts
- supabase/functions/anchor-resolver/index.ts
- supabase/functions/anchors-verify/index.ts

## Receipt Types Implemented

### Decision-RDS
- Policy decisions
- Compliance approvals
- Workflow transitions
- AI recommendations

### Vault-RDS
- Document storage
- Evidence packs
- PDF artifacts
- Retention policies

### Comms-RDS
- Email notifications
- SMS messages
- In-app alerts
- Template usage

### Audit-RDS
- Merkle root anchoring
- K-of-N acceptance
- Cross-chain verification
- Replay proofs

## Coverage by Feature Area

### NIL Platform
- ✅ Deal creation → Receipt
- ✅ Contract signing → Receipt
- ✅ Payment processing → Receipt
- ✅ Disclosure submission → Receipt
- ✅ Dispute resolution → Receipt

### Compliance
- ✅ Policy evaluation → Receipt
- ✅ Training completion → Receipt
- ✅ Compliance reports → Receipt
- ✅ Export actions → Receipt

### Financial
- ✅ Transfers → Receipt
- ✅ Bill payments → Receipt
- ✅ ACH transactions → Receipt
- ✅ Plaid connections → Receipt

### Documents & Estate
- ✅ Document uploads → Receipt
- ✅ Vault access → Receipt
- ✅ RON sessions → Receipt
- ✅ Estate documents → Receipt

## Patent-Ready Features

### Blockchain Anchoring
- ✅ Multi-chain support (Polygon, Arweave)
- ✅ Merkle proof generation
- ✅ K-of-N consensus
- ✅ Cross-chain verification

### Deterministic Replay
- ✅ Status-only replay
- ✅ Offline verification
- ✅ Forward-secure chaining
- ✅ Canonical JSON ordering

### Compliance-First Design
- ✅ Immutable audit trail
- ✅ Cryptographic receipts
- ✅ Evidence preservation
- ✅ Retention policies

## Files Referencing Receipts (Top 50)

1. src/features/receipts/record.ts
2. src/features/receipts/store.ts
3. src/features/receipts/audit.ts
4. src/services/receipts.ts
5. src/services/transitionMaster.ts
6. src/features/compliance/generator.ts
7. src/features/compliance/supervisor/monthlySend.ts
8. src/features/anchor/providers.ts
9. src/features/xai/replay.ts
10. src/lib/canonical.ts
... (166 more files)

## Gap Analysis

### Fully Covered
- ✅ Core platform actions
- ✅ Financial transactions
- ✅ Compliance workflows
- ✅ Document management

### Partial Coverage
- ⚠️ Social media posts (proof storage, no auto-capture)
- ⚠️ School roster changes (manual logging)
- ⚠️ Education progress (tracking exists, no receipts)

### Missing Coverage
- ❌ Marketplace searches (no proof needed?)
- ❌ User profile updates (audit log only)
- ❌ Analytics views (no proof needed)

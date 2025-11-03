#!/usr/bin/env bash
set -euo pipefail

# 0) Project ref sanity
PR="${1:-}"; if [ -z "$PR" ]; then echo "Usage: tools/audit_nil.sh <PROJECT_REF>"; exit 2; fi

echo "=== SUPABASE SECRETS (should include 4–5 keys) ==="
supabase secrets list | awk '{print $1}' | sed '1d' > /tmp/keys.txt || true
for K in SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY STRIPE_SECRET_KEY STRIPE_WEBHOOK_SECRET SITE_URL; do
  if grep -qx "$K" /tmp/keys.txt; then printf "OK   %s\n" "$K"; else printf "MISS %s\n" "$K"; fi
done
echo

echo "=== DEPLOYED FUNCTIONS (expected vs present) ==="
REQ_FUNCS=(harvest-proof export-clearinghouse stripe-webhooks fmv-quote preflight-disclosure cap-spend-update school-cap-status clearinghouse-ack-poll proof-screenshot)
LIST="$(supabase functions list 2>/dev/null || true)"
for F in "${REQ_FUNCS[@]}"; do
  if printf "%s\n" "$LIST" | grep -q "$F"; then printf "OK   %s\n" "$F"; else printf "MISS %s\n" "$F"; fi
done
echo

echo "=== STRIPE HANDLERS (payouts/tax) in code ==="
grep -R --line-number -E "payout\.paid|payout\.failed|1099" supabase/functions 2>/dev/null || echo "MISS payout events in webhook code"
echo

echo "=== SOURCE CHECKS (things that caused past breakage) ==="
# stale table reference
if grep -R -n "audit_receipts" src 2>/dev/null; then echo "WARN: update to 'receipts' or keep shim view"; else echo "OK   no 'audit_receipts' refs"; fi
# two React copies
find . -name package.json -not -path "*/node_modules/*" -print -exec grep -nE '"react(-dom)?"\s*:\s*"' {} \; | sed -n '1,200p' || true
echo

echo "=== NEXT ACTIONS (guided) ==="
echo "If any MISS above:"
echo " - Secrets: add in Supabase Studio → Edge Functions → Secrets."
echo " - Functions: scaffold (supabase functions new <name>), paste code, deploy."
echo " - Stripe payouts: add payout.paid/failed to stripe-webhooks."
echo " - Replace 'audit_receipts' with 'receipts' or keep the SQL view shim."
echo "DB checks (RLS/buckets/search_path): run the SQL blocks I gave you in Studio."

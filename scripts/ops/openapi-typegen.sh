#!/usr/bin/env bash
set -euo pipefail

: "${SUPABASE_REF:?Set SUPABASE_REF (20-char project ref)}"
: "${SUPABASE_ANON_KEY:?Set SUPABASE_ANON_KEY (anon JWT)}"

echo "Typegen (REST/OpenAPI) → https://${SUPABASE_REF}.supabase.co/rest/v1/"
npx --yes openapi-typescript \
  "https://${SUPABASE_REF}.supabase.co/rest/v1/" \
  --headers "apikey: ${SUPABASE_ANON_KEY}" \
  --headers "Authorization: Bearer ${SUPABASE_ANON_KEY}" \
  --headers "Accept: application/openapi+json" \
  --output src/types/supabase.ts

echo "✓ Types written to src/types/supabase.ts"

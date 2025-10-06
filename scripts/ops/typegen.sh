#!/usr/bin/env bash
set -euo pipefail

# choose CLI: prefer installed, else npx
if command -v supabase >/dev/null 2>&1; then
  _SUPA_CLI=("supabase")
else
  _SUPA_CLI=("npx" "--yes" "supabase@latest")
fi

need_token_msg() {
  cat <<'MSG'
✗ SUPABASE_ACCESS_TOKEN is missing or malformed.
Use a Personal Access Token (PAT) from your Supabase Account → Access Tokens.
It must look like: sbp_0102...1920
Steps:
1) Open: https://supabase.com/dashboard/account/tokens
2) "Generate new token" → copy value (starts with sbp_)
3) export SUPABASE_ACCESS_TOKEN='sbp_…'   # in this terminal
Or run interactive login:
   npx supabase@latest login
MSG
}

# require a valid PAT (sbp_*)
if [[ -z "${SUPABASE_ACCESS_TOKEN:-}" ]] || [[ ! "${SUPABASE_ACCESS_TOKEN}" =~ ^sbp_ ]]; then
  need_token_msg
  exit 1
fi

# discover project ref if not exported
if [[ -z "${SUPABASE_PROJECT_ID:-}" ]]; then
  if [[ -f supabase/config.toml ]]; then
    SUPABASE_PROJECT_ID="$(grep -Eo 'project_id\s*=\s*"[a-z0-9]{20}"' supabase/config.toml | grep -Eo '[a-z0-9]{20}' | head -n1 || true)"
  fi
fi
if [[ -z "${SUPABASE_PROJECT_ID:-}" ]]; then
  echo "✗ Could not find SUPABASE_PROJECT_ID (20-char project ref). Check supabase/config.toml or export SUPABASE_PROJECT_ID."
  exit 1
fi

echo "Typegen → project: $SUPABASE_PROJECT_ID (CLI: ${_SUPA_CLI[*]})"
"${_SUPA_CLI[@]}" gen types typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > src/types/supabase.ts
echo "✓ Types written to src/types/supabase.ts"

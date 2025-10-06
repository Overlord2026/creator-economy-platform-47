# Supabase Typegen Quickstart

1) Get a Personal Access Token (PAT) – it must start with `sbp_`
   - Account → Access Tokens → Generate new token

2) Export the token (this shell only):
   export SUPABASE_ACCESS_TOKEN='sbp_...'

3) Export the 20-char project ref (auto from config):
   export SUPABASE_PROJECT_ID=$(grep -Eo 'project_id\\s*=\\s*"[a-z0-9]{20}"' supabase/config.toml | grep -Eo '[a-z0-9]{20}' | head -n1)

4) Generate types:
   pnpm run typegen:ci

Troubleshoot:
- If you prefer interactive login:
    npx supabase@latest login
    pnpm run typegen:ci
- If token isn’t `sbp_...`, it will fail.

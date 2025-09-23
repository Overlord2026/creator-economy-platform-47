# confirm branch & repo root
pwd
git rev-parse --abbrev-ref HEAD

# stage and push (pr_body.md will be on your branch)
git add pr_body.md
git commit -m "chore: add PR body draft"
git push -u origin feat/receipts-safehelpers

# create the PR (if gh installed)
if command -v gh >/dev/null 2>&1; then
  gh pr create --title "feat(receipts): add receipts migration + safeSupabase helpers and fallback" \
               --body-file pr_body.md \
               --base main --head feat/receipts-safehelpers --label "enhancement,security"
else
  echo "gh not found. Branch pushed; open browser:"
  echo "https://github.com/Overlord2026/creator-economy-platform-47/pull/new/feat/receipts-safehelpers"
fi

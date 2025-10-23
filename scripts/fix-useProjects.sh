#!/usr/bin/env bash
set -euo pipefail
# Replace supabase. -> sb. in the three hooks
sed -i 's/supabase\./sb./g' src/hooks/useProjects.tsx
sed -i 's/supabase\./sb./g' src/hooks/useRealROIData.ts
sed -i 's/supabase\./sb./g' src/hooks/useReadyCheck.ts
echo "Fixed useProjects, useRealROIData, and useReadyCheck"

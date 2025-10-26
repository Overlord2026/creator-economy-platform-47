#!/bin/bash

# Fix TypeScript build errors by correcting safeSupabase usage patterns

# Find all .tsx files in src/components
find src/components -name "*.tsx" -type f | while read file; do
  echo "Processing: $file"
  
  # Fix 1: Remove middle '*' argument from safeQueryOptionalTable calls
  # Pattern: safeQueryOptionalTable('table', '*', {}) -> safeQueryOptionalTable('table', {})
  perl -i -pe "s/safeQueryOptionalTable\(([^,]+),\s*'\*',\s*/safeQueryOptionalTable(\1, /g" "$file"
  
  # Fix 2: Add Array.isArray checks
  perl -i -pe "s/if \((advisors|leads|applications|partners|scenarios|consents|preferences) && \1\.length/if (Array.isArray(\1) && \1.length/g" "$file"
  
  # Fix 3: Fix .ok and .data property access on direct arrays
  # Pattern: if (result.ok && result.data) -> if (Array.isArray(result))
  perl -i -pe "s/if \(result\.ok && result\.data\)/if (Array.isArray(result))/g" "$file"
  perl -i -pe "s/setCategories\(result\.data\)/setCategories(result)/g" "$file"
  perl -i -pe "s/setAdvisors\(result\.data\)/setAdvisors(result)/g" "$file"
  perl -i -pe "s/result\.ok \&\& result\.data \? result\.data/Array.isArray(result) ? result/g" "$file"
  
 # Fix 4: Wrap single objects in arrays where needed
  perl -i -pe "s/setRecords\(Array\.isArray\(result\) \? result : \[result\]\)/setRecords(Array.isArray(result) ? result : (result ? [result] : []))/g" "$file"
  
  # Fix 5: Ensure applications/scenarios are arrays
  perl -i -pe "s/if \(scenarios\)/if (Array.isArray(scenarios))/g" "$file"
  perl -i -pe "s/setScenarios\(scenarios\)/setScenarios(Array.isArray(scenarios) ? scenarios : [])/g" "$file"
  perl -i -pe "s/setApplications\(applications\)/setApplications(Array.isArray(applications) ? applications : [])/g" "$file"
  
  # Fix 6: Fix analytics trackEvent calls
  perl -i -pe "s/analytics\.trackEvent/analytics.track/g" "$file"
  
  # Fix 7: Add isOk import where safeInsert is used
  perl -i -pe "s/import \{ safeInsert \} from '@\/lib\/db\/safeSupabase';/import { safeInsert, isOk } from '@\/lib\/db\/safeSupabase';/g" "$file"
  perl -i -pe "s/import \{ safeQueryOptionalTable \} from '@\/lib\/db\/safeSupabase';/import { safeQueryOptionalTable, isOk } from '@\/lib\/db\/safeSupabase';/g" "$file"
  perl -i -pe "s/import \{ safeQueryOptionalTable, safeInsert \} from '@\/lib\/db\/safeSupabase';/import { safeQueryOptionalTable, safeInsert, isOk } from '@\/lib\/db\/safeSupabase';/g" "$file"
  perl -i -pe "s/import \{ safeQueryOptionalTable, safeInsert, safeUpdate \} from '@\/lib\/db\/safeSupabase';/import { safeQueryOptionalTable, safeInsert, safeUpdate, isOk } from '@\/lib\/db\/safeSupabase';/g" "$file"
  
  # Fix 8: Replace result.error with isOk checks
  perl -i -pe "s/if \(result\.error\)/if (!isOk(result))/g" "$file"
  perl -i -pe "s/if \(insertResult\.error\)/if (!isOk(insertResult))/g" "$file"
  
  # Fix 9: Fix conditional chains with .ok
  perl -i -pe "s/personaData = result\.ok && result\.data \? result\.data : \[\]/personaData = Array.isArray(result) ? result : []/g" "$file"
  perl -i -pe "s/sessionData = result\.ok && result\.data && result\.data\.length > 0 \? result\.data\[0\] : null/sessionData = Array.isArray(result) && result.length > 0 ? result[0] : null/g" "$file"
  
  # Fix 10: Fix property access patterns
  perl -i -pe "s/const .* = result\.data/const filtered = Array.isArray(result) ? result/g" "$file"
  
  # Fix 11: Fix existingRows patterns
  perl -i -pe "s/if \(existingRows\.ok && existingRows\.data\?\.\[0\]\)/if (Array.isArray(existingRows) && existingRows[0])/g" "$file"
  perl -i -pe "s/if \(statsRows\.ok && statsRows\.data\?\.\[0\]\)/if (Array.isArray(statsRows) && statsRows[0])/g" "$file"
  
  # Fix 12: Fix affiliationRows pattern
  perl -i -pe "s/affiliations = affiliationRows\.ok \? affiliationRows\.data \|\| \[\] : \[\]/affiliations = Array.isArray(affiliationRows) ? affiliationRows : []/g" "$file"
  
done

echo "All files processed!"
echo "Run 'npm run build' to verify fixes"

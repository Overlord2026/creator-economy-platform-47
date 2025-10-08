import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const targets = [
  'src/hooks/useLeads.ts',
  'src/hooks/useOnboardingProgress.ts',
  'src/hooks/useOrganization.ts',
];

for (const file of targets) {
  if (!existsSync(file)) { console.log('skip (missing):', file); continue; }
  let s = readFileSync(file, 'utf8');
  if (!s.includes("@/integrations/supabase/client")) {
    console.log('skip (no supabase import):', file);
    continue;
  }
  // add local 'sb' cast once
  if (!/const\s+sb\s*=\s*supabase\s+as\s+any/.test(s)) {
    s = s.replace(
      /(import\s+\{\s*supabase\s*\}\s+from\s+['"]@\/integrations\/supabase\/client['"];?)/,
      '$1\nconst sb = supabase as any;\n'
    );
  }
  // replace calls in this file only
  s = s.replace(/\bsupabase\.(from|rpc)\(/g, 'sb.$1(');
  writeFileSync(file, s);
  console.log('relaxed generics in:', file);
}

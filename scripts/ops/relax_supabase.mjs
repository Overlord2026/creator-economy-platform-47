import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const targets = [
  'src/hooks/useLeads.ts',
  'src/hooks/useOnboardingProgress.ts',
  'src/hooks/useOrganization.ts',
];
for (const file of targets){
  if (!existsSync(file)) { console.log('skip:',file); continue; }
  let s = readFileSync(file,'utf8');
  if (!s.includes("@/integrations/supabase/client")) { console.log('skip(no supabase):',file); continue; }
  if (!/const\s+sb\s*=\s*supabase\s+as\s+any/.test(s)){
    s = s.replace(/(import\s+\{\s*supabase\s*\}\s+from\s+['"]@\/integrations\/supabase\/client['"];?)/,'$1\nconst sb = supabase as any;\n');
  }
  s = s.replace(/\bsupabase\.(from|rpc)\(/g,'sb.$1(').replace(/\.single\(\)/g,'.maybeSingle()');
  writeFileSync(file,s); console.log('relaxed:',file);
}

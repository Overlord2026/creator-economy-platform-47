import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function walk(dir, list = []) {
  readdirSync(dir).forEach(f => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, list);
    else if (f.endsWith('.ts') || f.endsWith('.tsx')) list.push(p);
  });
  return list;
}

let count = 0;
walk('src').forEach(file => {
  let s = readFileSync(file, 'utf8');
  const orig = s;
  s = s.replace(/import\s+\{\s*supabase\s*\}\s+from\s+['"]@\/integrations\/supabase\/client['"];?/g, "import { sb } from '@/lib/supabase-relaxed';");
  if (s !== orig) {
    s = s.replace(/\bsupabase\./g, 'sb.');
    s = s.replace(/const\s+sb\s*=\s*supabase\s+as\s+any\s*;?\n?/g, '');
    writeFileSync(file, s);
    count++;
    console.log('✓', file);
  }
});
console.log(`\n✅ Fixed ${count} files`);

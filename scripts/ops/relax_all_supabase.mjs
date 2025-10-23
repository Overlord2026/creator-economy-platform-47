import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function getAllTsFiles(dir, fileList = []) {
  const files = readdirSync(dir);
  files.forEach(file => {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getAllTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allFiles = getAllTsFiles('src');
let count = 0;

allFiles.forEach(file => {
  let s = readFileSync(file, 'utf8');
  const orig = s;
  
  // Replace the import
  s = s.replace(
    /import\s+\{\s*supabase\s*\}\s+from\s+['"]@\/integrations\/supabase\/client['"];?/g,
    "import { sb } from '@/lib/supabase-relaxed';"
  );
  
  // Replace usage (only if we changed the import)
  if (s !== orig) {
    s = s.replace(/\bsupabase\./g, 'sb.');
    // Remove any leftover "const sb = supabase as any;" lines
    s = s.replace(/const\s+sb\s*=\s*supabase\s+as\s+any\s*;?\n?/g, '');
    writeFileSync(file, s);
    count++;
    console.log('✓', file);
  }
});

console.log(`\n✅ Relaxed ${count} files`);

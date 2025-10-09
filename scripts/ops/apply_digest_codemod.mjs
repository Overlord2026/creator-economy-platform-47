import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
function walk(p){return readdirSync(p,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(join(p,d.name)):join(p,d.name));}
const files = walk('src').filter(f=>/\.(ts|tsx)$/.test(f));
const rx = /(crypto\.subtle\.digest\(\s*['"]SHA-256['"]\s*,\s*)([^)]+?)(\))/g;

let touched=0;
for (const f of files){
  let s = readFileSync(f,'utf8');
  if (!/crypto\.subtle\.digest\(/.test(s)) continue;
  if (!s.includes(`from '@/utils/buffers'`)) s = `import { toBufferSource } from '@/utils/buffers';\n` + s;
  const r = s.replace(rx, (_,pre,arg,post)=>`${pre}toBufferSource(${arg.trim()})${post}`);
  if (r!==s){ writeFileSync(f,r); console.log('fixed digest:',f); touched++; }
}
console.log('files touched:',touched);

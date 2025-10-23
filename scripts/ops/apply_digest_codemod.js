const fs = require('fs'), path = require('path');
function walk(p){return fs.readdirSync(p,{withFileTypes:true})
  .flatMap(d=>d.isDirectory()?walk(path.join(p,d.name)):path.join(p,d.name));}
const files = walk('src').filter(f=>/\.(ts|tsx)$/.test(f));
const digestRx = /(crypto\.subtle\.digest\(\s*['"]SHA-256['"]\s*,\s*)([^)]+?)(\))/g;
let count = 0, touched = 0;

for (const f of files) {
  let s = fs.readFileSync(f,'utf8');
  if (!/crypto\.subtle\.digest\(/.test(s)) continue;

  // add import if not present
  if (!s.includes(`from '@/utils/buffers'`) && !s.includes(`from "./buffers"`)) {
    const importLine = `import { toBufferSource } from '@/utils/buffers';\n`;
    // after existing imports if any
    s = s.replace(/^/m, importLine);
  }

  const r = s.replace(digestRx, (_, pre, arg, post) =>
    `${pre}toBufferSource(${arg.trim()})${post}`
  );

  if (r !== s) { fs.writeFileSync(f, r); touched++; }
}
console.log('files touched:', touched);

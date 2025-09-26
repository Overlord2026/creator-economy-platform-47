import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve('.env');
let supaUrl = '';
try {
  if (existsSync(envPath)) {
    const env = readFileSync(envPath, 'utf8');
    supaUrl = (env.match(/^VITE_SUPABASE_URL=(.+)$/m)?.[1] || '').trim();
  }
} catch {}

const projectRef = (supaUrl.match(/^https?:\/\/([a-z0-9-]+)\.supabase\.co/)||[])[1] || '';
const outFile = resolve('src/types/supabase.ts');
const token = process.env.SUPABASE_ACCESS_TOKEN || '';

function writeShim() {
  const shim = `// AUTO-GENERATED SHIM (no SUPABASE_ACCESS_TOKEN found)
// Replace with real types by running: SUPABASE_ACCESS_TOKEN=<token> npm run types:gen
// Minimal Database type to keep TS happy.
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];
export type Database = { public: { Tables: Record<string, never>; Views: Record<string, never>; Functions: Record<string, never>; Enums: Record<string, string>; } };
`;
  writeFileSync(outFile, shim, 'utf8');
  console.log('[types] Wrote shim to src/types/supabase.ts');
}

if (!token || !projectRef) {
  writeShim();
  process.exit(0);
}

try {
  const cmd = `npx -y supabase@2 gen types typescript --project-id ${projectRef} --schema public`;
  console.log('[types] Running:', cmd);
  const buf = execSync(cmd, { stdio: 'pipe', env: { ...process.env, SUPABASE_ACCESS_TOKEN: token } });
  const text = String(buf);
  if (!text.includes('type Database')) {
    console.warn('[types] Unexpected output, falling back to shim.');
    writeShim();
  } else {
    writeFileSync(outFile, text, 'utf8');
    console.log('[types] Wrote real types to src/types/supabase.ts');
  }
} catch (err) {
  console.warn('[types] Typegen failed, writing shim. Reason:', err?.stderr ? String(err.stderr) : err?.message);
  writeShim();
}

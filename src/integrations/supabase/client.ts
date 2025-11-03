import { createClient } from '@supabase/supabase-js';

<<<<<<< Updated upstream
const SUPABASE_URL = "https://tyrwccvkgbxlfyycsnhd.sb.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndjY3ZrZ2J4bGZ5eWNzbmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NjU4NjcsImV4cCI6MjA3NDI0MTg2N30.wFR-cpacrfF-u7vnB4NicORd5434vLKEKfiXqXIH1VE";

// Import the supabase client like this:
// import { sb } from '@/lib/supabase-relaxed';
=======
// Vite envs (must be set in .env.local)
const url  = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anon) {
  console.warn('[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
}
>>>>>>> Stashed changes

// Back-compat default client for legacy imports
export const supabase = createClient(url ?? '', anon ?? '');

// Preferred accessor (same instance)
export const getAnonClient = () => supabase;

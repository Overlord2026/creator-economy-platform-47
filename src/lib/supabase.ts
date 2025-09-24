
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// Vite exposes envs that start with VITE_
const url  = import.meta.env.VITE_SUPABASE_URL!;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

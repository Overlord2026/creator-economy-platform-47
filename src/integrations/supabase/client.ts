import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://tyrwccvkgbxlfyycsnhd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5cndjY3ZrZ2J4bGZ5eWNzbmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NjU4NjcsImV4cCI6MjA3NDI0MTg2N30.wFR-cpacrfF-u7vnB4NicORd5434vLKEKfiXqXIH1VE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
export const getAnonClient = () => supabase;

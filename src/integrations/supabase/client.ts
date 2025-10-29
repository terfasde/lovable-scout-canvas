import { createClient } from '@supabase/supabase-js';
// We keep the Database types in `types.ts` for local typing helpers, but avoid
// passing the Database generic to createClient to prevent strict "never" table
// inference issues with the installed @supabase/supabase-js typings. We'll
// cast responses locally where we need stronger typing.
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
// Use the standard ANON key env name used across the app
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});
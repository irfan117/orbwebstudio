/**
 * Supabase Client Configuration
 *
 * @description Client-side Supabase client for browser usage
 * This client uses the anon key and respects Row Level Security (RLS)
 *
 * @usage Import this in client components
 * @example
 * import { supabase } from '@/lib/supabase/client'
 * const { data } = await supabase.from('services').select('*')
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

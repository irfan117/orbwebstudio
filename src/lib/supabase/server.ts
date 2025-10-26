/**
 * Supabase Server Client Configuration
 *
 * @description Server-side Supabase client for API routes and server components
 * This ensures proper session handling in Next.js server context
 *
 * @usage Import this in server components and API routes
 * @example
 * import { createServerClient } from '@/lib/supabase/server'
 * const supabase = createServerClient()
 */

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function getSession() {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

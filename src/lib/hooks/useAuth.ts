'use client';

/**
 * Authentication Hook
 *
 * @description Custom hook for managing authentication state
 * Provides user session, loading state, and auth actions
 * Any authenticated user in Supabase Auth is considered admin
 *
 * @returns {Object} Auth state and methods
 * @returns {User | null} user - Current authenticated user
 * @returns {boolean} loading - Loading state
 * @returns {Function} signIn - Sign in with email and password
 * @returns {Function} signOut - Sign out current user
 * @returns {Function} signUp - Register new user
 *
 * @example
 * const { user, loading, signIn, signOut } = useAuth()
 *
 * if (loading) return <div>Loading...</div>
 * if (!user) return <LoginForm onSubmit={signIn} />
 */

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  loading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState({
        user: session?.user || null,
        loading: false,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthState({
        user: session?.user || null,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  };
}

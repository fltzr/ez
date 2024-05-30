import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { supabase } from '../common/utils/supabase-client';
import { useAuthStore } from '../store/use-auth-store';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    console.log('AuthProvider: useEffect');

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`AuthProvider: onAuthStateChange: event=${event}`);

      if (event === 'SIGNED_OUT') {
        setUser(null);
      }

      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  return children;
};

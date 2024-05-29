import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

import { supabase } from '../common/utils/supabase-client';
import { useAuthStore } from '../store/use-auth-store';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    console.log('AuthProvider: useEffect');
    const setAuth = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error getting user:', error.message);
        setUser(null);
        return;
      }

      setUser(data.user);
    };

    setAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser]);

  return children;
};

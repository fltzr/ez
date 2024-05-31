import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';

import { useNotificationStore } from '@ez/web-state-management';
import { supabase } from '../common/utils/supabase-client';
import { useAuthStore } from '../store/use-auth-store';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const setUser = useAuthStore((s) => s.setUser);
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    console.log('AuthProvider: useEffect');

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`AuthProvider: onAuthStateChange: event=${event}`);

      if (event === 'SIGNED_OUT') {
        setUser(null);

        addNotification({
          id: nanoid(5),
          type: 'success',
          header: 'Successfully signed out!',
          dismissible: true,
          autoDismiss: true,
        });
      }

      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [addNotification, setUser]);

  return children;
};

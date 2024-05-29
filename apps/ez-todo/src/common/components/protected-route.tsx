import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '../../store/use-auth-store';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate replace to={'/sign-in'} />;
  }

  return children;
};

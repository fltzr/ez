import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNotificationStore } from '@ez/web-state-management';

export const useClearNotifications = () => {
  const location = useLocation();
  const clearNotifications = useNotificationStore((s) => s.clearNotifications);

  useEffect(() => {
    clearNotifications();
  }, [location]);
};

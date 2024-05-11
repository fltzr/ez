import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNotificationStore } from '../../store/use-notification-store';

export const useClearNotifications = () => {
  const location = useLocation();
  const clearNotifications = useNotificationStore((s) => s.clearNotifications);

  useEffect(() => {
    clearNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
};

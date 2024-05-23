import { useEffect } from 'react';
import { Flashbar } from '@cloudscape-design/components';

import { useNotificationStore } from '@ez/web-state-management';

export const Notifications = () => {
  const { notifications, removeNotification } = useNotificationStore((s) => ({
    notifications: s.notifications,
    removeNotification: s.removeNotification,
  }));

  useEffect(() => {
    // Create timers only for notifications that should auto-dismiss
    const timers = notifications
      .filter((n) => n.autoDismiss)
      .map((n) =>
        setTimeout(() => {
          removeNotification(n.id ?? '');
        }, 5000)
      );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [removeNotification, notifications]);

  const notificationItems = notifications.map((n) => ({
    ...n,
    onDismiss: () => removeNotification(n.id ?? ''),
  }));

  return <Flashbar stackItems items={notificationItems} />;
};

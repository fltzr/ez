import { useCallback, useEffect, useMemo } from 'react';
import { Flashbar } from '@cloudscape-design/components';
import { useNotificationStore } from '@ez/web-state-management';

export const Notifications = () => {
  const { notifications, removeNotification } = useNotificationStore((s) => ({
    notifications: s.notifications,
    removeNotification: s.removeNotification,
  }));

  const handleDismiss = useCallback(
    (id: string) => {
      removeNotification(id);
    },
    [removeNotification]
  );

  const autoDismissable = useMemo(
    () => notifications.filter((n) => n.autoDismiss),
    [notifications]
  );

  useEffect(() => {
    // Create timers only for notifications that should auto-dismiss
    const timers = autoDismissable.map((n) =>
      setTimeout(() => {
        handleDismiss(n.id ?? '');
      }, 5000)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [handleDismiss, autoDismissable]);

  const notificationItems = useMemo(
    () =>
      notifications.map((n) => ({
        ...n,
        onDismiss: () => handleDismiss(n.id ?? ''),
      })),
    [notifications, handleDismiss]
  );

  return <Flashbar stackItems items={notificationItems} />;
};

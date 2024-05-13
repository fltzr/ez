import type { FlashbarProps } from '@cloudscape-design/components';
import { create } from 'zustand';

type NotificationItem = FlashbarProps.MessageDefinition & {
  autoDismiss?: boolean;
};

type NotificationState = {
  // Notification states
  notifications: NotificationItem[];
};

type NotificationActions = {
  // Notification actions
  addNotification: (message: NotificationItem) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationState & NotificationActions>((set) => ({
  // Default state
  notifications: [],

  // Actions
  addNotification: (notification) =>
    set((s) => ({ notifications: [{ ...notification }, ...s.notifications] })),
  removeNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set(() => ({ notifications: [] })),
}));

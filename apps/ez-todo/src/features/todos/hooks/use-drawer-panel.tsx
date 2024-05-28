import { nanoid } from 'nanoid';
import { useEffectOnce } from 'react-use';

import { useAppLayoutStore, useNotificationStore } from '@ez/web-state-management';
import { CreateTodoItemPanel } from '../components/create-todo-item-panel';
import type { TodoItemSchema } from '../schema';

const useDrawerPanel = (addTodoItem: (newItem: Omit<TodoItemSchema, 'id'>) => void) => {
  const { addDrawerPanel, removeDrawerPanel } = useAppLayoutStore();
  const { addNotification } = useNotificationStore();

  useEffectOnce(() => {
    const drawerId = 'drawer__add-todo-item';

    addDrawerPanel({
      id: drawerId,
      content: (
        <CreateTodoItemPanel
          onSave={(newItem) => {
            addTodoItem(newItem);
            addNotification({
              id: nanoid(5),
              header: `Added todo item.`,
              dismissible: true,
            });
          }}
        />
      ),
      badge: true,
      trigger: { iconName: 'add-plus' },
      resizable: true,
      ariaLabels: {
        drawerName: 'Add todo item',
        closeButton: 'Close add todo item drawer',
        triggerButton: 'Open add todo item drawer',
        resizeHandle: 'Resize add todo item drawer',
      },
    });

    return () => removeDrawerPanel(drawerId);
  });
};

export default useDrawerPanel;

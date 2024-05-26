import { useEffect } from 'react';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { Box, SpaceBetween } from '@cloudscape-design/components';
import { useEffectOnce } from 'react-use';

import { useAppLayoutStore, useNotificationStore } from '@ez/web-state-management';
import { Breadcrumbs } from '@ez/web-ui';
import { CreateTodoItemPanel } from './components/create-todo-item-panel';
import type { TodoItemSchema } from './components/todo-list-table';
import { TodoListTable } from './components/todo-list-table';
import { useLocalStorage } from '../../common/hooks/use-local-storage';

const initialItems: TodoItemSchema[] = [
  {
    id: nanoid(5),
    title: 'In-progress todo task',
    description: 'In-progress todo task description',
    status: 'in-progress',
    dueDate: DateTime.now().toFormat('yyyy-MM-dd'),
  },
  {
    id: nanoid(5),
    title: 'Completed todo task',
    description: 'Completed todo task description',
    status: 'success',
    dueDate: DateTime.now().toFormat('yyyy-MM-dd'),
  },
];

const TodoPage = () => {
  const { setContentLayout, addDrawerPanel, removeDrawerPanel } = useAppLayoutStore();
  const { addNotification } = useNotificationStore();
  const [todoItems, setTodoItems] = useLocalStorage<TodoItemSchema[]>({
    localstorageKey: 'internal__todo-item-schema',
    initialValue: initialItems,
  });

  const handleUpdateTodo = (data: Partial<TodoItemSchema>) => {
    const item = todoItems.find((item) => item.id === data.id);
    if (!item) return;

    console.log('Updating todo item:', { ...item, ...data });

    setTodoItems(todoItems.map((item) => (item.id === data.id ? { ...item, ...data } : item)));
  };

  useEffect(() => {
    const drawerId = 'drawer__create-todo-item';
    addDrawerPanel({
      id: drawerId,
      content: (
        <CreateTodoItemPanel
          onSave={(newItem) => {
            setTodoItems([...todoItems, newItem]);
            addNotification({
              id: nanoid(5),
              header: `Added todo item with ID ${newItem.id}`,
              dismissible: true,
            });
          }}
        />
      ),
      badge: true,
      trigger: { iconName: 'add-plus' },
      resizable: true,
      ariaLabels: {
        drawerName: 'Create todo item',
        closeButton: 'Close create todo item drawer',
        triggerButton: 'Open create todo item drawer',
        resizeHandle: 'Resize create todo item drawer',
      },
    });

    return () => {
      removeDrawerPanel(drawerId);
    };
  }, [addDrawerPanel, addNotification, removeDrawerPanel, setTodoItems, todoItems]);

  useEffectOnce(() => {
    setContentLayout('table');

    return () => {
      setContentLayout('default');
    };
  });

  return (
    <Box padding={{ horizontal: 'm' }}>
      <SpaceBetween direction='vertical' size='m'>
        <Breadcrumbs />
        <TodoListTable items={todoItems as readonly TodoItemSchema[]} onSave={handleUpdateTodo} />
      </SpaceBetween>
    </Box>
  );
};

export const Component = TodoPage;

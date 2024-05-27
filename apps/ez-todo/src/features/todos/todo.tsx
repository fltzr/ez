import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Box, ExpandableSection, SpaceBetween } from '@cloudscape-design/components';
import { useEffectOnce } from 'react-use';

import { useAppLayoutStore, useNotificationStore } from '@ez/web-state-management';
import { Breadcrumbs } from '@ez/web-ui';
import { ArchivedTodoListTable } from './components/archived-todo-list-table/archived-todo-list-table';
import { CreateTodoItemPanel } from './components/create-todo-item-panel';
import { TodoListTable } from './components/todo-list-table/todo-list-table';
import { useTodoItems } from './hooks/use-todo-items';
import type { TodoItemSchema } from './schema';

const useDrawerPanel = (addTodoItem: (newItem: TodoItemSchema) => void) => {
  const { addDrawerPanel, removeDrawerPanel } = useAppLayoutStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    const drawerId = 'drawer__add-todo-item';

    addDrawerPanel({
      id: drawerId,
      content: (
        <CreateTodoItemPanel
          onSave={(newItem) => {
            addTodoItem(newItem);
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
        drawerName: 'Add todo item',
        closeButton: 'Close add todo item drawer',
        triggerButton: 'Open add todo item drawer',
        resizeHandle: 'Resize add todo item drawer',
      },
    });

    return () => removeDrawerPanel(drawerId);
  }, [addDrawerPanel, addNotification, addTodoItem, removeDrawerPanel]);
};

const TodoPage = () => {
  const { setContentLayout } = useAppLayoutStore();
  const {
    todoItems,
    archivedTodoItems,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    archiveTodoItem,
    restoreTodoItem,
  } = useTodoItems();

  useDrawerPanel(addTodoItem);

  useEffectOnce(() => {
    setContentLayout('table');

    return () => setContentLayout('default');
  });

  return (
    <Box padding={{ horizontal: 'm' }}>
      <SpaceBetween direction='vertical' size='m'>
        <Breadcrumbs />
        <TodoListTable
          items={todoItems}
          onSave={updateTodoItem}
          onDelete={deleteTodoItem}
          onArchive={archiveTodoItem}
        />

        <ExpandableSection variant='container' headerText='Archived todo items'>
          <ArchivedTodoListTable
            items={archivedTodoItems}
            onRestore={restoreTodoItem}
            onPermanentlyDelete={deleteTodoItem}
          />
        </ExpandableSection>
      </SpaceBetween>
    </Box>
  );
};

export const Component = TodoPage;

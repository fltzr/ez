import { useEffect } from 'react';
import { Box, SpaceBetween } from '@cloudscape-design/components';

import { useAppLayoutStore } from '@ez/web-state-management';
import { Breadcrumbs } from '@ez/web-ui';
import TodoTable from './components/todo-list-table/todo-list-table';
import { useFetchTodoItems, useInsertTodoItem } from './data-access/todos';
import useDrawerPanel from './hooks/use-drawer-panel';

const TodoPage = () => {
  const { setContentLayout } = useAppLayoutStore();
  const { data, isError, isLoading } = useFetchTodoItems();
  const insertTodoItem = useInsertTodoItem();

  useDrawerPanel((newItem) => {
    insertTodoItem.mutateAsync(newItem);
  });

  useEffect(() => {
    setContentLayout('table');

    return () => setContentLayout('default');
  }, [setContentLayout]);

  return (
    <Box padding={{ horizontal: 'm' }}>
      <SpaceBetween direction='vertical' size='m'>
        <Breadcrumbs />
        <TodoTable items={data || []} isLoading={isLoading} isError={isError} />
      </SpaceBetween>
    </Box>
  );
};

export const Component = TodoPage;

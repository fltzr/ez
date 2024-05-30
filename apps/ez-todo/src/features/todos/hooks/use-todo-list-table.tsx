import { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components';

import { useLocalStorage } from '../../../common/hooks/use-local-storage';
import { TableEmptyState, TableNoMatchState } from '../components/table-states';
import { todoListTableColumnDefinitions } from '../components/todo-list-table/config';
import type { TodoItemSchema } from '../schema';

const todoSortComparator = (a: TodoItemSchema, b: TodoItemSchema) => {
  const dateA = new Date(a.dueDate).getTime();
  const dateB = new Date(b.dueDate).getTime();

  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;

  if (a.status === b.status) return 0;
  if (a.status === 'success') return 1;
  if (a.status === 'in-progress') return -1;

  return 0;
};

const useTodoListTable = (items: readonly TodoItemSchema[]) => {
  const [selectedTodoItems, setSelectedTodoItems] = useState<TodoItemSchema[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [preferences, _setPreferences] = useLocalStorage<CollectionPreferencesProps.Preferences>({
    localstorageKey: 'React-Todo-Items-Table-Preferences',
    initialValue: {
      contentDensity: 'compact',
      pageSize: 10,
      wrapLines: true,
    },
  });

  const {
    items: todoItems,
    actions,
    collectionProps,
  } = useCollection(items, {
    filtering: {
      empty: <TableEmptyState resource='todo item' />,
      noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
    },
    pagination: { pageSize: 30 },
    sorting: {
      defaultState: {
        sortingColumn: {
          sortingField: todoListTableColumnDefinitions[0].id,
          sortingComparator: todoSortComparator,
        },
      },
    },
    selection: {},
  });

  const isStatusDropdownDisabled = () => {
    if (selectedTodoItems.length === 0) return true;
    const firstItemStatus = selectedTodoItems[0].status;
    return !selectedTodoItems.every((item) => item.status === firstItemStatus);
  };

  return {
    todoItems,
    selectedTodoItems,
    setSelectedTodoItems,
    preferences,
    collectionProps,
    actions,
    isStatusDropdownDisabled,
  };
};

export default useTodoListTable;

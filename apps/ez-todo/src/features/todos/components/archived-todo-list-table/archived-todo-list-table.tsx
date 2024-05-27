import { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useCollection } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components';
import { Button, Header, SpaceBetween, Table } from '@cloudscape-design/components';

import { useLocalStorage } from '../../../../common/hooks/use-local-storage';
import type { TodoItemSchema } from '../../schema';
import { TableEmptyState, TableNoMatchState } from '../table-states';
import { baseTodoListTableColumnDefinitions } from '../todo-list-table/config';

type ArchivedTodoListTableProps = {
  items: readonly TodoItemSchema[];
  onRestore: (id: string) => void;
  onPermanentlyDelete: (id: string) => void;
};

const useArchivedTodoListTable = (items: readonly TodoItemSchema[]) => {
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
    propertyFiltering: {
      filteringProperties: [],
      empty: <TableEmptyState resource='todo item' />,
      noMatch: <TableNoMatchState onClearFilter={() => actions.setFiltering('')} />,
    },
    pagination: { pageSize: preferences.pageSize ?? 10 },
    sorting: { defaultState: { sortingColumn: { sortingField: 'dueDate' }, isDescending: false } },
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

type TodoListHeaderProps = {
  selectedTodoItems: TodoItemSchema[];
  setSelectedTodoItems: (items: TodoItemSchema[]) => void;
  isStatusDropdownDisabled: () => boolean;
  onRestore: (id: string) => void;
  onPermanentlyDelete: (id: string) => void;
};

const TodoListHeader = ({
  selectedTodoItems,
  setSelectedTodoItems,
  isStatusDropdownDisabled,
  onRestore,
  onPermanentlyDelete,
}: TodoListHeaderProps) => (
  <Header
    variant='h2'
    actions={
      <SpaceBetween size='s' direction='horizontal'>
        <Button
          disabled={isEmpty(selectedTodoItems)}
          onClick={(event) => {
            event.preventDefault();
            onPermanentlyDelete(selectedTodoItems[0].id);
            setSelectedTodoItems([]);
          }}
        >
          Delete
        </Button>
        <Button
          variant='primary'
          disabled={isEmpty(selectedTodoItems)}
          onClick={(event) => {
            event.preventDefault();
            onRestore(selectedTodoItems[0].id);
            setSelectedTodoItems([]);
          }}
        >
          Restore
        </Button>
      </SpaceBetween>
    }
  >
    Archived todo items
  </Header>
);

export const ArchivedTodoListTable = ({
  items,
  onRestore,
  onPermanentlyDelete,
}: ArchivedTodoListTableProps) => {
  const {
    todoItems,
    selectedTodoItems,
    setSelectedTodoItems,
    preferences,
    collectionProps,
    isStatusDropdownDisabled,
  } = useArchivedTodoListTable(items);

  return (
    <Table
      {...collectionProps}
      resizableColumns
      enableKeyboardNavigation
      variant='borderless'
      totalItemsCount={todoItems.length}
      columnDefinitions={baseTodoListTableColumnDefinitions}
      items={todoItems}
      selectionType='multi'
      selectedItems={selectedTodoItems}
      loadingText='Fetching todo items...'
      columnDisplay={preferences.contentDisplay}
      wrapLines={preferences.wrapLines}
      stripedRows={preferences.stripedRows}
      contentDensity={preferences.contentDensity}
      stickyColumns={preferences.stickyColumns}
      header={
        <TodoListHeader
          selectedTodoItems={selectedTodoItems}
          setSelectedTodoItems={setSelectedTodoItems}
          isStatusDropdownDisabled={isStatusDropdownDisabled}
          onRestore={onRestore}
          onPermanentlyDelete={onPermanentlyDelete}
        />
      }
      onSelectionChange={(event) => setSelectedTodoItems(event.detail.selectedItems)}
    />
  );
};

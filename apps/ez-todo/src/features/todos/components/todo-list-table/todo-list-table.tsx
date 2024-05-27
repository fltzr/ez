import { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { useCollection } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components';
import { Button, ButtonDropdown, Header, SpaceBetween, Table } from '@cloudscape-design/components';

import { todoListTableColumnDefinitions } from './config';
import { useLocalStorage } from '../../../../common/hooks/use-local-storage';
import type { TodoItemSchema } from '../../schema';
import { TableEmptyState, TableNoMatchState } from '../table-states';

type TodoListTableProps = {
  items: readonly TodoItemSchema[];
  onSave: (item: Partial<TodoItemSchema>) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
};

const todoSortComparator = (a: TodoItemSchema, b: TodoItemSchema) => {
  const dateA = new Date(a.dueDate).getDate();
  const dateB = new Date(b.dueDate).getDate();

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

type TodoListHeaderProps = {
  selectedTodoItems: TodoItemSchema[];
  setSelectedTodoItems: (items: TodoItemSchema[]) => void;
  isStatusDropdownDisabled: () => boolean;
  onSave: (data: Partial<TodoItemSchema>) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
};

const TodoListHeader = ({
  selectedTodoItems,
  setSelectedTodoItems,
  isStatusDropdownDisabled,
  onSave,
  onArchive,
}: TodoListHeaderProps) => (
  <Header
    variant='h2'
    actions={
      <SpaceBetween size='s' direction='horizontal'>
        <ButtonDropdown
          disabled={isStatusDropdownDisabled()}
          items={[
            {
              id: 'mark-completed',
              text: 'Mark completed',
              disabled: selectedTodoItems[0]?.status === 'success',
            },
            {
              id: 'mark-in-progress',
              text: 'Mark in-progress',
              disabled: selectedTodoItems[0]?.status === 'in-progress',
            },
          ]}
          onItemClick={(event) => {
            const status = event.detail.id === 'mark-completed' ? 'success' : 'in-progress';
            onSave({ ...selectedTodoItems[0], status });
            setSelectedTodoItems([]);
          }}
        >
          Mark status
        </ButtonDropdown>
        <Button
          disabled={isEmpty(selectedTodoItems)}
          onClick={(event) => {
            event.preventDefault();
            onArchive(selectedTodoItems[0].id);
            setSelectedTodoItems([]);
          }}
        >
          Archive
        </Button>
        <Button
          variant='primary'
          disabled={isEmpty(selectedTodoItems) || selectedTodoItems[0].status === 'success'}
          onClick={(event) => {
            event.preventDefault();
            onSave({ ...selectedTodoItems[0], status: 'success' });
            setSelectedTodoItems([]);
          }}
        >
          Mark completed
        </Button>
      </SpaceBetween>
    }
  >
    Todo Items
  </Header>
);

export const TodoListTable = ({ items, onSave, onDelete, onArchive }: TodoListTableProps) => {
  const {
    todoItems,
    selectedTodoItems,
    setSelectedTodoItems,
    preferences,
    collectionProps,
    isStatusDropdownDisabled,
  } = useTodoListTable(items);

  return (
    <Table
      {...collectionProps}
      resizableColumns
      enableKeyboardNavigation
      totalItemsCount={todoItems.length}
      columnDefinitions={todoListTableColumnDefinitions}
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
          onSave={onSave}
          onDelete={onDelete}
          onArchive={onArchive}
        />
      }
      onSelectionChange={(event) => setSelectedTodoItems(event.detail.selectedItems)}
      submitEdit={async (item, column, newValue) => {
        onSave({ ...item, [column.sortingField as string]: newValue });
        setSelectedTodoItems([]);
      }}
    />
  );
};

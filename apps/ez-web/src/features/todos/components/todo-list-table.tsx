import { useState } from 'react';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Button,
  type CollectionPreferencesProps,
  Header,
  Select,
  StatusIndicator,
  Table,
  type TableProps,
} from '@cloudscape-design/components';

import { TableEmptyState, TableNoMatchState } from './table-states';
import { useLocalStorage } from '../../../common/hooks/use-local-storage';

export const todoItemSchema = z.object({
  id: z.string().default(() => nanoid(5)),
  title: z
    .string({ message: 'Title is required for a todo item.' })
    .min(1, 'Title is required for a todo item.')
    .max(25, 'Title must be less than 25 characters.'),
  description: z.string().max(50, 'Description must be less than 25 characters.').optional(),

  status: z.enum(['success', 'in-progress', 'info']).default('in-progress'),
});

export type TodoItemSchema = z.infer<typeof todoItemSchema>;

const getStatusText = (status: TodoItemSchema['status']) =>
  status === 'success'
    ? 'Completed'
    : status === 'in-progress'
      ? 'In progress'
      : status === 'info'
        ? 'Attention'
        : '';

const todoListTableColumnDefinitions: TableProps<Partial<TodoItemSchema>>['columnDefinitions'] = [
  {
    id: 'title',
    sortingField: 'title',
    header: 'Title',
    cell: (item) => item.title,
  },
  {
    id: 'description',
    sortingField: 'description',
    header: 'Description',
    cell: (item) => item.description,
  },
  {
    id: 'status',
    sortingField: 'status',
    header: 'Status',
    cell: (item) => (
      <StatusIndicator type={item.status}>
        {getStatusText(item.status ?? 'in-progress')}
      </StatusIndicator>
    ),
    editConfig: {
      editingCell: (item, ctx) => {
        return (
          <Select
            placeholder='Status'
            selectedOption={ctx.currentValue}
            onChange={(event) => {
              ctx.setValue(event.detail.selectedOption.value);
            }}
            options={[
              { value: 'success', label: 'Completed' },
              { value: 'in-progress', label: 'In progress' },
            ]}
          />
        );
      },
    },
  },
];

type TodoListTableProps = {
  items: readonly TodoItemSchema[];
};

export const TodoListTable = ({ items }: TodoListTableProps) => {
  const [selectedTodoItems, setSelectedTodoItems] = useState<TodoItemSchema[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [preferences, _setPreferences] = useLocalStorage<CollectionPreferencesProps.Preferences>({
    localstorageKey: 'React-Todo-Items-Table-Preferences',
    initialValue: {},
  });

  const {
    items: todoItems,
    actions,
    collectionProps,
  } = useCollection(items, {
    propertyFiltering: {
      filteringProperties: [],
      empty: <TableEmptyState resource={'todo item'} />,
      noMatch: (
        <TableNoMatchState
          onClearFilter={() => {
            actions.setFiltering('');
          }}
        />
      ),
    },
    pagination: { pageSize: preferences.pageSize ?? 10 },
    sorting: { defaultState: { sortingColumn: todoListTableColumnDefinitions[0] } },
    selection: {},
  });

  return (
    <Table
      {...collectionProps}
      resizableColumns
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
        <Header variant='h2' actions={<Button variant='primary'>Add todo item</Button>}>
          Todo items
        </Header>
      }
      onSelectionChange={({ detail }) => {
        setSelectedTodoItems(detail.selectedItems);
      }}
    />
  );
};

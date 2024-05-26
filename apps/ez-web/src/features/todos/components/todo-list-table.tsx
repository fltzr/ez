import { useState } from 'react';
import { isEmpty } from 'lodash-es';
import { DateTime } from 'luxon';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Box,
  Button,
  ButtonDropdown,
  type CollectionPreferencesProps,
  DatePicker,
  Header,
  Input,
  SpaceBetween,
  StatusIndicator,
  Table,
  type TableProps,
  Textarea,
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
  dueDate: z
    .string({ message: 'Due date is required for a todo item.' })
    .date('Due date must be a valid date.')
    .optional()
    .default(() => DateTime.now().toFormat('yyyy-MM-dd')),
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
    id: 'dueDate',
    sortingField: 'dueDate',
    header: 'Due date',
    cell: (item) => <Box>{item.dueDate ?? '—'}</Box>,
    minWidth: 176,
    editConfig: {
      editingCell: (item, ctx) => {
        const value = ctx.currentValue ?? item.dueDate;

        return (
          <DatePicker
            expandToViewport
            placeholder='YYYY-MM-DD'
            value={value}
            onChange={(event) => {
              ctx.setValue(event.detail.value);
            }}
          />
        );
      },
    },
  },
  {
    id: 'title',
    sortingField: 'title',
    header: 'Title',
    cell: (item) => item.title,
    minWidth: 176,
    editConfig: {
      editingCell: (item, ctx) => {
        const value = ctx.currentValue ?? item.title;

        return (
          <Input
            disableBrowserAutocorrect
            type='text'
            placeholder={value ?? 'Title'}
            value={value}
            onChange={(event) => {
              ctx.setValue(event.detail.value);
            }}
          />
        );
      },
    },
  },
  {
    id: 'description',
    sortingField: 'description',
    header: 'Description',
    cell: (item) => item.description ?? '—',
    minWidth: 176,
    editConfig: {
      editingCell: (item, ctx) => {
        const value = ctx.currentValue ?? item.title;

        return (
          <Textarea
            disableBrowserAutocorrect
            rows={5}
            placeholder={value ?? 'Description'}
            value={value}
            onChange={(event) => {
              ctx.setValue(event.detail.value);
            }}
          />
        );
      },
    },
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
  },
];

type TodoListTableProps = {
  items: readonly TodoItemSchema[];
  onSave: (data: Partial<TodoItemSchema>) => void;
};

export const TodoListTable = ({ items, onSave }: TodoListTableProps) => {
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
    sorting: {},
    selection: {},
  });

  const isStatusDropdownDisabled = () => {
    if (selectedTodoItems.length === 0) return true;

    const firstItemStatus = selectedTodoItems[0].status;

    return !selectedTodoItems.every((item) => item.status === firstItemStatus);
  };

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
        <Header
          variant='h2'
          actions={
            <SpaceBetween direction='horizontal' size='s'>
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
                  switch (event.detail.id) {
                    case 'mark-completed':
                      break;
                  }
                }}
              >
                Mark status
              </ButtonDropdown>
              <Button disabled={isEmpty(selectedTodoItems)}>Delete</Button>
            </SpaceBetween>
          }
        >
          Todo items
        </Header>
      }
      onSelectionChange={({ detail }) => {
        setSelectedTodoItems(detail.selectedItems);
      }}
      submitEdit={async (item, column, newValue) => {
        console.log(
          `submitEdit:\nitem: ${JSON.stringify(item, null, 2)}\ncolumn: ${JSON.stringify(column, null, 2)}\nnewValue: ${JSON.stringify(newValue, null, 2)}`
        );

        await new Promise((e) => setTimeout(e, 1e3));

        return onSave({ ...item, [column.sortingField as string]: newValue });
      }}
    />
  );
};

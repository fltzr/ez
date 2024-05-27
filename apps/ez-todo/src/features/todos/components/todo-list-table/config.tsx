import { toNumber } from 'lodash-es';
import { DateTime } from 'luxon';
import type { BoxProps, TableProps } from '@cloudscape-design/components';
import { Box, DatePicker, Input, StatusIndicator, Textarea } from '@cloudscape-design/components';

import type { TodoItemSchema } from '../../schema';

const getStatusText = (status: TodoItemSchema['status']) =>
  status === 'success'
    ? 'Completed'
    : status === 'in-progress'
      ? 'In progress'
      : status === 'info'
        ? 'Attention'
        : '';

const getStatusColor = (date: string | undefined): BoxProps['color'] => {
  if (date === '' || typeof date === 'undefined') {
    return 'text-status-inactive';
  }

  const today = DateTime.local().startOf('day');
  const dateToCheck = DateTime.fromFormat(date, 'yyyy-MM-dd');

  if (dateToCheck < today) {
    return 'text-status-error';
  } else if (dateToCheck.equals(today)) {
    return 'text-status-warning';
  } else {
    return 'text-label';
  }
};

export const baseTodoListTableColumnDefinitions: TableProps<
  Partial<TodoItemSchema>
>['columnDefinitions'] = [
  {
    id: 'dueDate',
    sortingField: 'dueDate',
    header: 'Due date',
    cell: (item) => {
      const status = getStatusColor(item.dueDate);
      return <Box color={status}>{item.dueDate === '' ? '—' : item.dueDate}</Box>;
    },
  },
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
    cell: (item) => item.description ?? '—',
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

type ColumnEditConfig = {
  [key: string]: TableProps.EditConfig<TodoItemSchema>;
};

const editableTodoListColumns: ColumnEditConfig = {
  dueDate: {
    editingCell: (item, ctx) => (
      <DatePicker
        expandToViewport
        placeholder='YYYY-MM-DD'
        value={ctx.currentValue ?? item.dueDate}
        onChange={(event) => {
          ctx.setValue(event.detail.value);
        }}
      />
    ),
  },
  title: {
    editingCell: (item, ctx) => (
      <Input
        disableBrowserAutocorrect
        type='text'
        placeholder={ctx.currentValue ?? item.title ?? 'Title'}
        value={ctx.currentValue ?? item.title}
        onChange={(event) => {
          ctx.setValue(event.detail.value);
        }}
      />
    ),
  },
  description: {
    editingCell: (item, ctx) => (
      <Textarea
        disableBrowserAutocorrect
        rows={5}
        placeholder={item.description ?? 'Description'}
        value={ctx.currentValue ?? item.description}
        onChange={(event) => {
          ctx.setValue(event.detail.value);
        }}
      />
    ),
  },
};

export const todoListTableColumnDefinitions: TableProps<TodoItemSchema>['columnDefinitions'] =
  baseTodoListTableColumnDefinitions.map((column) => {
    if (column.id && editableTodoListColumns[column.id]) {
      return {
        ...column,
        minWidth: Math.max(toNumber(column.minWidth || 0), 176),
        editConfig: { ...editableTodoListColumns[column.id] },
      };
    }
    return column;
  });

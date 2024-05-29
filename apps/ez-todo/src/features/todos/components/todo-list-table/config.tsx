import { toNumber } from 'lodash-es';
import type { CollectionPreferencesProps, TableProps } from '@cloudscape-design/components';
import {
  Box,
  DatePicker,
  Input,
  Select,
  StatusIndicator,
  Textarea,
} from '@cloudscape-design/components';

import { getStatusColor, getStatusText } from './utils';
import type { TodoItemSchema } from '../../schema';

export const defaultTodoListTablePreferences: CollectionPreferencesProps.Preferences = {
  pageSize: 30,
};

export const baseTodoListTableColumnDefinitions: TableProps<
  Partial<TodoItemSchema>
>['columnDefinitions'] = [
  {
    id: 'dueDate',
    sortingField: 'dueDate',
    header: 'Due date',
    minWidth: 220,
    cell: (item) => {
      const status = getStatusColor(item.dueDate);
      return <Box color={status}>{item.dueDate === '' ? '—' : item.dueDate}</Box>;
    },
  },
  {
    id: 'urgency',
    sortingField: 'urgency',
    header: 'Urgency',
    cell: (item) => {
      const urgency = item.urgency ?? 1;
      return (
        <Box color='text-label'>
          {urgency === 1 ? '❗️' : urgency === 2 ? '❗️❗️' : urgency === 3 ? '❗️❗️❗️' : '—'}
        </Box>
      );
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
  urgency: {
    editingCell: (item, ctx) => {
      const options = [
        { value: '1', label: 'Low' },
        { value: '2', label: 'Medium' },
        { value: '3', label: 'High' },
      ];

      return (
        <Select
          selectedOption={
            options.find(
              (option) => option.value === (ctx.currentValue ?? item.urgency?.toString())
            ) ?? options[0]
          }
          options={options}
          onChange={(event) => {
            ctx.setValue(event.detail.selectedOption.value);
          }}
        />
      );
    },
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

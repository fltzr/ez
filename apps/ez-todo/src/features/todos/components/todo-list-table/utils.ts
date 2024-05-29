import type { BoxProps } from '@cloudscape-design/components';
import type { TodoItemSchema } from '../../schema';
import { DateTime } from 'luxon';

export const getStatusText = (status: TodoItemSchema['status']) =>
  status === 'success'
    ? 'Completed'
    : status === 'in-progress'
      ? 'In progress'
      : status === 'info'
        ? 'Attention'
        : '';

export const getStatusColor = (date: string | undefined): BoxProps['color'] => {
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

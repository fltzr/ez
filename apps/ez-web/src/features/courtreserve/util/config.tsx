/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DateTime } from 'luxon';
import { Box, StatusIndicator, type TableProps } from '@cloudscape-design/components';
import type { CourtreserveEvent } from './types';

const formattedDateTime = ({ date }: { date: Date }) => {
  const dt = DateTime.fromJSDate(date);

  return dt.toLocaleString(DateTime.DATETIME_MED);
};

export const eventTableColumnDefinitions: TableProps.ColumnDefinition<CourtreserveEvent>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'ID',
    cell: (item) => item.id,
  },
  {
    id: 'title',
    sortingField: 'title',
    header: 'Title',
    cell: (item) => item.title,
  },
  {
    id: 'start',
    sortingField: 'start',
    header: 'Start',
    cell: (item) => <Box>{formattedDateTime({ date: item.start! })}</Box>,
  },
  {
    id: 'eventType',
    sortingField: 'eventType',
    header: 'Event type',
    cell: (item) => item.eventType,
  },
  {
    id: 'isFull',
    sortingField: 'isFull',
    header: 'Status',
    cell: (item) => (
      <StatusIndicator type={item.isFull ? 'error' : 'success'}>
        {item.isFull ? 'Closed' : 'Open'}
      </StatusIndicator>
    ),
  },
];

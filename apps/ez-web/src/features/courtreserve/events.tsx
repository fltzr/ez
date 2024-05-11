import { useEffect, useState } from 'react';
import { Button, Table } from '@cloudscape-design/components';
import { nanoid } from 'nanoid';
import { isAxiosError } from 'axios';
import { useCourtreserveEventsApi } from './data-access/events-api';
import { type CourtreserveEvent, courtreserveEventSchema } from './util/types';
import { eventTableColumnDefinitions } from './util/config';
import { useAppLayoutStore } from '../../store/use-app-layout-store';
import { useNotificationStore } from '../../store/use-notification-store';

const CourtreserveEventsPage = () => {
  const { setContentLayout } = useAppLayoutStore((s) => ({
    setContentLayout: s.setContentLayout,
  }));
  const { addNotification, removeNotification } = useNotificationStore((s) => ({
    addNotification: s.addNotification,
    removeNotification: s.removeNotification,
  }));
  const { data, isLoading, isError, refetch } = useCourtreserveEventsApi();
  const [events, setEvents] = useState<Partial<CourtreserveEvent>[]>([]);

  useEffect(() => {
    setContentLayout('table');

    return () => {
      setContentLayout('default');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isError) {
      return;
    }

    const uid = nanoid(11);

    addNotification({
      id: uid,
      type: 'warning',
      header: 'Failed to fetch events. Try again?',
      action: (
        <Button
          variant="normal"
          onClick={() => {
            refetch()
              .then(() => {
                removeNotification(uid);
              })
              .catch((error) => {
                if (isAxiosError(error)) {
                  addNotification({
                    id: nanoid(11),
                    type: 'error',
                    header: 'Failed to fetch events. Please try again later.',
                  });
                }
              });
          }}
        >
          Retry
        </Button>
      ),
    });
  }, [isError, refetch, addNotification, removeNotification]);

  useEffect(() => {
    const parseEvents = async () => {
      if (!Array.isArray(data?.events)) {
        return;
      }

      const results = await courtreserveEventSchema
        .partial()
        .array()
        .safeParseAsync(data.events);

      if (results.error) {
        console.error(results.error);

        return;
      }

      setEvents(
        results.data.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.start,
          eventType: e.eventType,
          isFull: e.isFull,
        }))
      );
    };

    parseEvents().catch((error) => {
      console.error(`Error while parsing: ${JSON.stringify(error, null, 2)}`);
    });
  }, [data?.events, refetch, addNotification, removeNotification]);

  return (
    <Table<CourtreserveEvent>
      variant="embedded"
      items={events}
      columnDefinitions={eventTableColumnDefinitions}
      loading={isLoading}
    />
  );
};

export const Component = CourtreserveEventsPage;

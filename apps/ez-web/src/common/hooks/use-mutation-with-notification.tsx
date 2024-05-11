import { Button } from '@cloudscape-design/components';
import { type MutationFunction, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { nanoid } from 'nanoid';
import type { ReactNode } from 'react';
import { useNotificationStore } from '../../store/use-notification-store';

type MutationContext = {
  inProgressNotificationId: string;
  successNotificationId?: string;
  errorNotificationId?: string;
  setteledNotificationId?: string;
};

type UseMutationWithNotificationProps<TData, TVariables> = {
  mutationFn: MutationFunction<TData, TVariables>;
  options?: UseMutationOptions<TData, AxiosError, TVariables, MutationContext>;
  config?: {
    retryOnFailsure?: boolean;
    inProgressMessage?: ReactNode;
    successMessage?: ReactNode;
    errorMessage?: ReactNode;
  };
};

export const useMutationWithNotification = <TData, TVariables>({
  mutationFn,
  options,
  config,
}: UseMutationWithNotificationProps<TData, TVariables>) => {
  const { addNotification, removeNotification } = useNotificationStore();

  const mutation = useMutation<TData, AxiosError, TVariables, MutationContext>({
    mutationFn,
    onMutate: () => {
      const notificationId = nanoid(5);

      addNotification({
        id: notificationId,
        type: 'in-progress',
        loading: true,
        header: config?.inProgressMessage ?? 'Operation in progress...',
      });

      return { inProgressNotificationId: notificationId };
    },
    onSuccess: (data, variables, context) => {
      removeNotification(context.inProgressNotificationId);

      const notificationId = nanoid(5);

      addNotification({
        id: notificationId,
        type: 'success',
        header: config?.successMessage ?? 'Operation successful',
        dismissible: true,
      });

      options?.onSuccess?.(data, variables, context);

      return { successNotificationId: notificationId };
    },
    onError: (error, variables, context) => {
      if (context?.inProgressNotificationId) {
        removeNotification(context.inProgressNotificationId);
      }

      const notificationId = nanoid(5);

      addNotification({
        id: notificationId,
        type: 'error',
        header: config?.errorMessage ?? 'Operation failed',
        dismissible: true,
        action: config?.retryOnFailsure ? (
          <Button
            iconName='refresh'
            onClick={(event) => {
              event.preventDefault();
              removeNotification(notificationId);
              mutation.mutate(variables, options);
            }}
          >
            Retry
          </Button>
        ) : undefined,
      });

      options?.onError?.(error, variables, context);
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
};

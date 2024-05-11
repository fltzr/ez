/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/consistent-type-definitions */

import '@tanstack/react-query';
import type { FlashbarProps } from '@cloudscape-design/components';
import type { AxiosError } from 'axios';

declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
  } & {};

  type NotificationItem = FlashbarProps.MessageDefinition & {
    autoDismiss?: boolean;
  };
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

export {};

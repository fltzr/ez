/* eslint-disable @typescript-eslint/ban-types */

import '@tanstack/react-query';
import type { AxiosError } from 'axios';

declare global {
  type Prettify<T> = {
    [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K];
  } & {};
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}

export {};

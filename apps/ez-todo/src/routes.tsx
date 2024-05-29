import { type RouteObject, createBrowserRouter } from 'react-router-dom';

import { requireAuthLoader } from './common/utils/require-auth-loader';

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('./common/components/root-layout/root-layout'),
    children: [
      {
        index: true,
        lazy: () => import('./features/home'),
        loader: requireAuthLoader,
        handle: {
          crumb: 'Home',
        },
      },
      {
        path: 'todos',
        lazy: () => import('./features/todos/todo'),
        loader: requireAuthLoader,
        handle: {
          crumb: 'Todos',
        },
      },
    ],
  },
  {
    path: 'signin',
    lazy: () => import('./features/auth/sign-in/sign-in'),
  },
];

export const router = createBrowserRouter(routes);

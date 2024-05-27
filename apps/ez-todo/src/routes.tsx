import { type RouteObject, createBrowserRouter } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    lazy: () => import('./common/components/root-layout/root-layout'),
    children: [
      {
        index: true,
        lazy: () => import('./features/home'),
        handle: {
          crumb: 'Home',
        },
      },
      {
        path: 'todos',
        lazy: () => import('./features/todos/todo'),
        handle: {
          crumb: 'Todos',
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

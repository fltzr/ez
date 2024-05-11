import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';

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
        path: 'courtreserve/events',
        lazy: () => import('./features/courtreserve/events'),
        handle: {
          crumb: 'Courtreserve',
        },
      },
      {
        path: 'settings',
        lazy: () => import('./features/settings/settings'),
        handle: {
          crumb: 'Settings',
        },
        children: [
          {
            index: true,
            element: <Navigate replace to='/settings/profile' />,
          },
          {
            path: 'profile',
            lazy: () => import('./features/settings/profile/profile'),
            handle: {
              crumb: 'Account',
            },
          },
          {
            path: 'security',
            lazy: () => import('./features/settings/security'),
          },
        ],
      },
      {
        path: 'products',
        handle: {
          crumb: 'Products',
        },
        children: [
          {
            index: true,
            element: <Navigate replace to='/products/create' />,
          },
          {
            path: 'create',
            lazy: () => import('./features/products/create'),
            handle: {
              crumb: 'Create',
            },
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

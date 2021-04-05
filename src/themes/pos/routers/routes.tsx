import React from 'react';

export const posRoutes = [
  {
    path: '/pos',
    name: 'pos',
    title: 'Point of Sales',
    exact: true,
    permission: '',
    component: React.lazy(() => import('../pages/Home')),
    isLayout: false,
    isGuarded: false,
  },
];

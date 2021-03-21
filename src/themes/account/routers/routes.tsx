import React from 'react';

export const accountsRoutes = [
  {
    path: '/',
    name: 'home',
    title: 'Home Page',
    exact: true,
    permission: '',
    component: React.lazy(() => import('../pages/Home')),
    isLayout: false,
    isGuarded: true,
  },
];

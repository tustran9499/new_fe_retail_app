import React from 'react';

export const productsRoutes = [
  {
    path: '/product',
    name: 'home',
    title: 'Home Page',
    exact: true,
    permission: '',
    component: React.lazy(() => import('../pages/Home')),
    isLayout: false,
    isGuarded: false,
  },
];

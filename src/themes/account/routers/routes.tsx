import React from 'react';

export const accountsRoutes = [
  {
    path: '/account',
    name: 'home',
    title: 'Home Page',
    exact: true,
    permission: '',
    component: React.lazy(() => import('../pages/Home')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: '/account/login',
    name: 'account.login',
    title: 'Login',
    exact: true,
    permission: '',
    component: React.lazy(() => import('../pages/Login')),
    isLayout: false,
    isGuarded: false,
  },
];

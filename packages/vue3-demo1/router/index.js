import { createWebHistory, createRouter } from 'vue-router';

import Home from '@pages/Home/index';
import Grammar from '@pages/Home/grammar';
import Base from '@pages/Base/index';
import Observable from '@pages/Learn/observable';

const routes = [
  {
    path: '/',
    redirect: '/grammar',
    component: Home,
    children: [
      {
        path: 'grammar',
        component: Grammar,
        children: [
          {
            path: 'base',
            component: Base,
          },
          {
            path: 'observable',
            component: Observable,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

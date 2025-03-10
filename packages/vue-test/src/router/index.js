import { createWebHistory, createRouter } from 'vue-router';
import Home from '@pages/Home/index';
import Event from '@pages/Event/index';
import Flex from '@pages/Flex/index';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/event',
    component: Event,
  },
  {
    path: '/flex',
    component: Flex,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

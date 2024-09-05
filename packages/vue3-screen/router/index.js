import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '@/Home/HomeView'

const routes = [
  {
    path: '/',
    component: HomeView
  },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
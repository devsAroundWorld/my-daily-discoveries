import { createRouter, createWebHistory } from 'vue-router'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRouters'

const routes = [
  ...publicRoutes,
  ...privateRoutes,
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router

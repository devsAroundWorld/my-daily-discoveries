import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const requireAuth = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore()
  const user = await authStore.currentUser()
  if (user) {
    next()
  } else {
    next('/')
  }
}

export const privateRoutes = [
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/private/UserView.vue'),
    beforeEnter: requireAuth,
    redirect: '/user/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/private/DashboardView.vue'),
      }
    ],
  }
]
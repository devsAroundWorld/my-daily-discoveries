import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const requireAuth = async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore()
  authStore.loadingSession = true
  const user = await authStore.currentUser()
  if (user) {
    next()
  } else {
    next('/')
  }
  authStore.loadingSession = false
}

const routes = [
  {
    path: '/',
    name: 'landingPage',
    component: () => import('../views/LandingPageView.vue'),
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/SignUpView.vue'),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/ResetPasswordView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})


export default router

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { UserDataInterface } from '@/models/User'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('../views/SignUpView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()
  const user = await store.currentUser() as UserDataInterface
  if (to.meta.requiresAuth && !user?.uid  && !store.isLoggedIn) {
    //TODO: Mandar un toast notifucation de necesitas autenticarte
    console.log('Necesitas auntenticarte')
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router

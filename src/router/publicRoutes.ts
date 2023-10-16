export const publicRoutes = [
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
    path: '/sign-in',
    name: 'sign-in',
    component: () => import('../views/SignInView.vue'),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/ResetPasswordView.vue')
  }
]
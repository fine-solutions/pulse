import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/auth/reg',
      name: 'reg',
      component: AuthView,
    },
    {
      path: '/auth/lost',
      name: 'lost',
      component: AuthView,
    },
  ],
})

export default router

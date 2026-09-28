import { createRouter, createWebHistory } from 'vue-router'
import SplashView from '../views/SplashView.vue'
import MainView from '@/views/MainView.vue'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/start',
      name: 'splash',
      component: SplashView,
    },
    {
      path: '/',
      name: 'main',
      component: MainView,
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
    {
      path: '/auth/code',
      name: 'code',
      component: AuthView,
    },
    {
      path: '/auth/pass',
      name: 'pass',
      component: AuthView,
    },
  ],
})

export default router

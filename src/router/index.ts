import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/Hoteles',
      name: 'Hoteles',
      component: () => import('../views/HotelesView.vue')
    },
    {
      path: '/UHoteles',
      name: 'UHoteles',
      component: () => import('../views/UHotelesView.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router

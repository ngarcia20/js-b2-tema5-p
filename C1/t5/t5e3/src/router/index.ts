import { createRouter, createWebHistory } from 'vue-router'
import StationsView from '@/views/StationsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'stations',
      component: StationsView,
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import SearchFormView from '@/views/SearchFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search-form',
      component: SearchFormView,
    },
    {
      path: '/search/results',
      name: 'search-results',
      component: () => import('@/views/SearchResultsView.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import SearchBooksView from '@/views/SearchBooksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search-books',
      component: SearchBooksView,
    },
  ],
})

export default router

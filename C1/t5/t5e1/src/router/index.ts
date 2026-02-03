import { createRouter, createWebHistory } from 'vue-router'
import BooksView from '@/views/BooksView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/books',
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView,
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/CharactersView.vue'),
    },
  ],
})

export default router

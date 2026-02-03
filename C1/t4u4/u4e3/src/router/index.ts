import { createRouter, createWebHistory } from 'vue-router'
import { roleGuard } from '@/router/guards/roleGuard'
import Guest from '@/views/Guest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'guest',
      component: Guest,
    },
    {
      path: '/admin/config',
      name: 'admin-config',
      component: () => import('@/views/AdminConfig.vue'),
      beforeEnter: [roleGuard(['Admin'])],
    },
    {
      path: '/admin/editor',
      name: 'editor-panel',
      component: () => import('@/views/EditorPanel.vue'),
      beforeEnter: [roleGuard(['Editor', 'Admin'])],
    },
  ],
})

export default router

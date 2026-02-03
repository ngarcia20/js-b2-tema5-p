import { createRouter, createWebHistory } from 'vue-router'
import StudentsListView from '@/views/StudentsListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'students-list',
      component: StudentsListView,
    },
    {
      path: '/students/:id',
      name: 'student-detail',
      component: () => import('@/views/StudentDetailView.vue'),
      props: true,
    },
  ],
})

export default router

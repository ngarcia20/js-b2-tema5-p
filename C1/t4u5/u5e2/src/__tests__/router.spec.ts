import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import App from '@/App.vue'
import StudentsListView from '@/views/StudentsListView.vue'
import StudentDetailView from '@/views/StudentDetailView.vue'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'students-list', component: StudentsListView },
      {
        path: '/student/:id',
        name: 'student-detail',
        component: StudentDetailView,
        props: true,
      },
    ],
  })
}

describe('Navegación de estudiantes', () => {
  it('debería mostrar la lista de estudiantes en la ruta raíz "/"', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    expect(wrapper.get('[data-test="students-title"]').text()).toContain('Listado')
    expect(wrapper.get('[data-test="students-list"]').text()).toContain('Joan Puig')
  })

  it('debería mostrar el detalle del estudiante en la ruta "/student/:id"', async () => {
    const router = createTestRouter()
    await router.push('/student/1')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    expect(wrapper.get('[data-test="detail-title"]').text()).toContain('Detalle')
    expect(wrapper.get('[data-test="detail-card"]').text()).toContain('Joan Puig')
  })

  it('debería navegar al detalle del estudiante al hacer clic en un enlace', async () => {
    const router = createTestRouter()
    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    await wrapper.get('[data-test="student-link-1"]').trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/student/1')
    expect(wrapper.get('[data-test="detail-card"]').text()).toContain('Joan Puig')
  })

  it('debería navegar de vuelta a la lista al hacer clic en "Volver al listado"', async () => {
    const router = createTestRouter()
    await router.push('/student/1')
    await router.isReady()

    const wrapper = mount(App, {
      global: { plugins: [router] },
    })

    await wrapper.get('[data-test="back-link"]').trigger('click')
    await flushPromises()

    expect(router.currentRoute.value.path).toBe('/')
    expect(wrapper.get('[data-test="students-title"]').text()).toContain('Listado')
  })
})

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { students } from '@/data/students'

const props = defineProps<{ id: string }>()

const student = computed(() => {
  const id = Number(props.id)
  return students.find((item) => item.id === id)
})
</script>

<template>
  <section class="container">
    <header class="header">
      <h1>Detalle del alumno: {{ student?.name }}</h1>
      <RouterLink to="/" class="back">< Volver al listado</RouterLink>
    </header>

    <div v-if="student" class="card">
      <p><strong>ID:</strong> {{ student.id }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Curso:</strong> {{ student.course }}</p>
    </div>

    <p v-else class="empty">Alumno no encontrado.</p>
  </section>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.back {
  text-decoration: none;
  color: #2563eb;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
}

.empty {
  color: #6b7280;
}
</style>

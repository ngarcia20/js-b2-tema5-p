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
  <section>
    <h1 data-test="detail-title">Detalle del alumno</h1>
    <div v-if="student" data-test="detail-card">
      <p><strong>Nombre:</strong> {{ student.name }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Curso:</strong> {{ student.course }}</p>
    </div>
    <p v-else>Alumno no encontrado.</p>

    <RouterLink to="/" data-test="back-link">Volver al listado</RouterLink>
  </section>
</template>

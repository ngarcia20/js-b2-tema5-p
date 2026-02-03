<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { students } from '@/data/students'
</script>

<template>
  <section>
    <h1 data-test="students-title">Listado de alumnos</h1>
    <ul data-test="students-list">
      <li v-for="student in students" :key="student.id">
        <RouterLink
          :to="{ name: 'student-detail', params: { id: student.id } }"
          :data-test="`student-link-${student.id}`"
        >
          {{ student.name }}
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

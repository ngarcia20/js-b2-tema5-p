<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { students } from '@/data/students'
</script>

<template>
  <section class="container">
    <header class="header">
      <h1>Listado Alumnos</h1>
    </header>

    <ul class="list">
      <li v-for="student in students" :key="student.id" class="list-item">
        <RouterLink :to="{ name: 'student-detail', params: { id: student.id } }" class="link">
          <span class="name">{{ student.name }} ({{ student.email }})</span>
          <span class="meta">ID: {{ student.id }}</span>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.header {
  margin-bottom: 1.5rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.link {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}

.link:hover {
  background: #f8fafc;
}

.name {
  font-weight: 600;
}

.meta {
  color: #6b7280;
}
</style>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <h1 class="title">Harry Potter App</h1>
    <nav class="nav">
      <RouterLink to="/books" class="link" data-test="link-books">Libros</RouterLink>
      <RouterLink to="/characters" class="link" data-test="link-characters">
        Personajes
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.title {
  margin: 0;
  font-size: 1.25rem;
}

.nav {
  display: flex;
  gap: 1rem;
}

.link {
  text-decoration: none;
  color: #2563eb;
  font-weight: 600;
}

.link.router-link-active {
  color: #111827;
}
</style>

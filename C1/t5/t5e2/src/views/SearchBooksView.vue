<script setup lang="ts">
import { ref } from 'vue'
import { searchBooks, type SearchBook } from '@/services/openLibrary'

const term = ref('')
const loading = ref(false)
const error = ref('')
const results = ref<SearchBook[]>([])

const handleSearch = async () => {
  error.value = ''
  results.value = []

  if (!term.value.trim()) return

  loading.value = true
  try {
    results.value = await searchBooks(term.value.trim())
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

const buildOpenLibraryUrl = (key?: string) => {
  if (!key) return '#'
  return `https://openlibrary.org${key}`
}

const buildCoverUrl = (coverId?: number) => {
  if (!coverId) return ''
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
}
</script>

<template>
  <section class="container">
    <header class="header">
      <h1>Resultados de búsqueda</h1>
    </header>

    <form @submit.prevent="handleSearch" class="form">
      <input v-model="term" type="text" placeholder="Introduce una búsqueda..." class="input" />
      <button type="submit" class="button">Buscar</button>
    </form>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="results.length > 0" class="list">
      <li v-for="book in results" :key="book.key" class="item">
        <img
          v-if="book.cover_i"
          :src="buildCoverUrl(book.cover_i)"
          :alt="book.title"
          class="cover"
        />
        <div>
          <h3>{{ book.title }}</h3>
          <p v-if="book.author_name && book.author_name.length > 0">
            <strong>Autor:</strong> {{ book.author_name[0] }}
          </p>
          <p v-if="book.first_publish_year">
            <strong>Año de primera publicación:</strong> {{ book.first_publish_year }}
          </p>
        </div>
        <a :href="buildOpenLibraryUrl(book.key)" target="_blank" rel="noopener"
          >Ver en OpenLibrary</a
        >
      </li>
    </ul>
    <div v-else>
      <p>No se han encontrado resultados.</p>
    </div>
  </section>
</template>

<style scoped>
.container {
  padding: 1rem;
}

.header {
  margin-bottom: 1rem;
}

.form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input {
  flex: 1;
  padding: 0.5rem;
}

.button {
  padding: 0.5rem 1rem;
}

.error {
  color: #b91c1c;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem;
}

.cover {
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}
</style>

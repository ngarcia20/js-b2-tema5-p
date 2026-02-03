<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BOOKS_API } from '@/services/api'

type Book = {
  id?: string
  title?: string
  releaseDate?: string
  pages?: number
  cover?: string
  description?: string
}

const books = ref<Book[]>([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch(BOOKS_API)
    if (!response.ok) throw new Error('Error al cargar libros')
    books.value = await response.json()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="container">
    <h2>Libros</h2>
    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="grid" v-if="books.length > 0">
      <article v-for="book in books" :key="book.id || book.title" class="card">
        <img v-if="book.cover" :src="book.cover" :alt="book.title" class="cover" />
        <div>
          <h3>{{ book.title }}</h3>
          <p v-if="book.releaseDate"><strong>Fecha:</strong> {{ book.releaseDate }}</p>
          <p v-if="book.pages"><strong>Páginas:</strong> {{ book.pages }}</p>
          <p v-if="book.description">{{ book.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.container {
  padding: 1rem;
}

.error {
  color: #b91c1c;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem;
  display: grid;
  gap: 0.75rem;
}

.cover {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}
</style>

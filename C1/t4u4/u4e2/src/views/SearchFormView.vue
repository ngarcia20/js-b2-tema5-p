<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const searchTerm = ref('')

onMounted(() => {
  const term = route.query.term
  if (term && typeof term === 'string') {
    searchTerm.value = term
  }
})

const handleSearch = () => {
  if (searchTerm.value.trim()) {
    router.push({
      name: 'search-results',
      query: { term: searchTerm.value.trim() },
    })
  }
}
</script>

<template>
  <section class="container">
    <header>
      <h1>Búsqueda</h1>
      <p>Producto</p>
    </header>

    <form @submit.prevent="handleSearch">
      <div>
        <input v-model="searchTerm" type="text" class="input" />
      </div>
      <button type="submit" class="btn">Buscar</button>
    </form>

    <p>Cuando envíes, la aplicación navegará a /search/results?term={{ searchTerm || '...' }}</p>
  </section>
</template>

<style scoped>
.container {
  padding: 2rem;
}

.input {
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 300px;
}

.btn {
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>

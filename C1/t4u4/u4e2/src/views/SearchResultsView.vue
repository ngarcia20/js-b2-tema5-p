<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '@/data/products'

const route = useRoute()

const searchTerm = computed(() => {
  const term = route.query.term
  return typeof term === 'string' ? term : ''
})

const filteredProducts = computed(() => {
  if (!searchTerm.value) return []

  const term = searchTerm.value.toLowerCase()
  return products.filter((product) => product.name.toLowerCase().includes(term))
})
</script>

<template>
  <section class="container">
    <header>
      <h1>Resultados de búsqueda</h1>
      <p>
        Consulta actual: <code>{{ JSON.stringify({ term: searchTerm }) }}</code>
      </p>
      <RouterLink :to="{ name: 'search-form', query: { term: searchTerm } }">
        < Volver al formulario de búsqueda
      </RouterLink>
    </header>

    <div>
      <h2>Resultados ({{ filteredProducts.length }})</h2>
    </div>

    <ul v-if="filteredProducts.length > 0">
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }}
      </li>
    </ul>

    <p v-else>No se encontraron productos que coincidan con "{{ searchTerm }}".</p>
  </section>
</template>

<style scoped>
.container {
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
}
</style>

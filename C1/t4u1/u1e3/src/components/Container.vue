<template>
  <section>
    <div class="filter-controls">
      <button @click="$emit('toggle-filter')">
        {{ isFiltered ? 'Mostrar todas' : 'En cines' }}
      </button>
      <p>{{ counterText }}</p>
    </div>

    <section class="container">
      <article v-for="movie in movies" :key="movie.id" class="card">
        <img :src="movie.image" :alt="movie.name" />
        <h3>{{ movie.name }} ({{ movie.year }})</h3>
        <p>{{ movie.description }}</p>
        <p><strong>Valoración:</strong> {{ movie.rating }}/5</p>
        <small v-for="genre in movie.genres" :key="genre">{{ genre }}, </small>

        <br /><span v-if="movie.inTheaters" class="badge">En cines</span>
      </article>
    </section>
  </section>
</template>

<script setup lang="ts">
import type { Movie } from '@/models/movie.interface'

defineProps<{
  movies: Movie[]
  isFiltered: boolean
  counterText: string
}>()

defineEmits(['toggle-filter'])
</script>

<style scoped>
.filter-controls {
  padding: 1rem;
  text-align: center;
}

.container {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}

.card {
  padding: 1rem;
  width: 300px;
}

img {
  width: 100%;
}

.badge {
  display: inline-block;
  background: green;
  color: white;
  padding: 0.25rem 0.5rem;
  margin-top: 0.5rem;
}
</style>

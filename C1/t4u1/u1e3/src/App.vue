<template>
  <Header />

  <Container
    :movies="filteredMovies"
    :isFiltered="showOnlyTheaters"
    :counterText="counterText"
    @toggle-filter="toggleFilter"
  />

  <Footer />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import moviesData from '@/data/movies.json'
import type { Movie } from '@/models/movie.interface'

import Header from '@/components/Header.vue'
import Container from '@/components/Container.vue'
import Footer from '@/components/Footer.vue'

const movies = ref<Movie[]>(moviesData)
const showOnlyTheaters = ref<boolean>(false)

const filteredMovies = computed(() =>
  showOnlyTheaters.value ? movies.value.filter((m) => m.inTheaters) : movies.value,
)

const counterText = computed(() => {
  if (!showOnlyTheaters.value) {
    return `Mostrando un total de ${movies.value.length} películas`
  }
  return `Mostrando ${filteredMovies.value.length} películas en cines (de ${movies.value.length} totales)`
})

function toggleFilter() {
  showOnlyTheaters.value = !showOnlyTheaters.value
}
</script>

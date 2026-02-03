<script setup lang="ts">
import { computed, ref } from 'vue'
import songsData from '@/data/songs.json'
import type { Song } from '@/models/song.interface'
import SongItem from './SongItem.vue'

const showOnlyHits = ref(false)

const songs = songsData as Song[]

const filteredSongs = computed(() => (showOnlyHits.value ? songs.filter((s) => s.isTopHit) : songs))

const toggleFilter = () => {
  showOnlyHits.value = !showOnlyHits.value
}
</script>

<template>
  <section class="container">
    <div class="actions">
      <button @click="toggleFilter">
        {{ showOnlyHits ? 'Mostrar todas' : 'Éxitos' }}
      </button>

      <div class="counter">
        <strong>{{ filteredSongs.length }} mostrando</strong>
        <span>Total: {{ songs.length }}</span>
      </div>
    </div>

    <div class="grid">
      <SongItem v-for="song in filteredSongs" :key="song.id" :song="song" />
    </div>
  </section>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1rem;
}

button {
  background: #7c3aed;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.counter {
  text-align: right;
  display: flex;
  gap: 0.5rem;
}

.counter span {
  padding: 0.5rem;
  background-color: lightgrey;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
</style>

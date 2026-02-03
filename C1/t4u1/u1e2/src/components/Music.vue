<template>
  <div class="card">
    <h3>🎧 Música</h3>
    <p>{{ status }}</p>

    <button @click="togglePlay">
      {{ isPlaying ? 'Pausa' : 'Reproducir' }}
    </button>
    <button @click="next">Siguiente</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isPlaying = ref<boolean>(true)

const status = computed(() => (isPlaying.value ? 'Reproduciendo' : 'Pausado'))

function togglePlay() {
  isPlaying.value = !isPlaying.value
}

function next() {
  isPlaying.value = true
}
</script>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: #e6f3ff;
}
</style>

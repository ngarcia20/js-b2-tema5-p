<script setup lang="ts">
import type { Song } from '@/models/song.interface'

defineProps<{
  song: Song
}>()
</script>

<template>
  <article class="card" :class="{ hit: song.isTopHit }">
    <h3>{{ song.title }}</h3>
    <p><strong>Artista:</strong> {{ song.artist }}</p>
    <p><strong>Duración:</strong> {{ song.duration }}</p>

    <span class="badge">
      {{ song.isTopHit ? 'ÉXITO ACTUAL' : 'CANCIÓN' }}
    </span>
  </article>
</template>

<style scoped>
.card {
  border: 2px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.hit {
  border-color: #ff6b6b;
}

.badge {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  background: #eee;
}

.hit .badge {
  background: #ff6b6b;
  color: white;
}
</style>

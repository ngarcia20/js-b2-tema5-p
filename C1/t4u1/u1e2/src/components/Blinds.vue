<template>
  <div class="card">
    <h3>🪟 Persianas</h3>
    <p>{{ status }}</p>
    <button @click="toggle">
      {{ isOpen ? 'Cerrar' : 'Abrir' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const isOpen = ref<boolean>(false)

const status = computed(() => (isOpen.value ? 'Abiertas' : 'Cerradas'))

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: lightgrey;
}
</style>

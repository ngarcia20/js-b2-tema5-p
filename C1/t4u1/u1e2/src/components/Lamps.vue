<template>
  <div class="card">
    <h3 class="title" @click="toggleLight">💡 Luces</h3>

    <div v-if="!isOn">
      <p>Encender</p>
    </div>

    <div v-if="isOn">
      <p>{{ intensity }}%</p>
      <input type="range" min="0" max="100" v-model="intensity" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOn = ref<boolean>(false)
const intensity = ref<number>(70)

function toggleLight() {
  isOn.value = !isOn.value
}
</script>

<style scoped>
.title {
  cursor: pointer;
}
.card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: #fff7e6;
}
</style>

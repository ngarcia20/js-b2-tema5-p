<template>
  <div class="card">
    <h3>🚗 Vehículo eléctrico</h3>

    <p>{{ status }}</p>

    <progress :value="car.charge" max="100"></progress>

    <button @click="toggleConnection">
      {{ car.connected ? 'Desconectar' : 'Conectar' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ElectricCar } from '@/models/car.interface'

const car = ref<ElectricCar>({
  connected: false,
  charge: 42,
})

const status = computed(() =>
  car.value.connected ? `Cargando - ${car.value.charge}%` : `Desconectado - ${car.value.charge}%`,
)

let interval: number

function toggleConnection() {
  car.value.connected = !car.value.connected

  if (car.value.connected) {
    interval = setInterval(() => {
      if (car.value.charge < 100) {
        car.value.charge++
      }
    }, 200)
  } else {
    clearInterval(interval)
  }
}
</script>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 1rem;
  background-color: #eaffea;
}
progress {
  width: 100%;
}
</style>

<template>
  <main style="padding: 1rem">
    <h1>Panel de control</h1>

    <HoraActual />
    <TiempoActual />
    <NotasPanel />
  </main>
</template>

<script setup lang="ts">
import HoraActual from './components/HoraActual.vue'
import TiempoActual from './components/TiempoActual.vue'
import NotasPanel from './components/NotasPanel.vue'
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>

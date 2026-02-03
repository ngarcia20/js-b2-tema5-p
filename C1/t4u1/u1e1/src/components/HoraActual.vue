<template>
  <section class="card">
    <h3>Hora</h3>
    <p>{{ currentTime }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentTime = ref<string>(new Date().toLocaleTimeString());
</script>

<style scoped>
.card {
  padding: 2rem;
  border-left: 2px solid orange;
  border-radius: 1rem;
  background-color: #fff2cc;
}
</style>

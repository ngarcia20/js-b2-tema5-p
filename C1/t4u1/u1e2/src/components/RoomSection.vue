<template>
  <section class="section">
    <h2>{{ title }}</h2>
    <div class="components">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped>
.section {
  background-color: #f0f0f0;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
}
.components {
  display: flex;
  gap: 1rem;
}
</style>

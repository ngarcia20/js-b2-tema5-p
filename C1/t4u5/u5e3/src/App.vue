<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getUsers, type User } from '@/services/userService'

const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    users.value = await getUsers()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1>Usuarios</h1>
    <p v-if="loading">Cargando...</p>
    <p v-if="error" style="color: red">{{ error }}</p>
    <ul v-if="users.length > 0">
      <li v-for="user in users" :key="user.id">{{ user.name }} (ID: {{ user.id }})</li>
    </ul>
  </div>
</template>

<style scoped></style>

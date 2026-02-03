<script setup lang="ts">
import { ref } from 'vue'
import SignUpForm from '@/components/SignUpForm.vue'
import type { User } from '@/models/user.interface'

const registered = ref(false)
const isFormValid = ref(false)
const userName = ref('')

function handleSubmit(user: User) {
  registered.value = true
  userName.value = user.name
}

function resetForm() {
  registered.value = false
}
</script>

<template>
  <div class="container">
    <h1>Registro de usuario</h1>

    <div v-if="!registered" class="status warning">
      ⏳ Pendiente de Registrarse – Completa el formulario para registrarte
    </div>

    <div v-else class="status success">
      ✅ Registro Completado – Bienvenido {{ userName }}
      <button @click="resetForm">Nuevo Registro</button>
    </div>

    <SignUpForm v-if="!registered" @submit="handleSubmit" @valid="isFormValid = $event" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
  max-width: 800px;
}
.status {
  padding: 12px;
  margin-bottom: 12px;
}
.warning {
  background: #fff3cd;
}
.success {
  background: #d1e7dd;
}
</style>

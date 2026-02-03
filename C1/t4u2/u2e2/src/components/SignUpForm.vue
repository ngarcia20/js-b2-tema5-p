<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { User } from '@/models/user.interface'
import { useFormValidation } from '@/composables/useFormValidation'

const emit = defineEmits<{
  (e: 'submit', user: User): void
  (e: 'valid', value: boolean): void
}>()

const user = reactive<User>({
  name: '',
  email: '',
  password: '',
})

const { nameError, emailError, passwordError, errors, isValid } = useFormValidation(user)

watch(isValid, (value) => emit('valid', value))

function submitForm() {
  if (isValid.value) {
    emit('submit', { ...user })
  }
}
</script>

<template>
  <div class="card">
    <h2>Formulario de Registro</h2>

    <label>
      Nombre *
      <input v-model="user.name" placeholder="Introduce tu nombre" />
      <small v-if="nameError">{{ nameError }}</small>
    </label>

    <label>
      Correo electrónico *
      <input v-model="user.email" placeholder="ejemplo@correu.cat" />
      <small v-if="emailError">{{ emailError }}</small>
    </label>

    <label>
      Contraseña *
      <input type="password" v-model="user.password" placeholder="Mínimo 8 caracteres" />
      <small v-if="passwordError">{{ passwordError }}</small>
    </label>

    <button :disabled="!isValid" @click="submitForm">Regístrate</button>

    <div v-if="errors.length" class="errors">
      <strong>Errores de validación:</strong>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
small {
  color: red;
}
.errors {
  background: #fdecea;
  padding: 8px;
  margin-top: 8px;
}
</style>

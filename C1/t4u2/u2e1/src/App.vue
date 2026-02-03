<script setup lang="ts">
import { ref } from 'vue'
import AlertComponent from '@/components/AlertComponent.vue'

const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref<'success' | 'warning' | 'error'>()

function showSuccess() {
  alertMessage.value = '✔ Operación realizada correctamente'
  alertType.value = 'success'
  showAlert.value = true
}

function showWarning() {
  alertMessage.value = '⚠ Mensaje de advertencia'
  alertType.value = 'warning'
  showAlert.value = true
}

function showError() {
  alertMessage.value = '✖ Se ha producido un error'
  alertType.value = 'error'
  showAlert.value = true
}
</script>

<template>
  <h1>Componente reutilizable</h1>

  <button class="success" @click="showSuccess">Correcto</button>
  <button class="warning" @click="showWarning">Aviso</button>
  <button class="error" @click="showError">Error</button>

  <AlertComponent
    v-if="showAlert"
    :message="alertMessage"
    :type="alertType"
    :duration="3000"
    @close="showAlert = false"
  />
</template>

<style scoped>
button {
  margin-right: 8px;
  padding: 8px;
}
.success {
  background-color: green;
}

.warning {
  background-color: orange;
}

.error {
  background-color: red;
}
</style>

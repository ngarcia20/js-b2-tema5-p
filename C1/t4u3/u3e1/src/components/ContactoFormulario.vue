<template>
  <form class="card" @submit.prevent="onSubmit">
    <!-- Nombre -->
    <label for="name">Nombre Completo</label>
    <input
      id="name"
      type="text"
      v-model="name"
      v-bind="nameAttrs"
      :class="{ invalid: !!errors.name }"
      :aria-invalid="!!errors.name"
      aria-describedby="name-error"
      placeholder="Tu nombre completo"
    />
    <p v-if="errors.name" id="name-error" class="error">{{ errors.name }}</p>

    <!-- Email -->
    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      v-model="email"
      v-bind="emailAttrs"
      :class="{ invalid: !!errors.email }"
      :aria-invalid="!!errors.email"
      aria-describedby="email-error"
      placeholder="tu@email.com"
    />
    <p v-if="errors.email" id="email-error" class="error">{{ errors.email }}</p>

    <!-- Asunto -->
    <label for="subject">Asunto</label>
    <input
      id="subject"
      type="text"
      v-model="subject"
      v-bind="subjectAttrs"
      :class="{ invalid: !!errors.subject }"
      :aria-invalid="!!errors.subject"
      aria-describedby="subject-error"
      placeholder="Asunto del mensaje"
    />
    <p v-if="errors.subject" id="subject-error" class="error">{{ errors.subject }}</p>

    <!-- Mensaje -->
    <label for="message">Mensaje</label>
    <textarea
      id="message"
      type="text"
      v-model="message"
      v-bind="messageAttrs"
      rows="4"
      :class="{ invalid: !!errors.message }"
      :aria-invalid="!!errors.message"
      aria-describedby="message-error"
      placeholder="Escribe tu mensaje aquí..."
    ></textarea>

    <p v-if="errors.message" id="message-error" class="error">{{ errors.message }}</p>

    <button class="btn" type="submit" :disabled="!meta.valid">Enviar</button>

    <!-- Debug -->
    <details class="debug">
      <summary>Debug</summary>
      <pre>values: {{ values }}</pre>
      <pre>errors: {{ errors }}</pre>
      <pre>meta:   {{ meta }}</pre>
    </details>
  </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'

// Esquema de validación
const schema = yup.object({
  name: yup.string().required().min(3).max(100),
  email: yup.string().required().email(),
  subject: yup.string().required(),
  message: yup.string().required().min(20),
})

// Valores iniciales
const initialValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const { values, errors, meta, defineField } = useForm({
  validationSchema: schema,
  initialValues,
})

// Campos
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [subject, subjectAttrs] = defineField('subject')
const [message, messageAttrs] = defineField('message')

// Submit simulado
function onSubmit() {
  console.log('Data payload: ', JSON.stringify(values))
}
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
}
.error {
  color: #c00;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
.invalid {
  outline: 2px solid #e33;
  border-radius: 6px;
}
.btn {
  margin-top: 0.5rem;
}
.btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}
.debug {
  margin-top: 0.75rem;
}
</style>

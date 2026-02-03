<template>
  <form class="card" @submit.prevent="onSubmit">
    <h2>Registro</h2>

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

    <!-- Categoria -->
    <label for="category">Categoria</label>
    <select
      id="category"
      v-model="category"
      v-bind="categoryAttrs"
      :class="{ invalid: !!errors.category }"
      :aria-invalid="!!errors.category"
      aria-describedby="category-error"
    >
      <option value="">Selecciona una categoría</option>
      <option value="technical">Error Técnica</option>
      <option value="query">Consulta</option>
      <option value="billing">Facturación</option>
    </select>
    <p v-if="errors.category" id="category-error" class="error">{{ errors.category }}</p>

    <!-- Número de factura -->
    <template v-if="category === 'billing'">
      <label for="invoiceNumber">Número de Factura</label>
      <input
        id="invoiceNumber"
        type="number"
        v-model="invoiceNumber"
        v-bind="invoiceNumberAttrs"
        :class="{ invalid: !!errors.invoiceNumber }"
        :aria-invalid="!!errors.invoiceNumber"
        aria-describedby="invoiceNumber-error"
        placeholder="Ej. 123456"
      />
      <p v-if="errors.invoiceNumber" id="invoiceNumber-error" class="error">
        {{ errors.invoiceNumber }}
      </p>
    </template>

    <!-- Versión del programa -->
    <template v-if="category === 'technical'">
      <label for="version">Versión del Programa</label>
      <input
        id="version"
        type="number"
        v-model="version"
        v-bind="versionAttrs"
        :class="{ invalid: !!errors.version }"
        :aria-invalid="!!errors.version"
        aria-describedby="version-error"
        placeholder="Ej. 1"
      />
      <p v-if="errors.version" id="version-error" class="error">{{ errors.version }}</p>
    </template>

    <!-- Mensaje -->
    <label for="message">Descripció Detallada</label>
    <textarea
      id="message"
      type="text"
      v-model="message"
      v-bind="messageAttrs"
      rows="4"
      :class="{ invalid: !!errors.message }"
      :aria-invalid="!!errors.message"
      aria-describedby="message-error"
      placeholder="Describe el problema con detalle..."
    ></textarea>

    <p v-if="errors.message" id="message-error" class="error">{{ errors.message }}</p>

    <button class="btn" type="submit" :disabled="!meta.valid">Crear Tiquet</button>

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
  subject: yup.string().required().min(5).max(100),
  email: yup.string().required().email(),
  category: yup.string().required('Selecciona una categoría'),
  invoiceNumber: yup
    .number()
    .nullable()
    .typeError('Introduce un número válido')
    .when('category', {
      is: 'billing',
      then: (schema) =>
        schema
          .required('El número de factura es obligatorio')
          .min(100000, 'Debe ser un valor alfanumérico de 6 caracteres')
          .max(999999, 'Debe ser un valor alfanumérico de 6 caracteres'),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
  version: yup
    .number()
    .nullable()
    .typeError('Introduce un número válido')
    .when('category', {
      is: 'technical',
      then: (schema) =>
        schema.required('La version es obligatoria').min(1, 'Debe ser mínimo 1 número'),
      otherwise: (schema) => schema.nullable().notRequired(),
    }),
  message: yup.string().required().min(20),
})

// Valores iniciales
const initialValues = {
  subject: '',
  email: '',
  category: '',
  invoiceNumber: null,
  version: null,
  message: '',
}

const { values, errors, meta, defineField } = useForm({
  validationSchema: schema,
  initialValues,
})

// Campos
const [subject, subjectAttrs] = defineField('subject')
const [email, emailAttrs] = defineField('email')
const [category, categoryAttrs] = defineField('category')
const [invoiceNumber, invoiceNumberAttrs] = defineField('invoiceNumber')
const [version, versionAttrs] = defineField('version')
const [message, messageAttrs] = defineField('message')

// Submit simulado
function onSubmit() {
  console.log('Incidencia payload: ', JSON.stringify(values))
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

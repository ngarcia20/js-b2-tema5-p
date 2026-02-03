<template>
  <form class="card" @submit.prevent="onSubmit">
    <!-- Sección datos del cliente -->
    <h2>Información del Cliente</h2>

    <!-- Nombre -->
    <label for="name">Nombre del Cliente</label>
    <input
      id="name"
      type="text"
      v-model="name"
      v-bind="nameAttrs"
      :class="{ invalid: !!errors.name }"
      :aria-invalid="!!errors.name"
      aria-describedby="name-error"
      placeholder="Nombre completo del cliente"
    />
    <p v-if="errors.name" id="name-error" class="error">{{ errors.name }}</p>

    <!-- Email -->
    <label for="email">Correo de Contacto</label>
    <input
      id="email"
      type="email"
      v-model="email"
      v-bind="emailAttrs"
      :class="{ invalid: !!errors.email }"
      :aria-invalid="!!errors.email"
      aria-describedby="email-error"
      placeholder="correo@example.com"
    />
    <p v-if="errors.email" id="email-error" class="error">{{ errors.email }}</p>

    <!-- Método de Pago -->
    <label for="paymentMethod">Método de Pago</label>
    <select
      id="paymentMethod"
      v-model="paymentMethod"
      v-bind="paymentMethodAttrs"
      :class="{ invalid: !!errors.paymentMethod }"
      :aria-invalid="!!errors.paymentMethod"
      aria-describedby="paymentMethod-error"
    >
      <option value="">Seleccionar forma de pago…</option>
      <option value="creditCard">Tarjeta de crédito</option>
      <option value="bankTransfer">Transferencia bancaria</option>
      <option value="paypal">PayPal</option>
    </select>
    <p v-if="errors.paymentMethod" id="paymentMethod-error" class="error">
      {{ errors.paymentMethod }}
    </p>

    <!-- Sección Líneas de productos -->
    <h2>Líneas de Productos</h2>

    <!-- Nombre -->
    <label for="productName">Nombre del Producto</label>
    <input
      id="productName"
      type="text"
      v-model="productName"
      v-bind="productNameAttrs"
      :class="{ invalid: !!errors.productName }"
      :aria-invalid="!!errors.productName"
      aria-describedby="productName-error"
      placeholder="Nombre del producto"
    />
    <p v-if="errors.productName" id="productName-error" class="error">{{ errors.productName }}</p>

    <!-- Cantidad -->
    <label for="quantity">Cantidad</label>
    <input
      id="quantity"
      type="number"
      v-model="quantity"
      v-bind="quantityAttrs"
      :class="{ invalid: !!errors.quantity }"
      :aria-invalid="!!errors.quantity"
      aria-describedby="quantity-error"
      placeholder="Ej: 1,2,3..."
    />
    <p v-if="errors.quantity" id="quantity-error" class="error">{{ errors.quantity }}</p>

    <!-- Precio -->
    <label for="price">Precio (€)</label>
    <input
      id="price"
      type="number"
      v-model="price"
      v-bind="priceAttrs"
      :class="{ invalid: !!errors.price }"
      :aria-invalid="!!errors.price"
      aria-describedby="price-error"
      placeholder="0.00"
    />
    <p v-if="errors.price" id="price-error" class="error">{{ errors.price }}</p>

    <button class="btn" type="submit" :disabled="!meta.valid">Enviar pedido</button>

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
  paymentMethod: yup.string().required('Selecciona un método de pago'),
  productName: yup.string().required().min(3).max(100),
  quantity: yup
    .number()
    .typeError('Introduce un número válido')
    .required('La cantidad es obligatoria')
    .min(1, 'La cantidad debe ser mayor que 0'),
  price: yup
    .number()
    .typeError('Introduce un número válido')
    .required('El precio es obligatorio')
    .min(1, 'El precio debe ser mayor que 0'),
})

// Valores iniciales
const initialValues = {
  name: '',
  email: '',
  paymentMethod: '',
  productName: '',
  quantity: '',
  price: '',
}

const { values, errors, meta, defineField } = useForm({
  validationSchema: schema,
  initialValues,
})

// Campos
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [paymentMethod, paymentMethodAttrs] = defineField('paymentMethod')
const [productName, productNameAttrs] = defineField('productName')
const [quantity, quantityAttrs] = defineField('quantity')
const [price, priceAttrs] = defineField('price')

// Submit simulado
function onSubmit() {
  console.log('Comanda payload: ', JSON.stringify(values))
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

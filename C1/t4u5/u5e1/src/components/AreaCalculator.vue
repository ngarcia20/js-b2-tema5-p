<script setup lang="ts">
import { computed, ref } from 'vue'

const figures = ['Cuadrado', 'Rectángulo', 'Círculo', 'Triángulo'] as const
const figure = ref<(typeof figures)[number]>('Cuadrado')

const side = ref(0)
const base = ref(0)
const height = ref(0)
const radius = ref(0)

const area = computed(() => {
  switch (figure.value) {
    case 'Cuadrado':
      return side.value ** 2
    case 'Rectángulo':
      return base.value * height.value
    case 'Círculo':
      return Math.PI * radius.value ** 2
    case 'Triángulo':
      return (base.value * height.value) / 2
    default:
      return 0
  }
})

const formula = computed(() => {
  switch (figure.value) {
    case 'Cuadrado':
      return `Área = lado² = ${side.value}²`
    case 'Rectángulo':
      return `Área = b × h = ${base.value} × ${height.value}`
    case 'Círculo':
      return `Área = π × r² = π × ${radius.value}²`
    case 'Triángulo':
      return `Área = (b × h) / 2 = (${base.value} × ${height.value}) / 2`
    default:
      return ''
  }
})
</script>

<template>
  <section>
    <h2>Calculadora de Áreas</h2>
    <p>Calcula áreas de figuras geométricas</p>

    <p>Selecciona una figura:</p>
    <div>
      <button
        v-for="fig in figures"
        :key="fig"
        :data-test="`btn-fig-${fig}`"
        :class="{ active: figure === fig }"
        @click="figure = fig"
      >
        {{ fig }}
      </button>
    </div>

    <hr />

    <div v-if="figure === 'Cuadrado'">
      <label>Lado:</label>
      <input data-test="input-side" type="number" v-model.number="side" />
    </div>

    <div v-if="figure === 'Rectángulo'">
      <label>Base:</label>
      <input data-test="input-base" type="number" v-model.number="base" />

      <label>Altura:</label>
      <input data-test="input-height" type="number" v-model.number="height" />
    </div>

    <div v-if="figure === 'Círculo'">
      <label>Radio:</label>
      <input data-test="input-radius" type="number" v-model.number="radius" />
    </div>

    <div v-if="figure === 'Triángulo'">
      <label>Base:</label>
      <input data-test="input-base" type="number" v-model.number="base" />

      <label>Altura:</label>
      <input data-test="input-height" type="number" v-model.number="height" />
    </div>

    <hr />

    <div v-if="area > 0">
      <p data-test="formula">{{ formula }}</p>
      <h3 data-test="area">{{ area.toFixed(2) }}</h3>
      <small>unidades cuadradas</small>
    </div>
  </section>
</template>

<style scoped>
button {
  margin: 0.25rem;
  padding: 0.5rem;
}

input {
  width: 100%;
  margin-bottom: 0.5rem;
}

.active {
  background: blue;
  color: white;
}
</style>

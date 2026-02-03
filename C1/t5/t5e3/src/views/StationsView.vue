<script setup lang="ts">
import { ref } from 'vue'
import { fetchStations, type MeteoStation } from '@/services/meteo'

const stations = ref<MeteoStation[]>([])
const loading = ref(false)
const error = ref('')

const loadStations = async () => {
  error.value = ''
  loading.value = true
  try {
    stations.value = await fetchStations()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

const clearStations = () => {
  stations.value = []
  error.value = ''
}
</script>

<template>
  <section class="container">
    <header class="header">
      <h1>Metadatos de estaciones (XEMA)</h1>
      <p>Endpoint: https://api.meteo.cat/xema/v1/estacions/metadades</p>
    </header>

    <div class="actions">
      <button @click="loadStations">Cargar estaciones</button>
      <button @click="clearStations">Limpiar</button>
    </div>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <p v-if="stations.length > 0" class="count">
      Se han obtenido {{ stations.length }} estaciones.
    </p>

    <div v-if="stations.length > 0" class="list">
      <article v-for="station in stations" :key="station.codi" class="card">
        <h3>{{ station.nom }} ({{ station.codi }})</h3>
        <p><strong>Tipo:</strong> {{ station.tipus }}</p>
        <p>
          <strong>Coordenadas:</strong>
          {{ station.coordenades.latitud }}, {{ station.coordenades.longitud }}
        </p>
        <p><strong>Altitud:</strong> {{ station.altitud }} m</p>
        <p><strong>Emplazamiento:</strong> {{ station.emplacament }}</p>
        <p><strong>Municipio:</strong> {{ station.municipi.nom }} ({{ station.municipi.codi }})</p>
        <p><strong>Comarca:</strong> {{ station.comarca.nom }}</p>
        <p><strong>Provincia:</strong> {{ station.provincia.nom }}</p>
        <p><strong>Xarxa:</strong> {{ station.xarxa.nom }}</p>
        <div v-if="station.estats.length > 0">
          <p><strong>Estados:</strong></p>
          <ul>
            <li v-for="estat in station.estats" :key="estat.codi">
              codi: {{ estat.codi }} - {{ estat.dataInici }} - {{ estat.dataFi || 'Actual' }}
            </li>
          </ul>
        </div>
      </article>
    </div>
    <div v-else>
      <p>Ninguna estación cargada.</p>
    </div>
  </section>
</template>

<style scoped>
.container {
  padding: 1rem;
}

.header {
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.error {
  color: #b91c1c;
}

.count {
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.list {
  display: grid;
  gap: 1rem;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem;
}

ul {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
}
</style>

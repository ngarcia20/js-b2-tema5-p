<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { CHARACTERS_API } from '@/services/api'

type Character = {
  index?: number
  fullName?: string
  nickname?: string
  image?: string
  hogwartsHouse?: string
  interpretedBy?: string
  birthdate?: string
  children?: string[]
}

const characters = ref<Character[]>([])
const loading = ref(false)
const error = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch(CHARACTERS_API)
    if (!response.ok) throw new Error('Error al cargar personajes')
    characters.value = await response.json()
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="container">
    <h2>Personajes</h2>
    <p v-if="loading">Cargando...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <div class="grid" v-if="characters.length > 0">
      <article
        v-for="character in characters"
        :key="character.index || character.fullName"
        class="card"
      >
        <img
          v-if="character.image"
          :src="character.image"
          :alt="character.fullName"
          class="avatar"
        />
        <div>
          <h3>{{ character.fullName }}</h3>
          <p v-if="character.nickname"><strong>Apodo:</strong> {{ character.nickname }}</p>
          <p v-if="character.hogwartsHouse"><strong>Casa:</strong> {{ character.hogwartsHouse }}</p>
          <p v-if="character.birthdate"><strong>Nacimiento:</strong> {{ character.birthdate }}</p>
          <p v-if="character.interpretedBy">
            <strong>Actor:</strong> {{ character.interpretedBy }}
          </p>
          <p v-if="character.children && character.children.length > 0">
            <strong>Children:</strong> {{ character.children.join(', ') }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.container {
  padding: 1rem;
}

.error {
  color: #b91c1c;
}

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem;
  display: grid;
  gap: 0.75rem;
}

.avatar {
  width: 100%;
  border-radius: 6px;
  object-fit: cover;
}
</style>

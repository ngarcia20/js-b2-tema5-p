<template>
  <section class="card">
    <h3>Notas</h3>

    <textarea v-model="noteText" placeholder="Escribe tu nota aquí..."></textarea>

    <button @click="addNote">Agregar</button>

    <div v-if="notes.length > 0">
      <div class="note" v-for="note in notes" :key="note.id">
        <p>{{ note.text }}</p>
        <small>{{ note.time }}</small>
        <button class="delete" @click="removeNote(note.id)">Eliminar</button>
      </div>
    </div>

    <p>Total notas: {{ notesCount }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Note } from '@/models/note.interface'

const noteText = ref<string>('')
const notes = ref<Note[]>([])

function addNote() {
  notes.value.push({
    id: Date.now(),
    text: noteText.value,
    time: new Date().toLocaleTimeString(),
  })

  noteText.value = ''
}

function removeNote(id: number) {
  notes.value = notes.value.filter((note) => note.id !== id)
}

const notesCount = computed(() => notes.value.length)
</script>

<style scoped>
.card {
  padding: 2rem;
  border-left: 2px solid blue;
  border-radius: 1rem;
  background-color: #d9f1f6;
}

textarea {
  width: 100%;
  min-height: 60px;
}

button {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: blue;
  color: white;
  cursor: pointer;
}

.note {
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

.delete {
  background-color: red;
}
</style>

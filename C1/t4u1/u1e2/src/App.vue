<template>
  <main style="padding: 1rem">
    <RoomSection title="Habitación">
      <Lamps />
      <Blinds />
      <Music />
    </RoomSection>

    <RoomSection title="Coche eléctrico">
      <Car />
      <LastCharge />
    </RoomSection>
  </main>
</template>

<script setup lang="ts">
import RoomSection from './components/RoomSection.vue'
import Lamps from './components/Lamps.vue'
import Blinds from './components/Blinds.vue'
import Music from './components/Music.vue'
import Car from './components/Car.vue'
import LastCharge from './components/LastCharge.vue'
</script>

<style>
body {
  font-family: Arial, sans-serif;
}

button {
  cursor: pointer;
}
</style>

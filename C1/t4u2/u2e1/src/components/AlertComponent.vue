<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AlertProps } from '@/models/alert-props.interface'

const props = defineProps<AlertProps>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const visible = ref(true)

watch(
  () => props.duration,
  (newDuration) => {
    if (newDuration) {
      setTimeout(() => {
        visible.value = false
        emit('close')
      }, newDuration)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="visible" class="alert" :class="props.type">
    <span>{{ props.message }}</span>
  </div>
</template>

<style scoped>
.alert {
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
}

.success {
  background-color: #e9f7e9;
}

.warning {
  background-color: #fff8e1;
}

.error {
  background-color: #fdecea;
}

.info {
  background-color: #e3f2fd;
}
</style>

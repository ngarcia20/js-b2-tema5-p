<script setup lang="ts">
import { useToast } from '@/common/composables/useToast';
import { clearAuth, getUser } from '@/modules/auth/utils/token';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();

const user = computed(() => getUser());

function logout() {
  clearAuth();
  toast.info('Sesión cerrada');
  router.push('/login');
}
</script>

<template>
  <section class="container py-4">
    <header class="d-flex align-items-center justify-content-between mb-3">
      <h1 class="h4 mb-0">Perfil de usuario</h1>
      <button class="btn btn-outline-danger btn-sm" type="button" @click="logout">
        Cerrar sesión
      </button>
    </header>

    <div v-if="user" class="card">
      <div class="card-body">
        <p class="mb-2"><strong>Email:</strong> {{ user.email }}</p>
        <p class="mb-2"><strong>Nombre completo:</strong> {{ user.fullName }}</p>
        <p class="mb-0"><strong>Activo:</strong> {{ user.isActive ? 'Sí' : 'No' }}</p>
      </div>
    </div>

    <p v-else class="text-muted">No hay datos de usuario disponibles.</p>
  </section>
</template>

<style scoped></style>

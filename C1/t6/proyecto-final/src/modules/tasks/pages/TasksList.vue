<script setup lang="ts">
import { mapApiError } from '@/api/apiErrors';
import { useToast } from '@/common/composables/useToast';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import type { CreateTaskDto } from '@/modules/tasks/models/create-task.dto';
import type { Task, TaskPriority } from '@/modules/tasks/models/task.model';
import {
  completeAllPendingTasks,
  completeTask,
  createTask,
  deleteAllCompletedTasks,
  getTasks,
} from '@/modules/tasks/services/tasks.service';
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const toast = useToast();

const tasks = ref<Task[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const filterText = ref('');

type SortKey = 'dueDate' | 'priority' | null;
type SortDir = 'asc' | 'desc';
type ViewMode = 'list' | 'cards';

const sortKey = ref<SortKey>(null);
const sortDir = ref<SortDir>('asc');
const viewMode = ref<ViewMode>('list');

const filteredTasks = computed(() => {
  const term = filterText.value.trim().toLowerCase();
  if (!term) return tasks.value;

  return tasks.value.filter((task) => {
    const name = task.name.toLowerCase();
    const description = task.description.toLowerCase();
    return name.includes(term) || description.includes(term);
  });
});

const sortedTasks = computed(() => {
  const list = [...filteredTasks.value];
  if (!sortKey.value) return list;

  if (sortKey.value === 'dueDate') {
    list.sort((a, b) => {
      const aTime = new Date(a.dueDate).getTime();
      const bTime = new Date(b.dueDate).getTime();
      return sortDir.value === 'asc' ? aTime - bTime : bTime - aTime;
    });
    return list;
  }

  const priorityValue = (p: TaskPriority) => (p === 'low' ? 1 : p === 'medium' ? 2 : 3);
  list.sort((a, b) => {
    const aVal = priorityValue(a.priority);
    const bVal = priorityValue(b.priority);
    return sortDir.value === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return list;
});

function toggleSort(key: Exclude<SortKey, null>) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
    return;
  }

  sortKey.value = key;
  sortDir.value = 'asc';
}

function clearSort() {
  sortKey.value = null;
  sortDir.value = 'asc';
}

function toggleViewMode() {
  viewMode.value = viewMode.value === 'list' ? 'cards' : 'list';
}

async function loadTasks() {
  loading.value = true;
  error.value = null;

  try {
    tasks.value = await getTasks();
  } catch {
    error.value = 'No se han podido cargar las tareas.';
  } finally {
    loading.value = false;
  }
}

async function onCreateTask(payload: CreateTaskDto) {
  try {
    await createTask(payload);
    toast.success('Tarea creada correctamente');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se ha podido crear la tarea'));
  }
}

async function onCompleteTask(taskId: string) {
  try {
    await completeTask(taskId);
    toast.success('Tarea completada');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se ha podido completar la tarea'));
  }
}

async function onCompleteAll() {
  try {
    await completeAllPendingTasks();
    toast.success('Todas las tareas pendientes se han completado');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se han podido completar las tareas'));
  }
}

async function onDeleteCompleted() {
  try {
    await deleteAllCompletedTasks();
    toast.success('Tareas completadas eliminadas');
    await loadTasks();
  } catch (e) {
    toast.error(mapApiError(e, 'No se han podido eliminar las tareas completadas'));
  }
}

function priorityBadge(p: TaskPriority) {
  if (p === 'high') return 'bg-danger';
  if (p === 'medium') return 'bg-primary';
  return 'bg-secondary';
}

onMounted(loadTasks);
</script>

<template>
  <section class="container py-4">
    <header class="d-flex align-items-center justify-content-between mb-3">
      <h1 class="h4 mb-0">Mis tareas</h1>
      <RouterLink to="/" class="btn btn-outline-secondary btn-sm">Volver a Home</RouterLink>
    </header>

    <TaskForm :disabled="loading" @submit="onCreateTask" />

    <div class="mb-3">
      <input
        v-model="filterText"
        type="text"
        class="form-control"
        placeholder="Filtrar por nombre o descripción..."
        :disabled="loading"
      />
    </div>

    <div class="d-flex gap-2 mb-3">
      <button
        class="btn btn-sm btn-outline-primary"
        :disabled="loading"
        @click="toggleSort('dueDate')"
      >
        Ordenar por fecha
        <span v-if="sortKey === 'dueDate'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
      </button>

      <button
        class="btn btn-sm btn-outline-primary"
        :disabled="loading"
        @click="toggleSort('priority')"
      >
        Ordenar por prioridad
        <span v-if="sortKey === 'priority'">{{ sortDir === 'asc' ? '↑' : '↓' }}</span>
      </button>

      <button v-if="sortKey" class="btn btn-sm btn-outline-secondary" @click="clearSort">
        Limpiar orden
      </button>

      <button
        class="btn btn-sm btn-outline-info ms-auto"
        :disabled="loading"
        @click="toggleViewMode"
      >
        {{ viewMode === 'list' ? 'Vista tarjetas' : 'Vista lista' }}
      </button>
    </div>

    <div class="d-flex gap-2 mb-3">
      <button
        class="btn btn-sm btn-outline-success"
        :disabled="tasks.length === 0 || loading"
        @click="onCompleteAll"
      >
        Completar todas
      </button>

      <button
        class="btn btn-sm btn-outline-danger"
        :disabled="!tasks.some((t) => t.completed) || loading"
        @click="onDeleteCompleted"
      >
        Eliminar completadas
      </button>

      <button
        class="btn btn-sm btn-outline-secondary ms-auto"
        :disabled="loading"
        @click="loadTasks"
      >
        Recargar
      </button>
    </div>

    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <!-- Vista Lista -->
    <div v-if="!loading && sortedTasks.length && viewMode === 'list'" class="list-group">
      <RouterLink
        v-for="task in sortedTasks"
        :key="task.id"
        :to="{ name: 'task-detail', params: { id: task.id } }"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
      >
        <div class="me-3">
          <span class="badge me-2" :class="task.completed ? 'bg-success' : 'bg-warning text-dark'">
            {{ task.completed ? 'Hecha' : 'Pendiente' }}
          </span>

          <span class="fw-semibold">{{ task.name }}</span>

          <span class="badge ms-2" :class="priorityBadge(task.priority)">
            {{ task.priority }}
          </span>

          <div class="text-muted small mt-1">
            {{ task.description }}
          </div>
        </div>

        <div class="d-flex align-items-center gap-2">
          <small class="text-muted">{{ new Date(task.dueDate).toLocaleDateString() }}</small>

          <button
            v-if="!task.completed"
            class="btn btn-sm btn-outline-success"
            @click.prevent="onCompleteTask(task.id)"
            title="Completar"
          >
            ✓
          </button>
        </div>
      </RouterLink>
    </div>

    <!-- Vista Tarjetas -->
    <div v-if="!loading && sortedTasks.length && viewMode === 'cards'" class="row g-3">
      <div v-for="task in sortedTasks" :key="task.id" class="col-md-6 col-lg-4">
        <RouterLink
          :to="{ name: 'task-detail', params: { id: task.id } }"
          class="card h-100 text-decoration-none"
          :class="task.completed ? 'border-success' : 'border-warning'"
        >
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge" :class="task.completed ? 'bg-success' : 'bg-warning text-dark'">
                {{ task.completed ? 'Hecha' : 'Pendiente' }}
              </span>
              <span class="badge" :class="priorityBadge(task.priority)">
                {{ task.priority }}
              </span>
            </div>

            <h5
              class="card-title mb-2"
              :class="task.completed ? 'text-decoration-line-through' : ''"
            >
              {{ task.name }}
            </h5>

            <p class="card-text text-muted flex-grow-1">
              {{ task.description }}
            </p>

            <div class="d-flex justify-content-between align-items-center mt-auto">
              <small class="text-muted">
                📅 {{ new Date(task.dueDate).toLocaleDateString() }}
              </small>

              <button
                v-if="!task.completed"
                class="btn btn-sm btn-outline-success"
                @click.prevent="onCompleteTask(task.id)"
                title="Completar"
              >
                ✓
              </button>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>

    <p v-if="!loading && tasks.length === 0" class="text-muted">No tienes tareas todavía.</p>
    <p v-else-if="!loading && tasks.length > 0 && sortedTasks.length === 0" class="text-muted">
      No hay tareas que coincidan con el filtro.
    </p>
  </section>
</template>

import { computed } from 'vue'
import type { User } from '@/models/user.interface'

export function useFormValidation(user: User) {
  const nameError = computed(() =>
    user.name.length < 2 ? 'El nombre debe tener al menos 2 caracteres' : '',
  )

  const emailError = computed(() =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) ? 'El formato del email no es válido' : '',
  )

  const passwordError = computed(() =>
    user.password.length < 8 ? 'La contraseña debe tener al menos 8 caracteres' : '',
  )

  const errors = computed(() =>
    [nameError.value, emailError.value, passwordError.value].filter(Boolean),
  )

  const isValid = computed(() => errors.value.length === 0)

  return {
    nameError,
    emailError,
    passwordError,
    errors,
    isValid,
  }
}

import type { NavigationGuard } from 'vue-router'
import { getCurrentUser } from '@/services/userState'

type Role = 'Guest' | 'Editor' | 'Admin'

export const roleGuard = (allowedRoles: Role[]): NavigationGuard => {
  return () => {
    const user = getCurrentUser()

    if (!user.isAuthenticated) {
      console.log(
        `Acceso denegado: usuario no autenticado intentado acceder a una ruta restringida`,
      )
      return { name: 'guest' }
    }

    if (!allowedRoles.includes(user.role)) {
      console.log(
        `Acceso denegado: usuario con rol '${user.role}' intentado acceder a una ruta restringida`,
      )
      return { name: 'guest' }
    }

    if (allowedRoles.includes(user.role)) {
      console.log(`Acceso: usuario con rol '${user.role}' accediendo a una ruta permitida`)
      return true
    }

    return true
  }
}

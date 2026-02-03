export interface UserState {
  isAuthenticated: boolean
  role: 'Guest' | 'Editor' | 'Admin'
}

const currentUser: UserState = {
  isAuthenticated: true,
  role: 'Guest',
}

export const getCurrentUser = (): UserState => currentUser

export interface User {
  id: number
  name: string
}

export async function getUsers(): Promise<User[]> {
  const response = await fetch('https://api.ejemplo.com/users')

  if (!response.ok) {
    throw new Error('Error al obtener los usuarios')
  }

  return response.json()
}

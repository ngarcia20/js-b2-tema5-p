import { describe, it, expect, vi } from 'vitest'
import { getUsers, type User } from '@/services/userService'

describe('userService', () => {
  it('debería devolver la lista de usuarios cuando la respuesta es correcta', async () => {
    const usersMock: User[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(usersMock),
      } as Response),
    )

    const resultado = await getUsers()

    expect(resultado).toEqual(usersMock)
    expect(fetch).toHaveBeenCalledOnce()
    expect(fetch).toHaveBeenCalledWith('https://api.ejemplo.com/users')
  })

  it('debería lanzar un error cuando la respuesta del servidor falla', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      } as Response),
    )

    await expect(getUsers()).rejects.toThrow('Error al obtener los usuarios')
  })
})

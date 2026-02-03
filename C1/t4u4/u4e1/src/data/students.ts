export interface Student {
  id: number
  name: string
  email: string
  course: string
}

export const students: Student[] = [
  { id: 1, name: 'Joan Puig', email: 'joan.puig@test.com', course: 'Frontend' },
  { id: 2, name: 'Marta Solé', email: 'marta.sole@test.com', course: 'Backend' },
  { id: 3, name: 'Pol Ferrer', email: 'pol.ferrer@test.com', course: 'Fullstack' },
  { id: 4, name: 'Laia Rovira', email: 'laia.rovira@test.com', course: 'DevOps' },
  { id: 5, name: 'Eric Gómez', email: 'eric.gomez@test.com', course: 'DevOps' },
]

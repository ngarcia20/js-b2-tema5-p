export const OPEN_LIBRARY_SEARCH_API = 'https://openlibrary.org/search.json'

export type SearchBook = {
  key: string
  cover_i?: number
  title?: string
  author_name?: string[]
  first_publish_year?: number
}

export type SearchResponse = {
  docs: SearchBook[]
}

export async function searchBooks(term: string): Promise<SearchBook[]> {
  const url = `${OPEN_LIBRARY_SEARCH_API}?q=${encodeURIComponent(term)}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Error al buscar libros')
  }

  const data = (await response.json()) as SearchResponse
  return data.docs ?? []
}

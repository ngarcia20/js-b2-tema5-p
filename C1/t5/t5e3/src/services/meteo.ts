export const METEO_ESTACIONS_URL = 'https://api.meteo.cat/xema/v1/estacions/metadades'
export const METEO_API_KEY = 'u3DfW3MfBN6ozAAesvqIN6VF7caKzlqL4XaTemwr'

export type MeteoStation = {
  codi: string
  nom: string
  tipus: string
  coordenades: {
    latitud: number
    longitud: number
  }
  emplacament: string
  altitud: number
  municipi: {
    codi: string
    nom: string
  }
  comarca: {
    codi: number
    nom: string
  }
  provincia: {
    codi: number
    nom: string
  }
  xarxa: {
    codi: number
    nom: string
  }
  estats: Array<{
    codi: number
    dataInici: string
    dataFi: string | null
  }>
}

export async function fetchStations(): Promise<MeteoStation[]> {
  const response = await fetch(METEO_ESTACIONS_URL, {
    headers: {
      'X-Api-Key': METEO_API_KEY,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Error al cargar estaciones')
  }

  return response.json()
}

import api from './fetcher'

export const list = () => {
  return api.get<Record<string, ApiToken>>('/api/tokens')
}

export const create = (label: string, expire?: Date) => {
  return api.post<{ token: string }>('/api/tokens', {
    label,
    expire: expire?.toISOString(),
  })
}

export const deleteById = (id: string) => {
  return api.delete(`/api/tokens/${id}`)
}

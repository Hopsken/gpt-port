import api from './fetcher'

export const list = () => {
  return api.get<Record<string, ModelProvider>>('/api/models')
}

export const create = (provider: ModelProvider) => {
  return api.post<ModelProvider>('/api/models', provider)
}

export const deleteById = (id: string) => {
  return api.delete(`/api/models/${id}`)
}

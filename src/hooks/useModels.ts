import api from '@/api'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const useAllModels = () => {
  const response = useSWR('models', api.models.list)
  return response
}

export const useAddModel = () => {
  const mutation = useSWRMutation(
    'models',
    (_, { arg }: { arg: ModelProvider }) => {
      return api.models.create(arg)
    },
    { revalidate: true }
  )
  return mutation
}

export const useDeleteModel = () => {
  const mutation = useSWRMutation(
    'models',
    (_, { arg }: { arg: string }) => {
      return api.models.deleteById(arg)
    },
    { revalidate: true }
  )
  return mutation
}

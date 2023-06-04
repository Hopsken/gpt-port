import api from '@/api'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export const useMyTokens = () => {
  const response = useSWR('tokens', api.tokens.list)
  return response
}

export const useCreateToken = () => {
  const mutation = useSWRMutation(
    'tokens',
    (_, { arg }: { arg: { label: string; expire?: Date } }) => {
      return api.tokens.create(arg.label, arg.expire)
    },
    { revalidate: true }
  )
  return mutation
}

export const useDeleteToken = () => {
  const mutation = useSWRMutation(
    'tokens',
    (_, { arg }: { arg: string }) => {
      return api.tokens.deleteById(arg)
    },
    { revalidate: true }
  )
  return mutation
}

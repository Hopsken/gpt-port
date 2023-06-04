import { z } from 'zod'

export const openAiProviderSchema = z.object({
  type: z.literal('openai'),
  model: z.string(),
  apiKey: z.string(),
  endpoint: z.string().optional(),
})
export const azureProviderSchema = z.object({
  type: z.literal('azure'),
  model: z.string(),
  apiKey: z.string(),
  apiVersion: z.string(),
  deployment: z.string(),
  instance: z.string(),
})

export const modelProviderSchema = z.discriminatedUnion('type', [
  openAiProviderSchema,
  azureProviderSchema,
])

declare global {
  export type OpenAiAPIProvider = z.infer<typeof openAiProviderSchema>

  export type AzureAPIProvider = z.infer<typeof azureProviderSchema>

  export type ModelProvider = z.infer<typeof modelProviderSchema>

  export type ApiToken = {
    token: string
    expire: string
    label: string
  }

  export type UserRole = 'user' | 'admin'
}

export {}

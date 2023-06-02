declare global {
  export type OpenAiAPIProvider = {
    model: string
    type: 'openai'
    apiKey: string
    endpoint: string
  }

  export type AzureAPIProvider = {
    model: string
    type: 'azure'
    apiKey: string
    apiVersion: string
    deployment: string
    instance: string
  }

  export type ModelProvider = OpenAiAPIProvider | AzureAPIProvider
}

export {}

import { nanoid } from 'nanoid'
import type { Redis } from '@upstash/redis'
import { blurToken } from '../utils'

type StoredModels = Record<string, ModelProvider>

export class ModelController {
  private storageKey = 'models'

  constructor(public redis: Redis) {
    //
  }

  async findProviderByModel(model: string) {
    const providers = await this.redis.hgetall<StoredModels>(this.storageKey)
    if (!providers) return

    for (const provider of Object.values(providers)) {
      if (provider.model === model) {
        return provider
      }
    }
  }

  async getModels() {
    const models = await this.redis.hgetall<StoredModels>(this.storageKey)
    if (!models) return {}

    for (const key of Object.keys(models)) {
      models[key] = {
        ...models[key],
        apiKey: blurToken(models[key].apiKey),
      }
    }
    return models || {}
  }

  deleteModel(id: string) {
    return this.redis.hdel(this.storageKey, id)
  }

  addModel(model: ModelProvider) {
    const modelId = nanoid()
    return this.redis.hset(this.storageKey, {
      [modelId]: model,
    })
  }
}

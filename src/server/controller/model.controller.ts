import { nanoid } from 'nanoid'
import type { Redis } from '@upstash/redis'

type StoredModels = Record<string, ModelProvider>

export class ModelController {
  private storageKey = 'models'

  constructor(public redis: Redis) {
    //
  }

  async getModels() {
    const models = await this.redis.hgetall<StoredModels>(this.storageKey)
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
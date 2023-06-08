import { customAlphabet } from 'nanoid'
import type { Redis } from '@upstash/redis'
import { sha256 } from '@/utils/sha256'
import { blurToken } from '../utils'

const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 48)

const generateToken = () => `sk-` + nanoid()

type StoredTokens = Record<string, ApiToken>

export class TokenController {
  private get storageKey() {
    return `user:tokens:${this.userId}`
  }

  constructor(public redis: Redis, public userId: string) {
    //
  }

  static async getTokenByHash(redis: Redis, hash: string) {
    const userId = await redis.get<string>(`user:by-token-hash:${hash}`)
    if (!userId) return null

    const controller = new TokenController(redis, userId)
    return controller.getToken(hash)
  }

  async getToken(hash: string) {
    return this.redis.hget<ApiToken>(this.storageKey, hash)
  }

  async getTokens() {
    const result = await this.redis.hgetall<StoredTokens>(this.storageKey)
    return result || {}
  }

  deleteToken(hash: string) {
    return Promise.all([
      this.redis.hdel(this.storageKey, hash),
      this.redis.del(`user:by-token-hash:${hash}`),
    ])
  }

  async addToken(label: string, expire: string): Promise<{ token: string }> {
    const token = generateToken()
    const hash = await sha256(token)
    const data: ApiToken = { token: blurToken(token), label, expire }

    await Promise.all([
      this.redis.set(`user:by-token-hash:${hash}`, this.userId),
      this.redis.hset<ApiToken>(this.storageKey, {
        [hash]: data,
      }),
    ])

    return { token }
  }
}

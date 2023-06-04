import { customAlphabet } from 'nanoid'
import type { Redis } from '@upstash/redis'
import { sha256 } from '@/utils/sha256'
import { blurToken } from '../utils'

const nanoid = customAlphabet('6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz', 48)

const generateToken = () => `sk-` + nanoid()

type StoredTokens = Record<string, ApiToken>

export class TokenController {
  private get storageKey() {
    return `user:${this.userId}:tokens`
  }

  constructor(public redis: Redis, public userId: string) {
    //
  }

  async getTokens() {
    const result = await this.redis.hgetall<StoredTokens>(this.storageKey)
    return result || {}
  }

  deleteToken(hash: string) {
    return this.redis.hdel(this.storageKey, hash)
  }

  async addToken(label: string, expire: string): Promise<{ token: string }> {
    const token = generateToken()
    const hash = await sha256(token)
    const data: ApiToken = { token: blurToken(token), label, expire }

    await this.redis.hset<ApiToken>(this.storageKey, {
      [hash]: data,
    })

    return { token }
  }
}

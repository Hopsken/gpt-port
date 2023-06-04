import { env } from '@/env.mjs'
import { singletonSync } from '@/utils'
import { Redis } from '@upstash/redis'

export const createRedisClient = () => {
  return singletonSync(
    'redis',
    () =>
      new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
      })
  )
}

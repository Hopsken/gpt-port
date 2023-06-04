import type { Redis } from '@upstash/redis'
import type { Context as HonoContext } from 'hono'
import type { JWT } from 'next-auth/jwt'

export type Env = {
  Variables: {
    user?: JWT
  }
  Bindings: {
    redis: Redis
  }
}

export type Context = HonoContext<Env>

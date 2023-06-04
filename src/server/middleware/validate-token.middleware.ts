import { env } from '@/env.mjs'
import { sha256 } from '@/utils/sha256'
import { isAfter } from 'date-fns'
import { HTTPException } from 'hono/http-exception'
import { TokenController } from '../controller/token.controller'
import { Context, Env } from '../types'
import { MiddlewareHandler } from 'hono'

async function validateByAPIKey(ctx: Context): Promise<ApiToken> {
  const redis = ctx.env.redis

  const apiKey = ctx.req.header('Authorization')?.split(' ')[1]
  if (!apiKey) {
    throw new HTTPException(401, {
      message: 'Invalid Authentication',
    })
  }

  // Validate API Key
  const hashedKey = await sha256(apiKey)
  const token = await TokenController.getTokenByHash(redis, hashedKey)

  if (!token) {
    throw new HTTPException(401, {
      message: 'Invalid Authentication',
    })
  }

  const now = new Date()
  if (token.expire && isAfter(now, new Date(token.expire))) {
    throw new HTTPException(401, {
      message: `Your API key expired, please visit ${env.NEXT_PUBLIC_HOST} to generate a new one.`,
    })
  }

  return token
}

export const validateAPIToken: MiddlewareHandler<Env> = async (ctx, next) => {
  await validateByAPIKey(ctx)
  await next()
}

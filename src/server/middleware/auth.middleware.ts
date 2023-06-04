import { env } from '@/env.mjs'
import { MiddlewareHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { getToken } from 'next-auth/jwt'
import { Env } from '../types'

const createAuthMiddleware = (
  role: 'user' | 'admin'
): MiddlewareHandler<Env> => {
  return async (c, next) => {
    // @ts-expect-error getToken req type is a bit too restricted
    const token = await getToken({ req: c.req.raw })
    console.log('file: auth.middleware.ts:13  return  token:', token)
    if (
      !token ||
      !token.email ||
      (role === 'admin' && token.email !== env.ADMIN_EMAIL)
    ) {
      throw new HTTPException(401, { message: 'unauthorized' })
    }
    await next()
  }
}

export const withAdminOnly = createAuthMiddleware('admin')
export const withAuth = createAuthMiddleware('user')

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
    if (
      !token ||
      !token.email ||
      (role === 'admin' && token.role !== 'admin')
    ) {
      throw new HTTPException(401, { message: 'unauthorized' })
    }
    c.set('user', token)
    await next()
  }
}

export const withAdminOnly = createAuthMiddleware('admin')
export const withAuth = createAuthMiddleware('user')

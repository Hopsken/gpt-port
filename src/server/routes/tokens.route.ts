import { zValidator } from '@hono/zod-validator'
import { TokenController } from '../controller/token.controller'
import { createHandler } from '../helper'
import { withAuth } from '../middleware/auth.middleware'
import { z } from 'zod'

const handler = createHandler()

handler
  .use('*', withAuth)
  .get('/', async c => {
    const redis = c.env.redis
    const user = c.get('user')!

    const tokenController = new TokenController(redis, user.email!)
    const tokens = await tokenController.getTokens()
    return c.json(tokens)
  })
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        label: z.string(),
        expire: z.string().datetime().optional(),
      })
    ),
    async c => {
      const redis = c.env.redis
      const user = c.get('user')!

      const tokenController = new TokenController(redis, user.email!)
      const data = c.req.valid('json')

      const token = await tokenController.addToken(
        data.label || 'Untitled',
        data.expire || '2099-01-01'
      )
      return c.json(token)
    }
  )
  .delete(
    '/:id',
    zValidator('param', z.object({ id: z.string().min(1) })),
    async c => {
      const redis = c.env.redis
      const user = c.get('user')!

      const tokenController = new TokenController(redis, user.email!)
      const id = c.req.valid('param').id

      await tokenController.deleteToken(id)
      return c.json({ ok: true })
    }
  )

export default handler

import { modelProviderSchema } from '@/types'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { ModelController } from '../controller/model.controller'
import { createHandler } from '../helper/createHandler'
import { withAdminOnly } from '../middleware/auth.middleware'

const handler = createHandler()

handler
  .use('*', withAdminOnly)
  .get('/', async c => {
    const redis = c.env.redis
    const modelController = new ModelController(redis)

    const models = await modelController.getModels()
    return c.json(models)
  })
  .post('/', zValidator('json', modelProviderSchema), async c => {
    const redis = c.env.redis
    const modelController = new ModelController(redis)

    const data = c.req.valid('json')
    await modelController.addModel(data)
    return c.json({ ok: true })
  })
  .delete(
    '/:id',
    zValidator('param', z.object({ id: z.string().min(1) })),
    async c => {
      const redis = c.env.redis
      const modelController = new ModelController(redis)

      const { id } = c.req.valid('param')
      await modelController.deleteModel(id)
      return c.json({ ok: true })
    }
  )

export default handler

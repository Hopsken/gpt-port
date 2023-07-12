import { zValidator } from '@hono/zod-validator'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'
import { ModelController } from '../controller/model.controller'
import { createHandler } from '../helper/createHandler'
import { proxyCompletions } from '../middleware/openai-proxy.middleware'
import { validateAPIToken } from '../middleware/validate-token.middleware'

const handler = createHandler()

handler.post(
  '/v1/chat/completions',
  zValidator('json', z.object({ model: z.string().min(1) }).passthrough()),
  validateAPIToken,
  async c => {
    const result = await c.req.valid('json')
    const { model } = result
    const modelsController = new ModelController(c.env.redis)
    const provider = await modelsController.findProviderByModel(model)
    if (!provider) {
      throw new HTTPException(401, {
        message: 'Model unsupported',
      })
    }
    return proxyCompletions(c, result, provider, '/v1/chat/completions')
  }
)

export default handler

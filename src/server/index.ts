import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'
import { createHandler } from './helper/createHandler'
import { routes } from './routes'

export const initApp = (basePath = '/') => {
  const app = createHandler().basePath(basePath)

  app.use('*', logger())

  app.get('/ready', c => {
    return c.json({ message: 'OK', ok: true }, 200)
  })

  app.notFound(c => c.json({ message: 'Not Found', ok: false }, 404))
  app.onError((error, ctx) => {
    if (error instanceof HTTPException) {
      return error.getResponse()
    }
    console.trace(error)
    return ctx.json({ message: 'internal_server_error', ok: false }, 500)
  })

  routes.forEach(route => {
    app.route(route.path, route.handler)
  })
  return app
}

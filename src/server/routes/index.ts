import ModelsRoute from './models.route'
import TokensRoute from './tokens.route'

const routes = [
  {
    path: '/models',
    handler: ModelsRoute,
  },
  {
    path: '/tokens',
    handler: TokensRoute,
  },
]

export { routes }

import ModelsRoute from './models.route'
import TokensRoute from './tokens.route'
import OpenAIProxyRoute from './proxy.route'

const routes = [
  {
    path: '/models',
    handler: ModelsRoute,
  },
  {
    path: '/tokens',
    handler: TokensRoute,
  },
  {
    path: '/openai',
    handler: OpenAIProxyRoute,
  },
]

export { routes }

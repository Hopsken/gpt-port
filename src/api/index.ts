import { default as apiFetch } from './fetcher'
import * as models from './models'
import * as tokens from './tokens'

const api = {
  ...apiFetch,
  models,
  tokens,
}

export default api

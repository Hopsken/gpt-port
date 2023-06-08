import { Hono } from 'hono'
import { Env } from '../types'

export const createHandler = () => {
  return new Hono<Env>()
}

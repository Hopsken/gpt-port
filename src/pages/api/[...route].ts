import { initApp } from '@/server'
import { createRedisClient } from '@/server/db'
import { NextFetchEvent, NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

const app = initApp('/api')

const handler = (request: NextRequest, fetchEvent: NextFetchEvent) => {
  return app.fetch(
    request,
    {
      redis: createRedisClient(),
    },
    fetchEvent
  )
}

export default handler

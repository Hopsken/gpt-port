import { env } from '@/env.mjs'
import { useEffect, useMemo, useState } from 'react'

export const useAPIHost = () => {
  const [apiHost, setAPIHost] = useState(env.NEXT_PUBLIC_HOST || '')

  useEffect(() => {
    if (!apiHost) {
      setAPIHost(window.location.origin)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return apiHost
}

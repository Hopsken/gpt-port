import { env } from '@/env.mjs'

export const isEmailAllowed = (email: string) => {
  email = email.toLowerCase()
  // admin is always allowed
  if (email === env.ADMIN_EMAIL) {
    return true
  }

  // check if email is in whitelist
  const allowList = env.ALLOW_LIST
  return allowList.some(cond => meetRequirement(email, cond))
}

function meetRequirement(email: string, cond: string) {
  if (cond === '*') return true
  if (email === cond) return true
  if (!cond.includes('@') && email.endsWith(cond)) return true
  return false
}

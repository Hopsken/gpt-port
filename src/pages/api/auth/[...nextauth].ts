import NextAuth, { DefaultSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import DiscordProvider from 'next-auth/providers/discord'
import { env } from '@/env.mjs'
import { Provider } from 'next-auth/providers'
import { DefaultJWT } from 'next-auth/jwt'
import { UpstashRedisAdapter } from '@next-auth/upstash-redis-adapter'
import { createRedisClient } from '@/server/db'

const redis = createRedisClient()

function getProviders(): Provider[] {
  const providers: Provider[] = []

  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    providers.push(
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
      })
    )
  }

  if (env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET) {
    providers.push(
      DiscordProvider({
        clientId: env.DISCORD_CLIENT_ID,
        clientSecret: env.DISCORD_CLIENT_SECRET,
      })
    )
  }

  return providers
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    role: UserRole
  }
}

const isAdmin = (email?: string | null) => email === env.ADMIN_EMAIL

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  adapter: UpstashRedisAdapter(redis),

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = isAdmin(token.email) ? 'admin' : 'user'
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },

  providers: getProviders(),
}

export default NextAuth(authOptions)

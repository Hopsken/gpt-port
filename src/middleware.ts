import { authMiddleware } from '@clerk/nextjs'
import { env } from './env.mjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    // handle users who aren't authenticated
    const signInUrl = new URL('/sign-in', req.url)
    signInUrl.searchParams.set('redirect_url', req.url)

    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(signInUrl)
    }

    // handle admin user auth
    const isAdmin = auth.user?.emailAddresses.find(
      e => e.emailAddress === env.ADMIN_EMAIL
    )
    const url = new URL(req.url)
    if (url.pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(signInUrl)
    }
  },
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

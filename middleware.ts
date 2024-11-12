import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protected routes
  if (!session) {
    if (
      req.nextUrl.pathname.startsWith('/checkout') ||
      req.nextUrl.pathname.startsWith('/account') ||
      req.nextUrl.pathname.startsWith('/orders')
    ) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Redirect logged in users away from auth pages
  if (session) {
    if (
      req.nextUrl.pathname.startsWith('/login') ||
      req.nextUrl.pathname.startsWith('/signup')
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/checkout/:path*',
    '/account/:path*',
    '/orders/:path*',
    '/login',
    '/signup'
  ]
}
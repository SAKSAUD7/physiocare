import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Paths that require authentication
  const isAuthPath = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/booking/confirm')
  
  // Paths that are related to authentication
  const isAuthRelatedPath = 
    pathname.startsWith('/login') || 
    pathname.startsWith('/signup') || 
    pathname.startsWith('/forgot-password')
  
  // Get user token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key'
  })
  
  // If the user is not authenticated and trying to access a protected route
  if (!token && isAuthPath) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }
  
  // If the user is authenticated and trying to access auth-related routes
  if (token && isAuthRelatedPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Admin-only routes
  if (pathname.startsWith('/dashboard/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Doctor-only routes
  if (pathname.startsWith('/dashboard/patients') && 
      token?.role !== 'doctor' && 
      token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/login', 
    '/signup', 
    '/forgot-password', 
    '/booking/confirm'
  ],
} 
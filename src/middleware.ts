import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Protected routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/dashboard/profile',
  '/dashboard/settings',
  '/dashboard/appointments',
  '/dashboard/treatments',
]

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || 'physiocare-nextauth-secret-key',
  })

  const { pathname } = request.nextUrl
  
  // If the user is trying to access a protected route and is not authenticated
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(url)
  }

  // If the user is already authenticated and trying to access login/signup
  if ((pathname.startsWith('/login') || pathname.startsWith('/signup')) && token) {
    const url = new URL('/dashboard', request.url)
    return NextResponse.redirect(url)
  }

  // Admin-only routes
  if (pathname.startsWith('/dashboard/admin') && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Doctor-only routes
  if (
    pathname.startsWith('/dashboard/patients') && 
    token?.role !== 'doctor' && 
    token?.role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
} 
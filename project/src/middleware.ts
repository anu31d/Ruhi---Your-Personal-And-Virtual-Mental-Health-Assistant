/**
 * Protection Middleware
 * Runs on every request to validate and protect
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function runs on the edge
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Add security headers
  const response = NextResponse.next();
  
  // Prevent framing
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Content Security Policy (adjust as needed)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
    );
  }
  
  // Add custom protection header
  response.headers.set('X-App-Protection', 'enabled');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
  ],
};

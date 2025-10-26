/**
 * Next.js Middleware
 *
 * @description Protects admin routes and handles authentication
 * Redirects unauthenticated users to login page
 *
 * Protected routes:
 * - /admin/* - All admin panel routes
 *
 * Public routes:
 * - / - Homepage
 * - /about - About page
 * - /services - Services page
 * - /portfolio - Portfolio page
 * - /contact - Contact page
 * - /login - Login page
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    let supabaseResponse = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const accessToken = request.cookies.get('sb-access-token')?.value;
    const refreshToken = request.cookies.get('sb-refresh-token')?.value;

    if (!accessToken || !refreshToken) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    return supabaseResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

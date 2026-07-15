import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  // If user-role cookie isn't set yet, we don't block them instantly unless they hit the wrong route
  const userRole = request.cookies.get('user-role')?.value; 

  const isAuthenticated = !!sessionToken;

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');
  const isAdminDashboard = pathname.startsWith('/dashboard/admin');
  const isUserDashboard = pathname.startsWith('/dashboard/user');

  // Case A: Logged-in users hitting login/signup pages
  if (isAuthenticated && isAuthRoute) {
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard/user', request.url));
  }

  // Case B: Public users attempting to access secure Dashboards
  if (!isAuthenticated && (isAdminDashboard || isUserDashboard)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Case C: Regular logged-in users attempting to access Admin resources
  // ONLY redirect if we are 100% sure they are not an admin (userRole is explicitly set and not admin)
  if (isAuthenticated && userRole && userRole !== 'admin' && isAdminDashboard) {
    return NextResponse.redirect(new URL('/dashboard/user', request.url));
  }

  // Case D: Admins attempting to view regular User layouts
  if (isAuthenticated && userRole === 'admin' && isUserDashboard) {
    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard/:path*',
  ],
};
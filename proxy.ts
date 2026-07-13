import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Fetch Better-Auth session cookies directly from the server request
  // Better-Auth typically sets 'better-auth.session_token' or similar. Check your application storage tab!
  const sessionToken = request.cookies.get('better-auth.session_token')?.value;
  
  // Better-Auth usually stores the user payload or role in a sister cookie, 
  // or you can parse it if it's a JWT. For a lightweight check without async DB overhead:
  const userRole = request.cookies.get('user-role')?.value; // Make sure your login sets this!

  const isAuthenticated = !!sessionToken;

  // 2. Define route targets
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
  if (isAuthenticated && userRole !== 'admin' && isAdminDashboard) {
    return NextResponse.redirect(new URL('/dashboard/user', request.url));
  }

  // Case D: Admins attempting to view regular User layouts
  if (isAuthenticated && userRole === 'admin' && isUserDashboard) {
    return NextResponse.redirect(new URL('/dashboard/admin', request.url));
  }

  return NextResponse.next();
}

// 3. Keep your original configuration block intact
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard/:path*',
  ],
};
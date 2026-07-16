import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from "@/app/lib/auth"; 

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;
  const role = (user as any)?.role; 

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup');

  if (isAuthRoute) {
    if (user) {
      const dashboard = role === 'admin' ? '/dashboard/admin' : '/dashboard/user';
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // STRICT STEP: If path explicitly goes down user channels and you are an admin, redirect immediately
    if (pathname.startsWith('/dashboard/user') && role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard/admin', request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard/user', request.url));
    }
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
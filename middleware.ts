import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('next-auth.session-token');
  const { pathname } = request.nextUrl;

  if (!sessionToken && pathname === '/') {
    return NextResponse.redirect(new URL('/gifts', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};

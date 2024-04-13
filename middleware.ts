import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const sessionToken =
  //   request.cookies.get('next-auth.session-token') ||
  //   request.cookies.get('_vercel_jwt')?.value;
  // const { pathname } = request.nextUrl;

  // const cookieStore = cookies();

  /* console.log(
    cookieStore
      .getAll()
      .map(cookie => console.log('cookie', cookie.name, cookie.value))
  );

  console.log('request', request);
  console.log('cookies', request.cookies.get('_vercel_jwt')?.value);
  console.log('sessionToken', sessionToken);
  console.log('redirect?', !sessionToken && pathname === '/'); */

  // if (!sessionToken && pathname === '/') {
  //   return NextResponse.redirect(new URL('/gifts', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};

import { auth } from '@/auth';

export default auth(req => {
  const isLoggedIn = !!req.auth;

  console.log('Route: ', req.nextUrl.pathname);
  console.log('isLoggedIn:', isLoggedIn);
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

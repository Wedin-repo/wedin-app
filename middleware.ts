import { auth } from '@/auth';
import {
  apiAuthPrefix,
  authRoutes,
  notOnboardedRoutes,
  onboardedRoutes,
  publicRoutes,
} from '@/routes';

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isOnboarded = !!req.user?.onboarded;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isOnboardedRoute = onboardedRoutes.includes(nextUrl.pathname);
  // Peope that are authenticated but not onboarded
  const isNotOnboardedUserRoute = notOnboardedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute || isPublicRoute) {
    return;
  }

  if (isLoggedIn && !isOnboarded && isAuthRoute) {
    return Response.redirect(new URL('/onboarding', nextUrl));
  }

  if (isLoggedIn && isOnboarded && (isAuthRoute || isNotOnboardedUserRoute)) {
    return Response.redirect(new URL('/dashboard', nextUrl));
  }

  if (!isLoggedIn && isOnboardedRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

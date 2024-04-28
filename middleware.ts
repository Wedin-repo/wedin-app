import { auth } from '@/auth';
import {
  apiAuthPrefix,
  authRoutes,
  onboardingRoute,
  privateRoutes,
  publicRoutes,
} from '@/routes';

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // const isOnboarded = !!req.user?.onboarded;
  const isOnboarded = true;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = onboardingRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute || isPublicRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    if (isOnboarded) {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
    if (!isOnboarded) {
      return Response.redirect(new URL('/onboarding', nextUrl));
    }
  }

  if (isLoggedIn && isOnboardingRoute) {
    if (isOnboarded) {
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
  }

  if (!isLoggedIn && (isPrivateRoute || isOnboardingRoute)) {
    return Response.redirect(new URL('/login', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

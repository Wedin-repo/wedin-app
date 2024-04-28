import { auth } from '@/auth';
import {
  apiAuthPrefix,
  authRoutes,
  onboardingRoute,
  protectedRoutes,
  publicRoutes,
} from '@/routes';

export default auth(req => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isOnboarded = isLoggedIn ? req.auth?.user.isOnboarded ?? false : false;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = onboardingRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isLoggedIn && !isOnboarded && (isPublicRoute || isProtectedRoute)) {
    return Response.redirect(new URL('/onboarding', nextUrl));
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

  if (!isLoggedIn && (isProtectedRoute || isOnboardingRoute)) {
    return Response.redirect(new URL('/login', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

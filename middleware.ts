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

  console.log('isLoggedIn', isLoggedIn);
  console.log('isOnboarded', isOnboarded);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isOnboardingRoute = onboardingRoute.includes(nextUrl.pathname);

  if (isApiAuthRoute || isOnboarded) {
    return;
  }

  if (isLoggedIn && !isOnboarded && (isPublicRoute || isProtectedRoute)) {
    return Response.redirect(new URL('/onboarding', nextUrl));
  }

  if (isLoggedIn && isAuthRoute) {
    if (isOnboarded) {
      console.log('heelo1');
      return Response.redirect(new URL('/dashboard', nextUrl));
    }
    if (!isOnboarded) {
      console.log('heelo2');
      return Response.redirect(new URL('/onboarding', nextUrl));
    }
  }

  if (isLoggedIn && isOnboardingRoute) {
    if (isOnboarded) {
      console.log('heelo3');

      return Response.redirect(new URL('/dashboard', nextUrl));
    }
  }

  if (!isLoggedIn && (isProtectedRoute || isOnboardingRoute)) {
    console.log('heelo4 ');
    return Response.redirect(new URL('/login', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

/**
 * An Array of routes that are accessible to the public
 * These routes do no require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  '/gifts',
  '/events',
  '/giftlists',
  '/',
  '/email-verfiy',
];

/**
 * An Array of routes that are accessible to the public
  and use to login and register
 * @type {string[]}
 */
export const authRoutes: string[] = [
  '/login',
  '/register',
  '/password-reset',
  '/new-password',
];

/**
 * An array of routes that are accessible to the logged in
  and onboarded user
 * @type {string[]}
 */
export const protectedRoutes: string[] = ['/dashboard'];

/**
 * An array of routes that are accessible to the logged in user
   but not onboarded
 * @type {string[]}
 */
export const onboardingRoute: string[] = ['/onboarding'];

/**
 * The prefix of API authentication routes
 * Routes that start with ap are for auth purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

export const DEFUALT_LOGIN_REDIRECT_ROUTE = '/dashboard';

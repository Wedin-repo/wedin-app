import { symlink } from 'fs';

/**
 * An Array of routes that are accessible to the public
 * These routes do no require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ['/gifts', '/lists', '/weddings'];

/**
 * An Array of routes that are accessible to the public
 * and use to login and register
 * @type {string[]}
 */
export const authRoutes: string[] = ['/login', '/register'];

/**
 * An array of routes that are accessible to the logged in user
 * and onboarded user
 * @type {string[]}
 */
export const onboardedRoutes: string[] = ['/dashboard'];

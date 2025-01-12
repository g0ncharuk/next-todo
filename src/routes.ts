/**
 * An array of routes that are accessible to the public
 * These routes do not required authentification
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentification
 * These routes will redrect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/registration", "/auth/error"];

/**
 * The prefix for API authentification routes
 * Routes that start with this prefix are used for API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

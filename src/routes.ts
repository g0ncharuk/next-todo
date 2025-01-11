/**
 * An array of routes that are accessible to the public
 * These routes do not required authentification
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/verification"];

/**
 * An array of routes that are used for authentification
 * These routes will redrect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/registration",
    "/auth/reset",
    "/auth/new-password",
    "/auth/error",
];

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

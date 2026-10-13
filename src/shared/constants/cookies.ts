// Cookie lifetimes must match the lifetime of the token each cookie holds:
// - access token: JWT signed with expiresIn "1d"
// - refresh token: expiresAt set 7 days after creation (see the use cases)
const ONE_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const SEVEN_DAYS_IN_MILLISECONDS = 7 * ONE_DAY_IN_MILLISECONDS;

export const accessTokenCookieOptions = {
  httpOnly: true,
  maxAge: ONE_DAY_IN_MILLISECONDS,
} as const;

export const refreshTokenCookieOptions = {
  httpOnly: true,
  maxAge: SEVEN_DAYS_IN_MILLISECONDS,
} as const;

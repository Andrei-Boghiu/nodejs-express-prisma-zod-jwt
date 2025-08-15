const JWT_SECRET = process.env.JWT_SECRET;

const ACCESS_TOKEN_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const COOKIE_REFRESH_AGE = 604800000; // 7 days in milliseconds
const COOKIE_ACCESS_AGE = 3600000; // 1 hour in milliseconds
const COOKIE_SECURE = process.env.NODE_ENV === "production";
const COOKIE_SAME_SITE = "strict";
const COOKIE_HTTP_ONLY = true;
const COOKIE_PATH = "/";

const COOKIE_OPTIONS = {
  httpOnly: COOKIE_HTTP_ONLY,
  secure: COOKIE_SECURE,
  sameSite: COOKIE_SAME_SITE,
  maxAge: COOKIE_ACCESS_AGE,
  path: COOKIE_PATH,
};

const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8U5vOXk3ih6f4HZni9eN5vKGqDqm.e";

module.exports = {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  COOKIE_REFRESH_AGE,
  COOKIE_ACCESS_AGE,
  COOKIE_SECURE,
  COOKIE_SAME_SITE,
  COOKIE_HTTP_ONLY,
  COOKIE_PATH,
  COOKIE_OPTIONS,
  DUMMY_HASH,
};

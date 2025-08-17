const { doubleCsrf } = require("csrf-csrf");
const { COOKIE_OPTIONS, CSRF_COOKIE_NAME } = require("../configs/auth.config");

const { doubleCsrfProtection, generateCsrfToken, invalidCsrfTokenError } = doubleCsrf({
  getSecret: (req) =>
    req.session.csrfSecret || (req.session.csrfSecret = require("crypto").randomBytes(32).toString("hex")),
  cookieName: CSRF_COOKIE_NAME,
  cookieOptions: COOKIE_OPTIONS,
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getSessionIdentifier: (req) => req.session.id,
  getTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

function attachCsrfToken(req, res, next) {
  const token = generateCsrfToken(req, res);
  res.locals.csrfToken = token;

  res.setHeader("X-CSRF-Token", token);
  res.cookie(CSRF_COOKIE_NAME, token, COOKIE_OPTIONS);

  next();
}

function csrfErrorHandler(err, req, res, next) {
  if (err === invalidCsrfTokenError) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }
  next(err);
}

module.exports = {
  doubleCsrfProtection,
  attachCsrfToken,
  csrfErrorHandler,
};

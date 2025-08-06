const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
  COOKIE_OPTIONS,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  COOKIE_ACCESS_AGE,
  COOKIE_REFRESH_AGE,
} = require("../configs/auth.config");
const prisma = require("../prisma/client");

async function loginService(res, user) {
  const payload = { userId: user.id, email: user.email };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  res.cookie("accessToken", accessToken, {
    ...COOKIE_OPTIONS,
    maxAge: COOKIE_ACCESS_AGE,
  });

  res.cookie("refreshToken", refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: COOKIE_REFRESH_AGE,
  });

  const { password: _, refreshToken: __, ...publicUserObject } = user;
  return publicUserObject;
}

module.exports = {
  loginService,
};

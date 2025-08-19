const jwt = require("jsonwebtoken");
const { JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = require("../configs/auth.config");
const prisma = require("../prisma/client");

async function loginService(user) {
  const payload = { userId: user.id, email: user.email };

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  return { accessToken, refreshToken };
}

module.exports = loginService;

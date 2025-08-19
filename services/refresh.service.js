const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");
const { JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN } = require("../configs/auth.config");

async function refreshTokens(req) {
  const refreshToken = req.headers["x-refresh-token"];

  if (!refreshToken) {
    return { error: { status: 401, message: "Refresh token missing" } };
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    // Check DB for refresh token
    const tokenEntry = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenEntry || tokenEntry.userId !== decoded.userId) {
      return { error: { status: 401, message: "Invalid refresh token" } };
    }

    // Rotate tokens
    const payload = { userId: decoded.userId, email: decoded.email };
    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const newRefreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { token: newRefreshToken },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: { id: decoded.userId, email: decoded.email },
    };
  } catch (err) {
    return { error: { status: 401, message: "Invalid or expired refresh token" } };
  }
}

module.exports = refreshTokens;

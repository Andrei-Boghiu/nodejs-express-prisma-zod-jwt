const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");
const {
  COOKIE_REFRESH_AGE,
  COOKIE_ACCESS_AGE,
  COOKIE_OPTIONS,
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../configs/auth.config");

async function refreshTokens(req, res) {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return { error: { status: 401, message: "Refresh token missing" } };
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return { error: { status: 401, message: "User not found" } };
    }

    if (user.refreshToken !== refreshToken) {
      return { error: { status: 401, message: "Refresh token invalid" } };
    }

    // Generate new tokens (rotation)
    const payload = { userId: user.id, email: user.email };
    const newAccessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    const newRefreshToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    res.cookie("accessToken", newAccessToken, {
      ...COOKIE_OPTIONS,
      maxAge: COOKIE_ACCESS_AGE,
    });

    res.cookie("refreshToken", newRefreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: COOKIE_REFRESH_AGE,
    });

    return { user: { id: user.id, email: user.email } };
  } catch (err) {
    return { error: { status: 401, message: "Invalid or expired refresh token" } };
  }
}

module.exports = refreshTokens;

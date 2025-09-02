const { ACCESS_TOKEN_EXPIRES_IN, REFRESH_TOKEN_EXPIRES_IN, JWT_SECRET } = require("../../configs/auth.config");
const prisma = require("../../prisma/client");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const refreshToken = req.body?.refreshToken;

  if (!refreshToken) return res.status(401).json({ message: "Refresh token missing" });

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);

    const tokenEntry = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenEntry || tokenEntry.userId !== decoded.userId)
      return res.status(401).json({ message: "Invalid refresh token" });

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

    if (!user) return res.status(401).json({ message: "Invalid refresh token" });

    // Rotate tokens
    const payload = { userId: user.id, email: user.email };
    const newAccessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    const newRefreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { token: newRefreshToken },
    });

    res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

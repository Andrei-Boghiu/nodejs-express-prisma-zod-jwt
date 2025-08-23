const jwt = require("jsonwebtoken");
const refreshTokens = require("../services/refresh.service");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["Authorization"] || req.headers["authorization"];
  const accessToken = authHeader?.split("Bearer ")[1];
  const refreshToken = req.headers["x-refresh-token"];

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: "Unauthorized! Missing access or/and refresh token/s" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    return next();
  } catch {
    // Access token expired, try refresh token
    const result = await refreshTokens(req);
    if (result.error) return res.status(result.error.status).json({ error: result.error.message });

    req.user = result.user;
    res.setHeader("x-access-token", result.accessToken);
    res.setHeader("x-refresh-token", result.refreshToken);
    return next();
  }
};

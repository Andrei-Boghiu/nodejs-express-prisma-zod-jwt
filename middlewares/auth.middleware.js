const jwt = require("jsonwebtoken");
const refreshTokens = require("../services/refresh.service");

module.exports = async (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"]; // access token
  const accessToken = authHeader?.split("Bearer ")[1];

  if (!accessToken) {
    // Try refresh token
    const result = await refreshTokens(req);
    if (result.error) return res.status(result.error.status).json({ error: result.error.message });

    req.user = result.user;
    // Send new tokens in response headers
    res.setHeader("x-access-token", result.accessToken);
    res.setHeader("x-refresh-token", result.refreshToken);
    return next();
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch {
    // Access token expired, try refresh token
    const result = await refreshTokens(req);
    if (result.error) return res.status(result.error.status).json({ error: result.error.message });

    req.user = result.user;
    res.setHeader("x-access-token", result.accessToken);
    res.setHeader("x-refresh-token", result.refreshToken);
    next();
  }
};

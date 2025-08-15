const refreshTokens = require("../services/refresh.service");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    const result = await refreshTokens(req, res);

    if (result.error) {
      return res.status(result.error.status).json({ error: result.error.message });
    }

    req.user = result.user;
    return next();
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

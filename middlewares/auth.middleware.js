const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["Authorization"] || req.headers["authorization"];
  const accessToken = authHeader?.split("Bearer ")[1];

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized! Missing access token" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.user = { id: decoded.userId, email: decoded.email };
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid access token" });
  }
};

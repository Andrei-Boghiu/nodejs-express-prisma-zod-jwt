function getIsPostman(req) {
  const userAgent = req.headers["user-agent"]?.toLowerCase() || "";
  return userAgent.includes("postman");
}

module.exports = getIsPostman;

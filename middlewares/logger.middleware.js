module.exports = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  res.on("finish", () => {
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${ip} - ${method} ${url} - ${statusCode}`);
  });

  next();
};

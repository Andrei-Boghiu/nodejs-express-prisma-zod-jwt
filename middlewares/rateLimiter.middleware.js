const rateLimit = require("express-rate-limit");
const getIsPostman = require("../utils/getIsPostman.util");

const isProd = process.env.ENVIRONMENT === "production";

const PROD_WINDOW = 10 * 60 * 1000; // 10min
const DEV_WINDOW = 5 * 60 * 1000; // 5min

const PROD_MAX = 150;
const DEV_MAX = 300;

const rateLimiter = rateLimit({
  windowMs: isProd ? PROD_WINDOW : DEV_WINDOW,
  max: isProd ? PROD_MAX : DEV_MAX,
  skip: (req) => !isProd && getIsPostman(req), // skip for Postman in non-prod
  message: {
    error: "Too many requests, please try again later.",
  },
});

module.exports = rateLimiter;

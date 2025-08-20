const getIsPostman = require("../utils/getIsPostman.util");

const isProd = process.env.ENVIRONMENT === "production";

module.exports = async (req, res, next) => {
  const isPostman = getIsPostman(req);

  if (!isProd && !isPostman) {
    const delay = Math.floor(Math.random() * 1000) + 500; // 500–1500 ms
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  next();
};

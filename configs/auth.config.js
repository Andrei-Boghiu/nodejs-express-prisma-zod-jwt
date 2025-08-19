const isProd = process.env.NODE_ENV === "production";

const JWT_SECRET = process.env.JWT_SECRET;

const ACCESS_TOKEN_EXPIRES_IN = "1h";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

const DUMMY_HASH = "$2b$10$CwTycUXWue0Thq9StjUM0uJ8U5vOXk3ih6f4HZni9eN5vKGqDqm.e";

module.exports = {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  DUMMY_HASH,
};

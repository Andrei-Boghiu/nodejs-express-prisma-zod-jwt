const corsConfig = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "x-refresh-token", "x-access-token", "Authorization"],
  exposedHeaders: ["x-refresh-token", "x-access-token"],
  credentials: true,
};

module.exports = corsConfig;

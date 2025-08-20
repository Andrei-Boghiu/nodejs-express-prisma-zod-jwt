const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const membershipRoutes = require("./routes/membership.routes");
const milestoneRoutes = require("./routes/milestone.routes");
const taskRoutes = require("./routes/task.routes");
const commentRoutes = require("./routes/comment.routes");

const rateLimiter = require("./middlewares/rateLimiter.middleware");
const loggerMiddleware = require("./middlewares/logger.middleware");

const fallbackHandler = require("./utils/fallbackHandler.util");

const corsConfig = require("./configs/cors.config");

const app = express();

// middleware
app.use(rateLimiter);
app.use(loggerMiddleware);
app.use(cors(corsConfig));
app.use(helmet());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/milestones", milestoneRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/memberships", membershipRoutes);

// fallback route handler
app.use(fallbackHandler);

module.exports = app;

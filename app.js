const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const commentRoutes = require("./routes/comment.routes");

const rateLimiter = require("./middlewares/rateLimiter.middleware");
const fallbackHandler = require("./utils/fallbackHandler.util");

const app = express();

// middleware
app.use(cors()); // ! config object missing. TO UPDATE LATER
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);

// fallback route handler
app.use(fallbackHandler);

module.exports = app;

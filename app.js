const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const commentRoutes = require("./routes/comment.routes");

const rateLimiter = require("./middlewares/rateLimiter.middleware");

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// routes
app.use("/api/auth", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (_, res) => {
  res.send("API is running...");
});

module.exports = app;

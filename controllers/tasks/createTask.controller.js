const prisma = require("../../prisma/client");
const { createTaskSchema } = require("../../validators/task.validator");

module.exports = async (req, res) => {
  try {
    const { title, projectId, completed, userId } = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title,
        userId: userId || req.user.id,
        completed: Boolean(completed),
        projectId,
      },
    });

    res.status(201).json(task);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    console.error("Create task error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

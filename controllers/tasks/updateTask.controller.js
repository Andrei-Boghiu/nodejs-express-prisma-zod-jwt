const prisma = require("../../prisma/client");
const { updateTaskSchema } = require("../../validators/task.validator");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const data = updateTaskSchema.parse(req.body);

    const existingTask = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    res.json(updatedTask);
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    console.error("Update task error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

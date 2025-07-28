const prisma = require("../../prisma/client");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Get task by ID error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

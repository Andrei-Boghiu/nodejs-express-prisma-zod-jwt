const prisma = require("../../prisma/client");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    await prisma.task.delete({ where: { id } });

    res.status(204).send();
  } catch (err) {
    console.error("Delete task error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

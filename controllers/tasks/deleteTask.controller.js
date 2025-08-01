const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id, userId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    await prisma.task.delete({
      where: { id, userId },
    });

    res.status(204).send();
  } catch (error) {
    return handleError(error, res, "deleteTask.controller");
  }
};

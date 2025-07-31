const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateTaskSchema } = require("../../validators/task.validator");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const data = updateTaskSchema.parse(req.body);

    const authorization = await prisma.task.findFirst({
      where: {
        id,
        milestone: {
          project: {
            Memberships: { some: { userId, role: { in: ["OWNER", "MANAGER", "CONTRIBUTOR"] } } },
          },
        },
      },
    });

    if (!authorization) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });

    res.json(updatedTask);
  } catch (error) {
    return handleError(error, res, "updateTask.controller");
  }
};

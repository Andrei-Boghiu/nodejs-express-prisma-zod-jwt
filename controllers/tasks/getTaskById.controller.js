const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        milestone: {
          project: {
            OR: [{ Memberships: { some: { userId, hasAccepted: true } } }, { visibility: "PUBLIC" }],
          },
        },
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    res.json(task);
  } catch (error) {
    return handleError(error, res, "getTaskById.controller");
  }
};

const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createTaskSchema } = require("../../validators/task.validator");

module.exports = async (req, res) => {
  try {
    const { assigneeId, ...data } = createTaskSchema.parse(req.body);
    const { milestoneId } = req.params;
    const userId = req.user.id;

    const authorization = await prisma.milestone.findFirst({
      where: {
        id: milestoneId,
        project: {
          Memberships: {
            some: {
              AND: [
                { userId, role: { in: ["OWNER", "MANAGER", "CONTRIBUTOR"] } },
                { userId: assigneeId, hasAccepted: true, role: { not: "VIEWER" } },
              ],
            },
          },
        },
      },
    });

    if (!authorization) {
      return res.status(404).json({
        error: "Invalid milestoneId, or invalid assigneeId, or unauthorized assigneeId, or unauthorized action",
      });
    }

    const task = await prisma.task.create({
      data: {
        ...data,
        assignee: assigneeId ? { connect: { id: assigneeId } } : undefined,
        milestone: { connect: { id: milestoneId } },
        createdByUser: { connect: { id: userId } },
        updatedByUser: { connect: { id: userId } },
      },
    });

    res.status(201).json(task);
  } catch (error) {
    return handleError(error, res, "createTask.controller");
  }
};

const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createCommentSchema } = require("../../validators/comment.validator");

module.exports = async (req, res) => {
  try {
    const data = createCommentSchema.parse(req.body);
    const { taskId } = req.params;
    const userId = req.user.id;

    const authorization = await prisma.task.findFirst({
      where: {
        id: taskId,
        milestone: {
          project: {
            Memberships: { some: { userId, role: { notIn: ["VIEWER"] } } },
          },
        },
      },
    });

    if (!authorization) {
      return res.status(404).json({ error: "Invalid taskId or unauthorized" });
    }

    const comment = await prisma.comment.create({
      data: {
        ...data,
        task: { connect: { id: taskId } },
        user: { connect: { id: userId } },
        createdByUser: { connect: { id: userId } },
        updatedByUser: { connect: { id: userId } },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    return handleError(error, res, "createComment.controller");
  }
};

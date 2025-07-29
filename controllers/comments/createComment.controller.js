const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createCommentSchema } = require("../../validators/comment.validator");

module.exports = async (req, res) => {
  try {
    const { content, taskId } = createCommentSchema.parse(req.body);
    const userId = req.user.id;

    const comment = await prisma.comment.create({
      data: {
        content,
        userId,
        taskId,
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    return handleError(error, res, "createComment.controller");
  }
};

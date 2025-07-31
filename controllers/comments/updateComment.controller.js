const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateCommentSchema } = require("../../validators/comment.validator");

module.exports = async (req, res) => {
  try {
    const data = updateCommentSchema.parse(req.body);
    const userId = req.user.id;
    const { id } = req.params;

    // ? verify ownership before updating (e.g., cannot update the comment owned by another user)
    const existingComment = await prisma.comment.findFirst({
      where: { id, userId },
    });

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id, userId },
      data,
    });

    res.json(updatedComment);
  } catch (error) {
    return handleError(error, res, "updateComment.controller");
  }
};

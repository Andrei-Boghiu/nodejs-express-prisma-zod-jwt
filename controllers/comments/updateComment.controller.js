const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateCommentSchema } = require("../../validators/comment.validator");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;
    const data = updateCommentSchema.parse(req.body);

    // ? verify ownership before updating (e.g., cannot update the comment owned by another user)
    const existingComment = await prisma.comment.findUnique({
      where: { id, ownerId },
    });

    if (!existingComment) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id, ownerId },
      data,
    });

    res.json(updatedComment);
  } catch (error) {
    return handleError(error, res, "updateComment.controller");
  }
};

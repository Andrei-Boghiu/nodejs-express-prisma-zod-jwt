const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // ? verify ownership before deletion (e.g., cannot delete the comment owned by another user)
    const authorization = await prisma.comment.findFirst({
      where: { id, createdBy: userId },
    });

    if (!authorization) {
      return res.status(404).json({ error: "Comment not found or unauthorized" });
    }

    await prisma.comment.delete({
      where: { id, createdBy: userId },
    });

    res.status(204).send();
  } catch (error) {
    return handleError(error, res, "deleteComment.controller");
  }
};

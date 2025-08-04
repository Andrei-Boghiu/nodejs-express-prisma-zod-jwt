const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await prisma.comment.findUnique({
      where: {
        id,
        task: {
          milestone: {
            project: { OR: [{ visibility: "PUBLIC" }, { Memberships: { some: { userId, hasAccepted: true } } }] },
          },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    return handleError(error, res, "getCommentById.controller");
  }
};

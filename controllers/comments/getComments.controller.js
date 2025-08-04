const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;

    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const authorization = await prisma.task.findFirst({
      where: {
        id: taskId,
        milestone: {
          project: {
            OR: [{ visibility: "PUBLIC" }, { Memberships: { some: { userId } } }],
          },
        },
      },
    });

    if (!authorization) {
      return res.status(404).json({ error: "Invalid taskId or unauthorized" });
    }

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { taskId },
        orderBy: { updatedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.comment.count({ where: { taskId } }),
    ]);

    res.status(200).json({
      data: comments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error, res, "getComments.controller");
  }
};

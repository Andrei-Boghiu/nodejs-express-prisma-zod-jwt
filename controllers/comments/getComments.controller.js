const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getCommentsSchema } = require("../../validators/comment.validator");

module.exports = async (req, res) => {
  try {
    const { taskId } = getCommentsSchema.parse(req.body);

    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const [comments, total] = await Promise.all([
      prisma.comment.findMany({
        where: { taskId },
        orderBy: { id: "asc" },
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

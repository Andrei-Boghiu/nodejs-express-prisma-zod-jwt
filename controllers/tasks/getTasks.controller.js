const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;

    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where: { userId },
        orderBy: { id: "asc" },
        skip,
        take: limit,
      }),
      prisma.task.count({ where: { userId } }),
    ]);

    res.status(200).json({
      data: tasks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error, res, "getTasks.controller");
  }
};

const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { ownerId },
        orderBy: { id: "asc" },
        skip,
        take: limit,
      }),
      prisma.project.count({ where: { ownerId } }),
    ]);

    res.status(200).json({
      data: projects,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error, res, "getProjects.controller");
  }
};

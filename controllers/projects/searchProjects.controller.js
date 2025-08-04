const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const searchKeyword = req.query.search;

    const pageStr = req.query.page;
    const limitStr = req.query.limit;

    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const where = { visibility: "PUBLIC" };
    if (searchKeyword) {
      where.name = {
        contains: searchKeyword,
        mode: "insensitive",
      };
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
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
    return handleError(error, res, "searchProjects.controller");
  }
};

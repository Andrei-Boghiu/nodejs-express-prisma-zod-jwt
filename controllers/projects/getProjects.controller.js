const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const hasAccepted = req.query.hasAccepted;

    const pageStr = req.query.page;
    const limitStr = req.query.limit;

    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const where = { Memberships: { some: { userId } } };

    switch (hasAccepted) {
      case "true":
        where.Memberships.some.hasAccepted = true;
        break;
      case "false":
        where.Memberships.some.hasAccepted = false;
        break;
      default:
        break;
    }

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          Memberships: {
            select: { role: true, hasAccepted: true },
          },
        },
        orderBy: { id: "asc" },
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
    return handleError(error, res, "getProjects.controller");
  }
};

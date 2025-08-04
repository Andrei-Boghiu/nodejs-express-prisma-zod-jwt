const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const { projectId } = req.params;

    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const [memberships, total] = await Promise.all([
      prisma.membership.findMany({ where: { projectId }, orderBy: { id: "asc" }, skip, take: limit }),
      prisma.membership.count({ where: { projectId } }),
    ]);

    res.status(200).json({
      data: memberships,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error, res, "getMemberships.controller");
  }
};

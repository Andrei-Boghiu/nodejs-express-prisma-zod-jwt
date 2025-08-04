const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { getPaginationParams } = require("../../utils/pagination.util");

module.exports = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;

    const membership = await prisma.membership.findFirst({
      where: { projectId, userId },
    });

    if (!membership) {
      return res.status(404).json({ error: "Invalid projectId or unauthorized" });
    }

    const pageStr = req.query.page;
    const limitStr = req.query.limit;
    const { page, limit, skip } = getPaginationParams(pageStr, limitStr);

    const [milestones, total] = await Promise.all([
      prisma.milestone.findMany({ where: { projectId }, orderBy: { createdAt: "desc" }, skip, take: limit }),
      prisma.milestone.count({ where: { projectId } }),
    ]);

    res.status(200).json({
      data: milestones,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return handleError(error, res, "getMilestones.controller");
  }
};

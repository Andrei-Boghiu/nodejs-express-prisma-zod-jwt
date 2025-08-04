const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const milestone = await prisma.milestone.findFirst({
      where: {
        id,
        project: {
          Memberships: { some: { userId } },
        },
      },
    });

    if (!milestone) {
      return res.status(404).json({ error: "Milestone not found or unauthorized" });
    }

    res.json(milestone);
  } catch (error) {
    return handleError(error, res, "getMilestoneById.controller");
  }
};

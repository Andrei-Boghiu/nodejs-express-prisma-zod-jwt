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
          Memberships: {
            some: {
              userId,
              role: { in: ["OWNER", "MANAGER"] },
            },
          },
        },
      },
    });

    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found or unauthorized" });
    }

    await prisma.milestone.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    return handleError(error, res, "deleteMilestone.controller");
  }
};

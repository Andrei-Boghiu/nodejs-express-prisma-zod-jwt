const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateMilestoneSchema } = require("../../validators/milestone.validator");

module.exports = async (req, res) => {
  try {
    const data = updateMilestoneSchema.parse(req.body);
    const userId = req.user.id;
    const { id } = req.params;

    const authorization = await prisma.milestone.findFirst({
      where: {
        id,
        project: {
          Memberships: { some: { userId, role: { in: ["OWNER", "MANAGER"] } } },
        },
      },
    });

    if (!authorization) {
      return res.status(404).json({ error: "Milestone not found or unauthorized" });
    }

    const updatedMilestone = await prisma.milestone.update({
      where: { id },
      data: {
        ...data,
        updatedByUser: { connect: { id: userId } },
      },
    });

    res.json(updatedMilestone);
  } catch (error) {
    return handleError(error, res, "updateMilestones.controller");
  }
};

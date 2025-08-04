const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createMilestoneSchema } = require("../../validators/milestone.validator");

module.exports = async (req, res) => {
  try {
    const data = createMilestoneSchema.parse(req.body);
    const { projectId } = req.params;
    const userId = req.user.id;

    const authorization = await prisma.project.findFirst({
      where: { id: projectId, Memberships: { some: { userId, role: { in: ["OWNER", "MANAGER"] } } } },
    });

    if (!authorization) {
      return res.status(404).json({ error: "Invalid projectId or unauthorized" });
    }

    const milestone = await prisma.milestone.create({
      data: {
        ...data,
        project: { connect: { id: projectId } },
        createdByUser: { connect: { id: userId } },
        updatedByUser: { connect: { id: userId } },
      },
    });

    res.status(201).json(milestone);
  } catch (error) {
    return handleError(error, res, "createMilestone.controller");
  }
};

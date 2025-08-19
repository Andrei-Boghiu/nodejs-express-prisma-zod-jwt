const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateProjectSchema } = require("../../validators/project.validator");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const data = updateProjectSchema.parse(req.body);

    const authorization = await prisma.project.findFirst({
      where: {
        id,
        Memberships: {
          some: {
            userId,
            role: { in: ["OWNER", "MANAGER"] },
          },
        },
      },
    });

    if (!authorization) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        updatedByUser: { connect: { id: userId } },
      },
    });

    res.json(updatedProject);
  } catch (error) {
    return handleError(error, res, "updateProject.controller");
  }
};

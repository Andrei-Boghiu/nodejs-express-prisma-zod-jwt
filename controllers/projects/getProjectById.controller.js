const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: { id, ownerId },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    return handleError(error, res, "getProjectsById.controller");
  }
};

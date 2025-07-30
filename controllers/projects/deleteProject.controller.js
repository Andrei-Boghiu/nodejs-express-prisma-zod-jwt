const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    // ? verify ownership before deletion (e.g., cannot delete the project owned by another user)
    const existingProject = await prisma.project.findFirst({
      where: { id, ownerId },
    });

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    return handleError(error, res, "deleteProject.controller");
  }
};

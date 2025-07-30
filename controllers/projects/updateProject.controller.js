const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateProjectSchema } = require("../../validators/project.validator");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;
    const data = updateProjectSchema.parse(req.body);

    // ? verify ownership before update (e.g., cannot update a project own by another user)
    const existingProject = await prisma.project.findUnique({
      where: { id, ownerId },
    });

    if (!existingProject) {
      return res.status(404).json({ error: "Project not found or unauthorized" });
    }

    const updatedProject = await prisma.project.update({
      where: { id, ownerId },
      data,
    });

    res.json(updatedProject);
  } catch (error) {
    return handleError(error, res, "updateProject.controller");
  }
};

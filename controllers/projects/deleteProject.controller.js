const prisma = require("../../prisma/client");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { id } = req.params;

    // Verify ownership before deletion
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
  } catch (err) {
    console.error("Delete project error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

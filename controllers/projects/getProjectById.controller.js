const prisma = require("../../prisma/client");

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
  } catch (err) {
    console.error("Get project by ID error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

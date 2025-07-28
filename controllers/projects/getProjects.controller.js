const prisma = require("../../prisma/client");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const projects = await prisma.project.findMany({
      where: { ownerId },
    });

    res.json(projects);
  } catch (err) {
    console.error("Get projects error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

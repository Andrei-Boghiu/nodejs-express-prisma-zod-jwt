const prisma = require("../../prisma/client");
const { createProjectSchema } = require("../../validators/project.validator");

module.exports = async (req, res) => {
  try {
    const { name } = createProjectSchema.parse(req.body);
    const ownerId = req.user.id;

    const project = await prisma.project.create({
      data: { name, ownerId },
    });

    res.status(201).json(project);
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      return res.status(400).json({ error: err.errors });
    }
    console.error("Create project error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

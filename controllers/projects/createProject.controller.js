const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createProjectSchema } = require("../../validators/project.validator");

module.exports = async (req, res) => {
  try {
    const { name } = createProjectSchema.parse(req.body);
    const ownerId = req.user.id;

    const project = await prisma.project.create({
      data: { name, ownerId },
    });

    res.status(201).json(project);
  } catch (error) {
    return handleError(error, res, "createProject.controller");
  }
};

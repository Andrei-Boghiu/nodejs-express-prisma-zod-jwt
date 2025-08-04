const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createProjectSchema } = require("../../validators/project.validator");

module.exports = async (req, res) => {
  try {
    const data = createProjectSchema.parse(req.body);
    const userId = req.user.id;

    const newProject = await prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          ...data,
          createdByUser: { connect: { id: userId } },
          updatedByUser: { connect: { id: userId } },
        },
      });

      await tx.membership.create({
        data: {
          role: "OWNER",
          hasAccepted: true,
          createdByUser: { connect: { id: userId } },
          updatedByUser: { connect: { id: userId } },
          project: { connect: { id: project.id } },
          user: { connect: { id: userId } },
        },
      });

      return project;
    });

    res.status(201).json(newProject);
  } catch (error) {
    return handleError(error, res, "createProject.controller");
  }
};

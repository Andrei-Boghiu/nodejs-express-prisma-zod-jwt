const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const ownerId = req.user.id;

    const projects = await prisma.project.findMany({
      where: { ownerId },
    });

    res.json(projects);
  } catch (error) {
    return handleError(error, res, "getProjects.controller");
  }
};

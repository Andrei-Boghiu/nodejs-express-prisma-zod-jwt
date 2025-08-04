const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const authorization = await prisma.project.findFirst({
      where: {
        id,
        Memberships: {
          some: {
            userId,
            role: "OWNER",
          },
        },
      },
    });

    if (!authorization) {
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

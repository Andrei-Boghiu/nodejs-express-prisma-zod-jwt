const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const membership = await prisma.membership.findUnique({ where: { id } });

    if (!membership) {
      return res.status(404).json({ message: "Membership not found" });
    }

    await prisma.membership.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    return handleError(error, res, "deleteMembership.controller");
  }
};

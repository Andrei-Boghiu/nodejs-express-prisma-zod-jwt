const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const membership = await prisma.membership.findUnique({ where: { id } });

    if (!membership) {
      return res.status(404).json({ error: "Membership not found" });
    }

    res.json(membership);
  } catch (error) {
    return handleError(error, res, "getMembershipById.controller");
  }
};

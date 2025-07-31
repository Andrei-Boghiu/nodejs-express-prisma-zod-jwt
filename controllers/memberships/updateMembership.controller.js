const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateMembershipSchema } = require("../../validators/membership.validator");

module.exports = async (req, res) => {
  try {
    const data = updateMembershipSchema.parse(req.body);
    const { id } = req.params;

    const exists = await prisma.membership.findUnique({ where: { id } });

    if (!exists) {
      return res.status(404).json({ error: "Membership not found" });
    }

    const updatedMembership = await prisma.membership.update({ where: { id }, data });

    res.json(updatedMembership);
  } catch (error) {
    return handleError(error, res, "updateMembership.controller");
  }
};

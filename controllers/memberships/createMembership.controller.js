const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createMembershipSchema } = require("../../validators/membership.validator");

module.exports = async (req, res) => {
  try {
    const { userId, projectId, role } = createMembershipSchema.parse(req.body);
    const createdBy = req.user.id;

    const membership = await prisma.membership.create({
      data: {
        userId,
        projectId,
        role,
        createdBy,
      },
    });

    res.status(201).json(membership);
  } catch (error) {
    return handleError(error, res, "createMembership.controller");
  }
};

const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { updateUserSchema } = require("../../validators/user.validator");

module.exports = async (req, res) => {
  try {
    const id = req.user.id;
    const data = updateUserSchema.parse(req.body);

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });

    res.json(updatedUser);
  } catch (error) {
    return handleError(error, res, "updateUser.controller");
  }
};

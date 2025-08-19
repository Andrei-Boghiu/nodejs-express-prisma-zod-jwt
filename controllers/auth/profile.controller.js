const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await prisma.user.findUnique({ where: { id }, omit: { password: true } });

    if (!user) {
      return res.status(400).json({ error: "Invalid request" });
    }

    res.status(200).json(user);
  } catch (error) {
    return handleError(error, res, "refresh.controller");
  }
};

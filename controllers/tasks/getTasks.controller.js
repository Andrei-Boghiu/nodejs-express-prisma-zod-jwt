const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");

module.exports = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await prisma.task.findMany({
      where: { userId },
    });

    res.json(tasks);
  } catch (error) {
    return handleError(error, res, "getTasks.controller");
  }
};

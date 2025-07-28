const prisma = require("../../prisma/client");
const handleError = require("../../utils/handleError.util");
const { createTaskSchema } = require("../../validators/task.validator");

module.exports = async (req, res) => {
  try {
    const { title, projectId, completed, userId } = createTaskSchema.parse(req.body);

    const task = await prisma.task.create({
      data: {
        title,
        userId: userId || req.user.id,
        completed: Boolean(completed),
        projectId,
      },
    });

    res.status(201).json(task);
  } catch (error) {
    return handleError(error, res, "createTask.controller");
  }
};

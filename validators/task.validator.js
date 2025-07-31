const { z } = require("zod");
const { priorityEnum, statusEnum, description, optionalDatetime } = require("../config/validation-config");

const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description,
  priority: priorityEnum.optional(),
  status: statusEnum.optional(),
  dueDate: optionalDatetime,
  userId: z.uuid().optional(),
  milestoneId: z.uuid(),
});

const updateTaskSchema = createTaskSchema.partial();

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};

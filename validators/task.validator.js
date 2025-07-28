const { z } = require("zod");

const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  completed: z.boolean().optional(),
  projectId: z.uuid("Valid project ID is required"),
  userId: z.string().uuid("Valid user ID is required"),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").optional(),
  completed: z.boolean().optional(),
  projectId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
});

module.exports = {
  createTaskSchema,
  updateTaskSchema,
};

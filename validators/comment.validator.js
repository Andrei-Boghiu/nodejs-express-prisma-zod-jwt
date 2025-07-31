const { z } = require("zod");

const createCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
  taskId: z.uuid(),
  userId: z.uuid(),
});

const updateCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
};

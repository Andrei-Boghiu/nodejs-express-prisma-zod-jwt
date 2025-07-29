const { default: z } = require("zod");

const createCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
  taskId: z.uuid("Valid task ID is required"),
});

const updateCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required").optional(),
});

const getCommentsSchema = z.object({
  taskId: z.uuid("Valid task ID is required"),
});

module.exports = {
  createCommentSchema,
  updateCommentSchema,
  getCommentsSchema,
};

const { z } = require("zod");

const createCommentSchema = z.object({
  content: z.string().min(1, "Comment content is required"),
});

const updateCommentSchema = createCommentSchema;

module.exports = {
  createCommentSchema,
  updateCommentSchema,
};

const { z } = require("zod");

const updateUserSchema = z.object({
  email: z.email("Valid email is required"),
});

module.exports = {
  updateUserSchema,
};

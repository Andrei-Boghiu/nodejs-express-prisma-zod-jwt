const { z } = require("zod");
const { registerSchema } = require("./auth.validator");

const updateUserSchema = registerSchema.omit({ password: true }).partial();

const adminAlterUserSchema = z.object({
  role: z.enum(["USER", "ADMIN", "DEV"]).optional(),
});

module.exports = {
  updateUserSchema,
  adminAlterUserSchema,
};

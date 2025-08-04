const { z } = require("zod");

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters long").max(128),
  firstName: z.string().optional().nullable(),
  middleName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  organization: z.string().optional().nullable(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

const changePasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long").max(128),
});

const updateActiveStatusSchema = z.object({
  isActive: z.boolean(),
});

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  updateActiveStatusSchema,
};

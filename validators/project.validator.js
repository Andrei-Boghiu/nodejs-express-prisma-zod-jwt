const { z } = require("zod");

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
});

const updateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").optional(),
});

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};

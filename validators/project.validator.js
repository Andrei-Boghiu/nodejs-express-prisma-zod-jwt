const { z } = require("zod");
const { description, priorityEnum, projectStatusEnum, optionalDatetime } = require("./zod.config");

const createProjectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required"),
  description,
  priority: priorityEnum.optional(),
  status: projectStatusEnum.optional(),
  visibility: z.enum(["PRIVATE", "PUBLIC"]).optional(),
  startDate: optionalDatetime,
  endDate: optionalDatetime,
});

const updateProjectSchema = createProjectSchema.partial();

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};

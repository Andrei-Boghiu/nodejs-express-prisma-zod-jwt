const { z } = require("zod");
const { statusEnum, optionalDatetime, description } = require("./zod.config");

const createMilestoneSchema = z.object({
  name: z.string().min(1, "Milestone name is required"),
  description,
  supervisorId: z.uuid().optional().nullable(),
  status: statusEnum.optional(),
  startDate: optionalDatetime,
  endDate: optionalDatetime,
  projectId: z.uuid(),
});

const updateMilestoneSchema = createMilestoneSchema.partial().omit({ projectId: true });

module.exports = {
  createMilestoneSchema,
  updateMilestoneSchema,
};

const { z } = require("zod");
const { statusEnum, optionalDatetime, description } = require("./zod.config");

const createMilestoneSchema = z.object({
  name: z.string().min(1, "Milestone name is required"),
  description,
  supervisorId: z.uuid().optional().nullable(),
  status: statusEnum.optional(),
  startDate: optionalDatetime,
  endDate: optionalDatetime,
});

const updateMilestoneSchema = createMilestoneSchema.partial();

module.exports = {
  createMilestoneSchema,
  updateMilestoneSchema,
};

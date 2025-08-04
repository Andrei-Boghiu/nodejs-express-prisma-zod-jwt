const { z } = require("zod");
const { membershipRoleEnum } = require("./zod.config");

const createMembershipSchema = z.object({
  projectId: z.uuid(),
  userId: z.uuid(),
  role: membershipRoleEnum,
});

const updateMembershipSchema = z.object({
  hasAccepted: z.boolean().optional(),
  role: membershipRoleEnum.optional(),
});

module.exports = {
  createMembershipSchema,
  updateMembershipSchema,
};

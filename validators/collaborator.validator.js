const { z } = require("zod");
const { collaboratorRoleEnum } = require("./zod.config");

const createCollaboratorSchema = z.object({
  projectId: z.uuid(),
  userId: z.uuid(),
  role: collaboratorRoleEnum,
});

const updateCollaboratorSchema = z.object({
  hasAccepted: z.boolean().optional(),
  role: collaboratorRoleEnum.optional(),
});

module.exports = {
  createCollaboratorSchema,
  updateCollaboratorSchema,
};
